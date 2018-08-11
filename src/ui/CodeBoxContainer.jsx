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
          value={this.props.script}
          onChange={this.props.onChange}
          readOnly={this.state.readOnly}
        />
        <RunCodeButton
          onClick={this.handleSubmit}
          readOnly={this.state.readOnly}
        />
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
    };
    return (
      <CodeMirror
        value={this.props.value}
        onChange={this.handleChange}
        options={options}
        autoFocus={true}
        tabSize={2}
      />
    );
  }
}

// Want to clear any existing messages whe we run a new code
class RunCodeButton extends Component {
  handleClick = () => {
    this.props.onClick();
  };

  render() {
    return (
      <Button variant="contained" color="primary" onClick={this.handleClick}>
        {this.props.readOnly ? "Stop Code" : "Run Code"}
      </Button>
    );
  }
}

export default CodeBoxContainer;
