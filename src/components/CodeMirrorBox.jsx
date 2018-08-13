import React from "react";
const CodeMirror = require("react-codemirror");

require("codemirror/lib/codemirror.css");
require("./codemirrorcustom.css");

const CodeMirrorBox = ({ setRef, script, onChange, readOnly }) => {
  const handleChange = script => {
    onChange(script);
  };

  const options = {
    lineNumbers: true,
    readOnly: readOnly,
    tabSize: 2
  };

  return (
    <CodeMirror
      ref={setRef}
      value={script}
      onChange={handleChange}
      options={options}
      autoFocus={true}
      tabSize={2}
      autoSave={true}
    />
  );
};

export default CodeMirrorBox;
