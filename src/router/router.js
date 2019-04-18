import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Form from '../schedule/form';
import Display from '../schedule/display';
import Login from '../account/login';
import Register from '../account/register';
import Recommend from '../recommendation/rec';
import Class from '../class/class';
import axios from 'axios';
import styles from './router.module.scss';

class Navigation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      classList : [],
      unique: []
    }
  }
  componentWillMount = () => {
    axios.get("/classes")
      .then(response => this.setState({ classList: response.data }))
      .catch(error => console.log(error))
    axios.get("/classes", { params: { unique: true }})
      .then(response => this.setState({ unique: response.data }))
      .catch(error => console.log(error))
  }

  uniqueArray = (array) => {
      if(array !== undefined || array.length > 0){
        // console.log(array)
        return array.filter((val,index, arr) => {
          return index === arr.findIndex(obj => {
            return `${obj.subject}${obj.course_num}${obj.title}` === `${val.subject}${val.course_num}${val.title}`;
          });
        });
      }
  }
  render() {
    return (
      <Router>
        <div>
          <ul className={styles.nav}>
            <li>
              <Link to='/schedules'>Home</Link>
            </li>
            <li>
              <Link to='/recommendations'>Recommend Classes</Link>
            </li>
          </ul>
        </div>
        <Route exact path='/' component={Login} />
        <Route path='/signup' component={Register} />
        <Route exact path='/schedules' render={props => <Display {...props} classList={this.state.unique} />} />
        <Route exact path='/schedules/new' render={props => <Form {...props} classList={this.state.classList} />} />
        <Route path='/schedules/:id/edit' render={props => <Form {...props} classList={this.state.classList} key={props.match.params.id} />} />
        <Route path='/recommendations' component={Recommend} />
        <Route path='/classes/:id(\d+)' render={props => <Class {...props} key={props.match.params.id} />} />
      </Router>
    )
  }
}

export default Navigation;