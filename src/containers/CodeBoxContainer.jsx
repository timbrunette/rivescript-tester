/*!
  Copyright (c) 2018 Timothy Brunette.
*/
import React, { Component } from "react";
import CodeMirrorBox from "../components/CodeMirrorBox.jsx";
import RunButton from "../components/RunButton.jsx";
import DeleteButton from "../components/DeleteButton.jsx";
import styled from "styled-components";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

class CodeBoxContainer extends Component {
  state = {
    readOnly: false
  };

  handleFocus = () => {
    this.setState({
      readOnly: false
    });
  }

  handleSubmit = () => {
    this.setState({
      readOnly: !this.state.readOnly
    });
    this.props.onSubmit();
  };

  render() {
    return (
      <div onFocus={this.handleFocus}>
        <StyledPaper>
          <StyledTitle variant="caption">RiveScript Editor</StyledTitle>
          <CodeMirrorBox
            script={this.props.script}
            onChange={this.props.onChange}
            readOnly={this.state.readOnly}
            setRef={this.props.setRef}
          />
          <ButtonContainer elevation={0}>
            <RunButton
              onClick={this.handleSubmit}
              readOnly={this.state.readOnly}
            />
            <DeleteButton
              messages={this.props.messages}
              onClick={this.props.deleteMessages}
            />
          </ButtonContainer>
        </StyledPaper>
      </div>
    );
  }
}

const StyledTitle = styled(Typography)`
  padding: 5px;
  padding-left: 10px;
  background-color: #f5f5f5;
`;

const ButtonContainer = styled(Paper)`
  justify-content: space-between;
  padding: 10px;
  flex-wrap: nowrap;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const StyledPaper = styled(Paper)`
  margin: 10px;
`;

export default CodeBoxContainer;
