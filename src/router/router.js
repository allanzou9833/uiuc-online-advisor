import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Form from '../schedule/form';
import Display from '../schedule/display';
import axios from 'axios';

class Navigation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      classList : []
    }
  }
  componentWillMount = () => {
    axios.get("/classes")
    .then(response => this.setState({ classList: response.data}))
    .catch(error => console.log(error))
  }
  render() {
    return (
      <Router>
        <Route exact path='/schedules' render={props => <Display {...props} />} />
      <Route exact path='/schedules/new' render={props => <Form {...props} classList={this.state.classList} />} />
        <Route path='/schedules/:id/edit' render={props => <Form {...props} classList={this.state.classList} key={props.match.params.id} />} />
      </Router>
    )
  }
}

export default Navigation;