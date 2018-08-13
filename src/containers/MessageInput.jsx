import React, { Component } from "react";

import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

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

const StyledMessageInputContainer = styled(Paper)`
  margin: 20 20 0 20;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

export default MessageInput;
