import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './TeleAppBar.js'
import TeleAppBar from './TeleAppBar.js';
import TeleBtmBar from './TeleBtmBar.js'


class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <TeleAppBar/>
        <div style={{height: "50vh"}}>
          <br />
          Note: Under Construction!
        </div>
        <TeleBtmBar/>
      </div>
    );
  }
}

export default App;
