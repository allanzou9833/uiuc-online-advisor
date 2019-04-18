import React, { Component } from 'react';
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
import axios from 'axios';
import { generatePath } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  handleSubmit = (e) => {
    axios.post('/login', this.state)
      .then(response => {
        const { token } = response.data
        if(token){
          const user = jwt_decode(token)
          sessionStorage.setItem('user', JSON.stringify(user));
          sessionStorage.setItem('jwt', token);
          this.props.history.push(generatePath("/schedules"))
        }
        else {
          this.setState({ username: '', password: '' })
          this.props.history.push(generatePath("/"))
        }
      })
      .catch(error => console.log(error))
  }

  render(){
    const { username, password } = this.state;
    return (
      <Segment placeholder>
        <Grid columns={2} relaxed='very' stackable>
          <Grid.Column>
            <Form onSubmit={this.handleSubmit}>
              <Form.Input 
                name="username" 
                icon='user' 
                iconPosition='left' 
                label='Username' 
                placeholder='Username'
                onChange={this.handleChange}
                value={username}
              />
              <Form.Input 
                name="password"
                icon='lock' 
                iconPosition='left' 
                label='Password' 
                type='password'
                onChange={this.handleChange}
                value={password}
              />

              <Button content='Login' type="submit" primary />
            </Form>
          </Grid.Column>

          <Grid.Column verticalAlign='middle'>
            <Button 
              content='Sign up' 
              icon='signup' 
              size='big' 
              onClick={() => this.props.history.push(generatePath("/signup"))}
            />
          </Grid.Column>
        </Grid>

        <Divider vertical>Or</Divider>
      </Segment>
    )
  }
}

export default Login;