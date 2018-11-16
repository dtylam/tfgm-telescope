import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import './TeleAppBar.js'
import TeleAppBar from './TeleAppBar.js';
import TeleBtmBar from './TeleBtmBar.js';
import TeleSearch from './TeleSearch.js';

class App extends Component {
  state = {
    screenState: 0,
  };
  setScreen = (screenNum) => {
    this.setState({
      screenState: screenNum,
    });
  };
  render() {
    const { screenState } = this.state;
    return (
      <div className="App">
        <TeleAppBar />
        <div style={{ margin: "24 16" }}>
          <TeleSearch screenState={screenState} />
        </div>
        <TeleBtmBar screenState={screenState} setScreen={this.setScreen} />
      </div>
    );
  }
}

export default App;
