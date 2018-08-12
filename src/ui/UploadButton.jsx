import React, { Component } from "react";
import GenericSnackBar from "./GenericSnackBar.jsx";

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

export default UploadButton;