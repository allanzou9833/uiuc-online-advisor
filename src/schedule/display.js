import React, { Component } from 'react';
import axios from 'axios';
import { Card, List, Button, Segment, Divider } from 'semantic-ui-react';
import { generatePath } from 'react-router-dom';
import styles from './schedule.module.scss'; 
import plus from '../plus.svg';
import SearchBar from '../search/search';

class ScheduleDisplay extends Component {
  constructor(props){
    super(props);
    this.state = {
      schedules: []
    }
  }
  getSchedules = () => {
    const config = {
      headers: {
        "Authorization": `bearer ${sessionStorage.getItem('jwt')}`
      }
    }
    axios.get('/schedules', config)
      .then(response => {
        this.setState({schedules: response.data})
      })
      .catch(error => console.log(error))
      // if status 500 redirect home, show message something went wrong
  }
  componentWillMount = () => this.getSchedules()

  handleDelete = (id) => (e) => {
    const config = {
      headers: {
        "Authorization": `bearer ${sessionStorage.getItem('jwt')}`
      }
    }
    axios.delete(`/schedules/${id}`, config)
      .then(response => {
        this.getSchedules()
      })
      .catch(error => console.log(error))
  }
  render() {
    const { schedules } = this.state
    return (
      <Segment placeholder>
        <SearchBar source={this.props.classList} />
        <Divider horizontal />
        <Card.Group centered>
          {
            schedules.map(obj=>(
              <Card>
                <Card.Content>
                  <Card.Header>{obj.name}</Card.Header>
                </Card.Content>
                <Card.Content>
                  <List>
                    {
                      obj.classes.map(c => (
                        <List.Item 
                          key={c.class_id} 
                          className={styles.cursor}
                          onClick={() => this.props.history.push(generatePath("/classes/:id", {id: c.class_id}))}
                        >
                          {`${c.subject}${c.course_num}`}
                        </List.Item>
                      ))
                    }
                  </List>
                </Card.Content>
                <Card.Content>
                  <Button.Group>
                    <Button 
                      color="blue" 
                      content="Edit"
                      onClick={() => this.props.history.push(generatePath("/schedules/:id/edit", {id: obj.id}))}
                    />
                    <Button 
                      negative
                      content="Delete"
                      onClick={this.handleDelete(obj.id)}
                    />
                  </Button.Group>
                </Card.Content>
              </Card>
            ))
          }
          <Card>
            <Card.Content className={styles['add-new-card']} onClick={() => this.props.history.push(generatePath("/schedules/new"))}>
              <div>
                <img src={plus} alt="add new schedule" />
              </div>
            </Card.Content>
          </Card>
        </Card.Group>
      </Segment>
    )
  }
}

export default ScheduleDisplay;