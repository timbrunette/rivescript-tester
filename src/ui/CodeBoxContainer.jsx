import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

require("codemirror/lib/codemirror.css");
const CodeMirror = require("react-codemirror");

const styles = theme => ({
  textfield: {
    color: "#000"
  }
});

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
        <CodeBox
          script={this.props.script}
          onChange={this.props.onChange}
          readOnly={this.state.readOnly}
          setRef={this.props.setRef}
        />
        <RunCodeButton
          onClick={this.handleSubmit}
          readOnly={this.state.readOnly}
        />
        <DownloadButton script={this.props.script} />
      </div>
    );
  }
}

class CodeBox extends Component {
  handleChange = script => {
    this.props.onChange(script);
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  render() {

    const options = {
      lineNumbers: true,
      readOnly: this.props.readOnly,
      mode: "simplemode"
    };
    return (
      <CodeMirror
        ref={this.props.setRef}
        value={this.props.script}
        onChange={this.handleChange}
        options={options}
        autoFocus={true}
        tabSize={2}
        autoSave={true}
      />
    );
  }
}

const DownloadButton = ({ script }) => {
  const handleClick = () => {
    _downloadTxtFile(script);
    alert("download complete!");
  };

  return (
    <Button variant="contained" color="secondary" onClick={handleClick}>
      Download Code
    </Button>
  );
};

const RunCodeButton = ({ onClick, readOnly }) => {
  return (
    <Button variant="contained" color="primary" onClick={onClick}>
      {readOnly ? "Stop Code" : "Run Code"}
    </Button>
  );
};

const _downloadTxtFile = (text, filename = "file.rs") => {
  var element = document.createElement("a");
  var file = new Blob([text], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  element.click();
};

export default CodeBoxContainer;
