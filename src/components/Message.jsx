import React from 'react';

import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const Message = ({ user, text }) => {
  let align = user === "Bot" ? "left" : "right";
  return (
    <MessageTextContainer elevation={1} square={true} align={align}>
      <Typography color="inherit">{text}</Typography>
    </MessageTextContainer>
  );
};

const MessageTextContainer = styled(Paper)`
  /* Adapt the location based on user props */
  margin: 5px;
  margin-left: ${props => (props.align === "right" ? "30px" : "10px")};
  margin-right: ${props => (props.align === "right" ? "10px" : "30px")};
  padding: 10px;
  display: inline-block;
  float: ${props => props.align};
  border-radius: 30px;
  border-bottom-right-radius: ${props =>
    props.align === "right" ? 0 : "30px"};
  border-bottom-left-radius: ${props => (props.align === "right" ? "30px" : 0)};
  && {
    background-color: ${props =>
      props.align === "right" ? "#3f51b5" : "white"};
    color: ${props => (props.align === "right" ? "white" : "default")};
  }
`;

export default Message;