import React, { Component } from "react";
import NavBar from "../components/NavBar.jsx";
import CodeBoxContainer from "./CodeBoxContainer.jsx";
import ChatBotContainer from "./ChatBotContainer.jsx";
import GenericSnackBar from "../components/GenericSnackBar.jsx";
import { StyledAppContainer } from "../components/StyledAppContainer.js";
import RiveScript from "rivescript";
import { getBotMessage, defaultScript } from "../api.js";

import Grid from "@material-ui/core/Grid";

class AppContainer extends Component {
  state = {
    /** The RiveScript script itself */
    script: defaultScript,
    /** Array of current message objects of form {user: 'user-name' text: 'message'} */
    messages: [],
    /** The RiveScript interpreter bot */
    bot: null,
    /** SnackBar details */
    snackBar: {
      isOpen: false,
      message: "",
      type: "default"
    }
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

  handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      snackBar: {
        isOpen: false,
        message: ""
      }
    });
  };

  handleBotStreamError = (err = "") => {
    const message = err
      ? err
      : "Error: Can't process the script in the editor.";
    this.setState({
      snackBar: {
        isOpen: true,
        message
      }
    });
  };

  handleScriptChange = script => {
    this.setState({
      script
    });
  };

  handleScriptSubmit = () => {
    const bot = new RiveScript({ debug: true });
    if (!bot.stream(this.state.script, this.handleBotStreamError)) {
      this.handleBotStreamError()
      return;
    }

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

  componentDidCatch = err => {};

  render() {
    return (
      <StyledAppContainer>
        <NavBar
          onFileUpload={this.handleFileUpload}
          script={this.state.script}
          snackBar={this.state.snackBar}
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
              snackBar={this.state.snackBar}
            />
          </Grid>
          <Grid container item xs={12} sm={6} lg={3} alignItems="flex-end">
            <ChatBotContainer
              messages={this.state.messages}
              onSubmit={this.handleMessage}
            />
          </Grid>
        </Grid>
        <GenericSnackBar
          open={this.state.snackBar.isOpen}
          message={this.state.snackBar.message}
          handleClose={this.handleSnackBarClose}
        />
      </StyledAppContainer>
    );
  }
}

export default AppContainer;
