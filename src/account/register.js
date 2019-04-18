import React, { Component } from 'react';
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
import axios from 'axios';
import { generatePath } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      name: ''
    }
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  handleSubmit = (e) => {
    axios.post('/register', this.state)
      .then(response => {
        const { token } = response.data
        if(token){
          const user = jwt_decode(token)
          sessionStorage.setItem('user', JSON.stringify(user));
          sessionStorage.setItem('jwt', token);
          this.props.history.push(generatePath("/schedules"))
        }
        else {
          // Show something went wrong
          alert('ERROR Registering')
          this.props.history.push(generatePath("/register"))
        }
      })
      .catch(error => console.log(error))
  }

  render(){
    const { username, password, name } = this.state;
    return (
      <Segment placeholder>
        <Grid columns={2} relaxed="very" stackable centered>
          <Grid.Column textAlign="left">
            <Form onSubmit={this.handleSubmit}>
                <Form.Input 
                  name="name"
                  label="Full Name" 
                  placeholder="name"
                  type="text"
                  onChange={this.handleChange}
                  value={name}
                  required
                />
                <Form.Input 
                  name="username"
                  icon="user"
                  iconPosition="left"
                  label="Username" 
                  placeholder="username"
                  type="text"
                  onChange={this.handleChange}
                  value={username}
                  required
                />
                <Form.Input 
                  name="password"
                  icon="lock"
                  iconPosition="left"
                  label="Password" 
                  type="password"
                  onChange={this.handleChange}
                  value={password}
                  required
                />

                <Form.Button type="submit" content="Signup" primary />
            </Form>
          </Grid.Column>
        </Grid>

        <Divider horizontal></Divider>

        <Button 
          content="Cancel"
          onClick={() => this.props.history.push(generatePath("/"))}
        />
      </Segment>
    )
  }
}

export default Register;