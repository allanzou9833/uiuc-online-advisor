import React, { Component } from 'react';
import './App.scss';
import Navigation from './router/router'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
      </div>
    );
  }
}

export default App;
