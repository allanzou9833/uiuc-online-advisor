import React, { Component } from 'react';
import axios from 'axios';
import { Card, List, Button } from 'semantic-ui-react';
import { generatePath } from 'react-router-dom';
import styles from './schedule.module.scss'; 
import plus from '../plus.svg';

class ScheduleDisplay extends Component {
  constructor(props){
    super(props);
    this.state = {
      schedules: []
    }
  }
  getSchedules = () => {
    axios.get('/schedules', {
      params: {
        user_id: 1
      }
    })
    .then(response => {
      this.setState({schedules: response.data})
    })
    .catch(error => console.log(error))
  }
  componentWillMount = () => this.getSchedules()

  handleDelete = (id) => (e) => {
    axios.delete(`/schedules/${id}`)
    .then(response => {
      this.getSchedules()
    })
    .catch(error => console.log(error))
  }
  render() {
    const { schedules } = this.state
    return (
      // <pre>{JSON.stringify(schedules, null, 2)}</pre>
      <Card.Group>
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
                    <List.Item key={c.class_crn}>{`${c.dept}${c.course_num}`}</List.Item>
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
    )
  }
}

export default ScheduleDisplay;