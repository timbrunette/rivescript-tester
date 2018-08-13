import React from "react";
import UploadButton from "./UploadButton.jsx";
import DownloadButton from "./DownloadButton.jsx";

import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const NavBar = ({ onFileUpload, script}) => (
  <NavBarContainer>
    <AppBar position="static" color="default">
      <Toolbar>
        <img src="/logo.png" alt="Accenture" />
        <Title variant="title" color="inherit">
          RiveScript Tester
        </Title>
        <UploadButton handleFileUpload={onFileUpload} />
        <DownloadButton script={script} />
      </Toolbar>
    </AppBar>
  </NavBarContainer>
);

const Title = styled(Typography)`
  align-self: center;
  padding-left: 10px;
  flex-grow: 1;
`;

const NavBarContainer = styled.div`
  display: flex;
  flex-grow: 1;
  margin-bottom: 50px;
`;

export default NavBar;
