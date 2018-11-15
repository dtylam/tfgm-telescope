import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import './TeleAppBar.js'
import TeleAppBar from './TeleAppBar.js';
import TeleBtmBar from './TeleBtmBar.js';
import TeleSearch from './TeleSearch.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TeleAppBar/>
        <div style={{margin: "24 16"}}>
          <TeleSearch/>
        </div>
        <TeleBtmBar/>
      </div>
    );
  }
}

export default App;
