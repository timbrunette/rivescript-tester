import React from "react";
import Message from "./Message.jsx";

import styled from "styled-components";

const MessageList = ({ messages }) => (
  <div>
    {messages.map((message, index) => (
      <StyledMessageContainer key={index}>
        <Message key={index} user={message.user} text={message.text} />
      </StyledMessageContainer>
    ))}
  </div>
);

const StyledMessageContainer = styled.div`
  clear: both;
`;

export default MessageList;
