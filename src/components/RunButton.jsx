import React from "react";

import Button from "@material-ui/core/Button";

const RunButton = ({ onClick, readOnly }) => {
  const color = readOnly ? "secondary" : "primary";
  return (
    <Button variant="contained" color={color} onClick={onClick}>
      {readOnly ? "Stop" : "Run"}
    </Button>
  );
};

export default RunButton;
