import React from "react";

import styled from "styled-components";
import Button from "@material-ui/core/Button";

const DownloadButton = ({ script }) => {
  const handleClick = () => {
    downloadTextFile(script);
  };

  return (
    <StyledButton variant="outlined" onClick={handleClick}>
      Download File
    </StyledButton>
  );
};

const downloadTextFile = (text, filename = "file.rs") => {
  var element = document.createElement("a");
  var file = new Blob([text], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  element.click();
};

const StyledButton = styled(Button)`
  display: flex;
  && {
    margin-left: 15px;
  }
`;

export default DownloadButton;
