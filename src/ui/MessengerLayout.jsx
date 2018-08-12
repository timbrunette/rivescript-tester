import React, { Component } from "react";
import styled from "styled-components";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

class MessengerLayout extends Component {
  componentDidUpdate = () => {
    this.scrollToBottom();
  };

  scrollToBottom = () => {
    this.el.scrollIntoView({ behaviour: "smooth" });
  };

  render() {
    return (
      <MessengerContainer>
        <StyledTitle variant="caption">
          ChatBot
        </StyledTitle>    
        <Grid
          container
          direction="column"
          justify="flex-end"
          wrap="nowrap"
          alignItems="stretch"
        >
          <Grid item xs={12} style={{ overflow: "auto" }}>
            <Messages messages={this.props.messages} />
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

class Messages extends Component {
  render() {
    const messages = this.props.messages;
    const listMessages = messages.map((message, index) => (
      <StyledMessageContainer key={index}>
        <Message key={index} user={message.user} text={message.text} />
      </StyledMessageContainer>
    ));
    return <div>{listMessages}</div>;
  }
}

const Message = ({ user, text }) => {
  let align = user === "Bot" ? "left" : "right";
  return (
    <MessageTextContainer elevation={1} square={true} align={align}>
      <Typography color="inherit">{text}</Typography>
    </MessageTextContainer>
  );
};

class MessageInput extends Component {
  state = {
    input: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.input);
    this.setState({
      input: ""
    });
  };

  handleChange = e => {
    this.setState({
      input: e.target.value
    });
  };

  render() {
    return (
      <StyledMessageInputContainer>
        <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
          <TextField
            placeholder="Type a message"
            value={this.state.input}
            onChange={this.handleChange}
            fullWidth
            margin="normal"
            style={{ padding: "0px 10px" }}
          />
        </form>
      </StyledMessageInputContainer>
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

const StyledMessageInputContainer = styled(Paper)`
  margin: 20 20 0 20;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const StyledMessageContainer = styled.div`
  clear: both;
`;

const MessageTextContainer = styled(Paper)`
  /* Adapt the location based on user props */
  margin: 5px;
  margin-left: ${props => (props.align === "right" ? "30px" : "10px")};
  margin-right: ${props => (props.align === "right" ? "10px" : "30px")};
  padding: 10px;
  display: inline-block;
  float: ${props => props.align};
  border-radius: 30px;
  border-bottom-right-radius: ${props =>
    props.align === "right" ? 0 : "30px"};
  border-bottom-left-radius: ${props => (props.align === "right" ? "30px" : 0)};
  && {
    background-color: ${props =>
      props.align === "right" ? "#3f51b5" : "white"};
    color: ${props => (props.align === "right" ? "white" : "default")};
  }
`;

export default MessengerLayout;
