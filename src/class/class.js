import React, { Component } from 'react';
import {Segment, Card, Icon, Divider, Grid, Header, List } from 'semantic-ui-react';
import { generatePath } from 'react-router-dom';
import axios from 'axios';
import styles from './class.module.scss';

class Class extends Component {
  constructor(props){
    super(props);
    this.state = {
      subject: '',
      course_num: '',
      title: '',
      description: '',
      status: '',
      recs: {}
    }
  }

  componentWillMount = () => {
    axios.get(`/classes/${this.props.match.params.id}`)
      .then(response => {
        const { subject, course_num, title, description, status } = response.data;
        this.setState({ subject, course_num, title, description, status });
      })
      .catch(error => console.log(error))
    axios.get(`/recommend/${this.props.match.params.id}`)
      .then(response => {
        this.setState({ recs: response.data })
      })
      .catch(error => console.log(error))
  }
  render() {
    const { subject, course_num, title, description, status } = this.state;
    const { fa19, sp19 } = this.state.recs;
    let color;
    if (status === 'Open' || status === 'CrossListOpen') 
      color = "green"
    else if (status === 'CrossListOpen (Restricted)' || status === 'Open (Restricted)')
      color = "orange"
    else if (status === 'Closed')
      color = "red"
    else
      color = "gray"

    return (
      <div>
        <Segment>
          <Card centered>
            <Card.Content>
              <Card.Header>{title}</Card.Header>
              <Card.Meta>
                {`${subject}${course_num} | ${status}`}
                <Icon name="circle" color={color} />
              </Card.Meta>
              <Card.Description>{description}</Card.Description>
            </Card.Content>
          </Card>
        </Segment>
        <Header attached="top" size="large">Similar Classes</Header>
        <Segment attached>
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
      </div>
    )
  }
}

export default Class;