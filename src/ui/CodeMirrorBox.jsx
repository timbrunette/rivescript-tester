import React, { Component } from "react";

const CodeMirror = require("react-codemirror");
require("codemirror/lib/codemirror.css");
require("../codemirrorcustom.css");

class CodeMirrorBox extends Component {
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
      tabSize: 2
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

export default CodeMirrorBox;
