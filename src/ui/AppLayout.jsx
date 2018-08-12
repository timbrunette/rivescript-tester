import React, { Component } from "react";
import NavBar from "./NavBar.jsx";
import CodeBoxContainer from "./CodeBoxContainer.jsx";
import MessengerLayout from "./MessengerLayout.jsx";
import RiveScript from "rivescript";

import Grid from "@material-ui/core/Grid";
import styled from "styled-components";

class AppLayout extends Component {
  state = {
    script: RIVESCRIPT,
    messages: [],
    bot: null
  };

  setRef = ref => (this.editor = ref);

  handleFileUpload = file => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      console.log(reader.result);
      this.handleScriptChange(reader.result);
      const editor = this.editor.getCodeMirror();
      editor.setValue(this.state.script);
    };
  };

  handleBotStreamError = () => {
    alert("Another error!");
  };

  handleScriptChange = script => {
    this.setState({
      script
    });
  };

  handleScriptSubmit = () => {
    const bot = new RiveScript({ debug: true });
    bot.stream(this.state.script, this.handleBotStreamError);
    bot.sortReplies();

    this.setState({
      bot
    });
  };

  deleteMessages = () => {
    this.setState({
      messages: []
    });
  };

  handleMessage = input => {
    const userMessage = {
      user: "local-user",
      text: input
    };

    if (input) {
      this.setState(prevState => ({
        messages: [...prevState.messages, userMessage]
      }));
    }

    getBotMessage(this.state.bot, input).then(message => {
      this.setState(prevState => ({
        messages: [...prevState.messages, message]
      }));
    });
  };

  render() {
    return (
      <AppContainer>
        <NavBar onFileUpload={this.handleFileUpload} />
        <Grid container spacing={0} justify="center">
          <Grid item xs={12} sm={6} lg={5}>
            <CodeBoxContainer
              id="CodeBoxContainer"
              setRef={this.setRef}
              script={this.state.script}
              messages={this.state.messages}
              onChange={this.handleScriptChange}
              onSubmit={this.handleScriptSubmit}
              deleteMessages={this.deleteMessages}
            />
          </Grid>
          <Grid container item xs={12} sm={6} lg={3} alignItems="flex-end">
            <MessengerLayout
              messages={this.state.messages}
              onSubmit={this.handleMessage}
            />
          </Grid>
        </Grid>
      </AppContainer>
    );
  }
}

async function getBotMessage(bot, input) {
  if (!bot) {
    const reply = `This is a RiveScript testing bot!  
    Try entering some rivescript code and run it to test it out!
    `;
    return { user: "Bot", text: reply };
  }

  let message = await bot.reply("local-user", input).then(
    reply => {
      return { user: "Bot", text: reply };
    },
    reason => {
      alert("FUCK!");
      return null;
    }
  );
  return message;
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-grow: 1;
  height: 100%;
`;

const RIVESCRIPT = `! version = 2.0

+ hello bot
- Hello human.

+ my name is *
- <set name=<formal>>Nice to meet you, <get name>.

+ (what is my name|who am i)
- You're <get name>, right?

+ *
- I don't have a reply for that.
- Try asking that a different way.`;

export default AppLayout;
