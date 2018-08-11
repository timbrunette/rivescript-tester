import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { bot } from './api/bot.js';
import AppLayout from './ui/AppLayout.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppLayout />
      </div>
    );
  }
}

export default App;
