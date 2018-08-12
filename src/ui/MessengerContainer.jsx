import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

// Want a textfield where a user can enter a message
const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%'
  }
});

class MessengerContainer extends Component {
  render() {
    return (
      <div>
        <Messages messages={this.props.messages} />
        <MessageInput onSubmit={this.props.onSubmit} />
      </div>
    );
  }
}

class Messages extends Component {
  render() {
    const messages = this.props.messages;
    const listMessages = messages.map((message, index) => (
      <Message key={index} user={message.user} text={message.text} />
    ));
    return <div>{listMessages}</div>;
  }
}

const Message = ({ user, text }) => {
  let message = `${user} says: ${text}`;
  return (
    <Paper elevation={1} square={true}>
      <Typography align={user == "Bot" ? "left" : "right"}>
        {message}
      </Typography>
    </Paper>
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
      <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
        <TextField
          id="message"
          label="message"
          value={this.state.input}
          onChange={this.handleChange}
          margin="normal"
        />
      </form>
    );
  }
}

export default MessengerContainer;
