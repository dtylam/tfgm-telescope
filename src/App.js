import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './TeleAppBar.js'
import TeleAppBar from './TeleAppBar.js';

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        {/* <header className="App-header">
          
        </header> */}
        <TeleAppBar/>
      </div>
    );
  }
}

export default App;
