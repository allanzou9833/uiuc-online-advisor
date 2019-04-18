import React, { Component } from 'react';
import './App.scss';
import Navigation from './router/router'

class App extends Component {
  render() {
    const user = JSON.parse(sessionStorage.getItem('user'))
    return (
      <div className="App">
        <header className="App-header">
          <h1>UIUC Online Advisor</h1>
          {
            user && <span>{user.name}</span>
          }
        </header>
        <Navigation />
      </div>
    );
  }
}

export default App;
