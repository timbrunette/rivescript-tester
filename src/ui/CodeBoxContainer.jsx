import React, { Component } from "react";
import CodeMirrorBox from "./CodeMirrorBox.jsx";
import styled from "styled-components";

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

class CodeBoxContainer extends Component {
  state = {
    readOnly: false
  };

  handleSubmit = () => {
    this.setState({
      readOnly: !this.state.readOnly
    });
    this.props.onSubmit();
  };

  render() {
    return (
      <div>
        <StyledPaper>
          <CodeMirrorBox
            script={this.props.script}
            onChange={this.props.onChange}
            readOnly={this.state.readOnly}
            setRef={this.props.setRef}
          />
          <ButtonContainer elevation={0}>
            <RunCodeButton
              onClick={this.handleSubmit}
              readOnly={this.state.readOnly}
            />
            <DownloadButton script={this.props.script} />
            <DeleteMessagesButton
              messages={this.props.messages}
              onClick={this.props.deleteMessages}
            />
          </ButtonContainer>
        </StyledPaper>
      </div>
    );
  }
}

const RunCodeButton = ({ onClick, readOnly }) => {
  const color = readOnly ? "secondary" : "primary";
  return (
    <StyledButton variant="contained" color={color} onClick={onClick}>
      {readOnly ? "Edit" : "Run"}
    </StyledButton>
  );
};

const DownloadButton = ({ script }) => {
  const handleClick = () => {
    _downloadTxtFile(script);
  };

  return (
    <StyledButton variant="contained" onClick={handleClick}>
      Download
    </StyledButton>
  );
};

const DeleteMessagesButton = ({ messages, onClick }) => {
  if (messages.length > 0) {
    return (
      <DeleteButton variant="outlined" onClick={onClick}>
        Delete Messages
      </DeleteButton>
    );
  }
  return null;
};

const _downloadTxtFile = (text, filename = "file.rs") => {
  var element = document.createElement("a");
  var file = new Blob([text], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  element.click();
};

const ButtonContainer = styled(Paper)`
  justify-content: space-between;
  padding: 10px;
  flex-wrap: nowrap;
`;

const StyledButton = styled(Button)`
  display: flex;
  && {
    margin-right: 15px;
  }
`;

const DeleteButton = StyledButton.extend`
  && {
    float: right;
  }
`;

const StyledPaper = styled(Paper)`
  margin: 10px;
`;

export default CodeBoxContainer;
