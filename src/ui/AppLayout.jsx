import React, { Component } from 'react';
import NavBar from './NavBar.jsx';
import CodeBoxContainer from './CodeBoxContainer.jsx';
import MessengerContainer from './MessengerContainer.jsx';
// import bot from '../api/bot.js';
import RiveScript from 'rivescript'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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

  setRef = ref => this.editor = ref

  handleFileUpload = file => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      console.log(reader.result)
      this.handleScriptChange(reader.result);
      const editor = this.editor.getCodeMirror();
      editor.setValue(this.state.script);
    };
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
        <NavBar onFileUpload={this.handleFileUpload}/>
        <div style={{padding: "10px"}}>
          <Grid container spacing={24}>
            <Grid className="CodeBoxContainer" item xs={6}>
              <CodeBoxContainer setRef={this.setRef} script={this.state.script} onChange={this.handleScriptChange} onSubmit={this.handleScriptSubmit}/>
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


const RIVESCRIPT = `dsagfasdfkasjdh falskdu fhas
`;


AppLayout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppLayout);
