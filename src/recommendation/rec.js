import React, { Component } from 'react';
import { Divider, Grid, Header, List, Segment } from 'semantic-ui-react'
import { generatePath } from 'react-router-dom';
import axios from 'axios';
import styles from './rec.module.scss';

class Recommend extends Component {
  constructor(props){
    super(props);
    this.state = {
      classes: {}
    }
  }

  componentWillMount = () => {
    const config = {
      headers: {
        "Authorization": `bearer ${sessionStorage.getItem('jwt')}`
      }
    }
    axios.get('/recommend', config)
      .then(response => {
        const { data } = response;
        this.setState({ classes: data })
      })
      .catch(error => console.log(error))
  }

  render() {
    const { fa19, sp19 } = this.state.classes;
    return (
      <Segment placeholder>
        <Grid columns={2} stackable textAlign='center'>
          <Divider vertical />

          <Grid.Row verticalAlign='middle'>
            <Grid.Column>
              <Header size="medium" floated="left" dividing>Fall 2019</Header>
              <Divider clearing hidden />
              <List selection>
                {
                  fa19 && fa19.map(obj => (
                    <List.Item
                      className={styles.cursor}
                      onClick={() => this.props.history.push(generatePath("/classes/:id", {id: obj.id}))}
                    >
                      <List.Header>{`${obj.subject}${obj.course_num}`}</List.Header>
                      {obj.title}
                    </List.Item>
                  ))
                }
              </List>
            </Grid.Column>

            <Grid.Column>
              <Header size="medium" floated="left" dividing>Spring 2019</Header>
              <Divider clearing hidden />
              <List selection>
                {
                    sp19 && sp19.map(obj => (
                      <List.Item
                        className={styles.cursor}
                        onClick={() => this.props.history.push(generatePath("/classes/:id", {id: obj.id}))}
                      >
                        <List.Header>{`${obj.subject}${obj.course_num}`}</List.Header>
                        {obj.title}
                      </List.Item>
                    ))
                }
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

export default Recommend;