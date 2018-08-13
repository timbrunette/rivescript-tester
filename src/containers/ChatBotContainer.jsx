import React, { Component } from "react";
import MessageList from "../components/MessageList.jsx";
import MessageInput from "./MessageInput.jsx";

import styled from "styled-components";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

class ChatBotContainer extends Component {
  componentDidUpdate = () => {
    this.scrollToBottom();
  };

  scrollToBottom = () => this.el.scrollIntoView({ behaviour: "smooth" });

  render() {
    return (
      <MessengerContainer>
        <StyledTitle variant="caption">ChatBot</StyledTitle>
        <Grid
          container
          direction="column"
          justify="flex-end"
          wrap="nowrap"
          alignItems="stretch"
        >
          <Grid item xs={12} style={{ overflow: "auto" }}>
            <MessageList messages={this.props.messages} />
            <div
              ref={el => {
                this.el = el;
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <MessageInput onSubmit={this.props.onSubmit} />
          </Grid>
        </Grid>
      </MessengerContainer>
    );
  }
}

const StyledTitle = styled(Typography)`
  padding: 5px;
  padding-left: 10px;
  background-color: #f5f5f5;
  && {
    margin-bottom: auto;
  }
`;

const MessengerContainer = styled(Paper)`
  margin: 10px;
  display: flex;
  flex-grow: 1;
  height: 632px;
  flex-wrap: nowrap;
  flex-direction: column;
`;

export default ChatBotContainer;
