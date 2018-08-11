import React, { Component } from 'react';
import NavBar from './NavBar.jsx';
import CodeBoxContainer from './CodeBoxContainer.jsx';
import MessengerContainer from './MessengerContainer.jsx';
// import bot from '../api/bot.js';
import RiveScript from 'rivescript'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  MessengerContainer: {
    textSize: '12px'
  }
});

class AppLayout extends Component {
  state = {
    script: RIVESCRIPT,
    messages: [],
    bot: '' 
  }

  handleBotStreamError = () => {
    alert("Another error!");
  }

  handleScriptChange = script => {
    this.setState({
      script
    })
  }

  handleScriptSubmit = () => {
    const bot = new RiveScript({debug:true});
    bot.stream(this.state.script, this.handleBotStreamError);
    bot.sortReplies();

    this.setState({
      messages: [],
      bot: bot
    });
  }

  handleMessage = input => {
    const userMessage = {
      user: 'Tim',
      text: input
    };

    if (this.state.bot) {
      this.state.bot.reply("local-user", input).then( reply => {
        const botMessage = {user: 'Bot', text: reply};
        this.setState(prevState => ({
          messages: [...prevState.messages, userMessage, botMessage]
        }));
      });
    }

  }

  render() {
    const { classes } = this.props;
    return (
      <div className="AppLayout">
        <NavBar />
        <div style={{padding: "10px"}}>
          <Grid container spacing={24}>
            <Grid className="CodeBoxContainer" item xs={6}>
              <CodeBoxContainer script={this.state.script} onChange={this.handleScriptChange} onSubmit={this.handleScriptSubmit}/>
            </Grid>          
            <Grid item xs={6} alignItems="flex-end">
              <MessengerContainer messages={this.state.messages} onSubmit={this.handleMessage} />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

const RIVESCRIPT = `
! version = 2.0

+ hello bot
- Hello human.

+ my name is *
- <set name=<formal>>Nice to meet you, <get name>.

+ (what is my name|who am i)
- You're <get name>, right?

+ *
- I don't have a reply for that.
- Try asking that a different way.
`;


AppLayout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppLayout);
