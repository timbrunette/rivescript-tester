import React, { Component } from "react";
import GenericSnackBar from "./GenericSnackBar.jsx";

import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class UploadButton extends Component {
  state = {
    selectedFileData: null,
    open: false,
    message: ""
  };

  handleFileChange = e => {
    const file = e.target.files[0];
    if (file.size > 2048000) {
      this.setState({
        open: true,
        message: "Please upload a smaller file"
      });
    }

    const extension = file.name
      .split(".")
      .pop()
      .toLowerCase();
    if (["rs", "rive"].includes(extension)) {
      this.props.handleFileUpload(file);
      this.setState({
        open: true,
        message: "File uploaded"
      });
    } else {
      this.setState({
        open: true,
        message: "Please upload a rivescript file (.rs or .rive)"
      });
    }
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      open: false,
      message: ""
    });
  };

  render() {
    return (
      <div>
        <input
          id="fileUpload"
          type="file"
          ref={ref => (this.fileUpload = ref)}
          style={{ display: "none" }}
          onChange={this.handleFileChange}
        />
        <Button variant="outlined" onClick={e => this.fileUpload.click()}>
          Upload RiveScript File
        </Button>
        <GenericSnackBar
          message={this.state.message}
          handleClose={this.handleClose}
          open={this.state.open}
        />
      </div>
    );
  }
}

class NavBar extends Component {
  render() {
    return (
      <NavBarContainer>
        <AppBar position="static" color="default">
          <Toolbar>
            <img src="/logo.png" alt="Accenture" />
            <Title variant="title" color="inherit">
              RiveScript Interpreter
            </Title>
            <UploadButton handleFileUpload={this.props.onFileUpload} />
          </Toolbar>
        </AppBar>
      </NavBarContainer>
    );
  }
}

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
