import React, { Component } from "react";
import NavBar from "../components/NavBar.jsx";
import CodeBoxContainer from "./CodeBoxContainer.jsx";
import ChatBotContainer from "./ChatBotContainer.jsx";
import { StyledAppContainer } from "../components/StyledAppContainer.js";
import RiveScript from "rivescript";
import { getBotMessage, defaultScript } from "../api.js";

import Grid from "@material-ui/core/Grid";

class App extends Component {
  state = {
    /** The RiveScript script itself */
    script: defaultScript,
    /** Array of current message objects of form {user: 'user-name' text: 'message'} */
    messages: [],
    /** The RiveScript interpreter bot */
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

  // todo
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
      <StyledAppContainer>
        <NavBar
          onFileUpload={this.handleFileUpload}
          script={this.state.script}
        />
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
            <ChatBotContainer
              messages={this.state.messages}
              onSubmit={this.handleMessage}
            />
          </Grid>
        </Grid>
      </StyledAppContainer>
    );
  }
}

export default App;
