import React, { Component } from 'react';
import { Grid, Form } from 'semantic-ui-react'
import styles from './schedule.module.scss'
import axios from 'axios';
// import _ from 'lodash';
import { generatePath } from 'react-router-dom';

class ScheduleForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      classes: [],
      semester: 'FA',
      year: 2019,
      name: '',
      classList: []
    }
  }
  // componentWillReceiveProps(nextProps){
  //   if(nextProps.classList !== this.props.classList){
  //     // console.log(this.state.semester)
  //     // console.log(this.state.year)
  //     // console.log(nextProps.classList)
  //     this.setState({ 
  //       classList: nextProps.classList.filter(e => e.semester === this.state.semester && e.year === this.state.year)
  //     }) 
  //   }
  // }

  componentWillMount(props) {
    this.setState({ 
      classList: this.props.classList.filter(e => e.semester === this.state.semester && e.year === this.state.year)
    })
    const config = {
      headers: {
        "Authorization": `bearer ${sessionStorage.getItem('jwt')}`
      }
    }
    if(Object.keys(this.props.match.params).length !== 0){
      axios.get(`/schedules/${this.props.match.params.id}`, config)
        .then(response => {
          this.setState({ 
            name: response.data.name, 
            classes: response.data.classes
          })
        })
        .catch(error => console.log(error))
    }
  }

  handleChangeClasses = (e, { value }) => this.setState({ classes: value })
  handleChangeSemester = (e, { value }) => {
    this.setState({ semester: value, classes: [] }, () => {
      this.setState({ 
        classList: this.props.classList.filter(e => e.semester === this.state.semester && e.year === this.state.year)
      })
    }) 
  }
  handleChangeYear = (e, { value }) => {
    this.setState({ year: value, classes: [] }, () => {
      this.setState({ 
        classList: this.props.classList.filter(e => e.semester === this.state.semester && e.year === this.state.year)
      })
    })
  }
  handleChangeName = (e) => this.setState({ name: e.target.value })

  handleSubmit = (e) => {
    const data = {
      classes: this.state.classes,
      name: this.state.name
    }
    const config = {
      headers: {
        "Authorization": `bearer ${sessionStorage.getItem('jwt')}`
      }
    }

    if(Object.keys(this.props.match.params).length === 0){
      axios.post('/schedules', data, config)
        .then(response => this.props.history.push(generatePath("/schedules")))
        .catch(error => console.log(error))
    }
    else {
      axios.put(`/schedules/${this.props.match.params.id}`, data, config)
        .then(response => this.props.history.push(generatePath("/schedules")))
        .catch(error => console.log(error))
    }
  }

  render(){
    const { classes, semester, year, name, classList } = this.state
    // const { classList } = this.props
    const classOptions = classList.map(e => (
      {
        key: e.id,
        value: e.id,
        text: `${e.subject}${e.course_num}`
      }
    ))
    const semesterOptions = [
      {
        key: 'FA',
        value: 'FA',
        text: 'Fall'
      },
      {
        key: 'SP',
        value: 'SP',
        text: 'Spring'
      },
      {
        key: 'SU',
        value: 'SU',
        text: 'Summer'
      },
      {
        key: 'WI',
        value: 'WI',
        text: 'Winter'
      },
    ]
    const yearOptions = [2015, 2016, 2017, 2018, 2019].map(year => ({key: year, value: year, text: year}))

    return(
      <Grid centered columns={2}>
        <Grid.Column>
          <Form onSubmit={this.handleSubmit} className={styles.form}>
            <Form.Group>
              <Form.Dropdown 
                width={3}
                label="Semester"
                selection
                options={semesterOptions}
                value={semester}
                onChange={this.handleChangeSemester}
              />
            </Form.Group>
            <Form.Group>
              <Form.Dropdown 
                width={3}
                label="Year"
                selection
                options={yearOptions}
                value={year}
                onChange={this.handleChangeYear}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                label="Schedule Name"
                type="text"
                onChange={this.handleChangeName}
                value={name}
                focus
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Dropdown
                width={7}
                label="Classes"
                selection
                search 
                multiple
                required
                options={classOptions}
                onChange={this.handleChangeClasses}
                value={classes}
              />
            </Form.Group>
            <Form.Group>
              <Form.Button type="submit" content="Submit" positive />
              <Form.Button 
                type="button" 
                content="Cancel" 
                onClick={() => this.props.history.push(generatePath("/schedules"))}
              />
            </Form.Group>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }

}

export default ScheduleForm;