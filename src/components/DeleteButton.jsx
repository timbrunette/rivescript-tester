import React from 'react';
import styled from "styled-components";

import Button from '@material-ui/core/Button';

const DeleteButton = ({ messages, onClick }) => {
  if (messages.length === 0) {
    return null;
  }
  return (
    <StyledButton variant="outlined" onClick={onClick}>
      Delete Messages
    </StyledButton>
  );
};

const StyledButton = styled(Button)`
  && {
    float: right;
  }
`;

export default DeleteButton;