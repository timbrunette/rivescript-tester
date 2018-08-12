import React, { Component } from "react";
import GenericSnackBar from './GenericSnackBar.jsx';

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1,
    justifyContent: "space-between"
  }
};

class UploadButton extends Component {
  state = {
    selectedFileData: null,
    open: false,
    message: '',
  }

  handleFileChange = e => {
    const file = e.target.files[0];
    if (file.size > 2048000) {
      this.setState({ 
        open: true,
        message: 'Please upload a smaller file',
      });
    } 

    const extension = file.name.split('.').pop().toLowerCase();
    if (['rs', 'rive'].includes(extension)) {
      this.props.handleFileUpload(file);
      this.setState({ 
        open: true,
        message: 'File uploaded',
      });
    } else {
      this.setState({ 
        open: true,
        message: 'Please upload a rivescript file (.rs or .rive)',
      });
    }
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ 
      open: false,
      message: '',
    });
  }

  render() {
    return (
      <div>
        <input id="fileUpload" type="file" ref={(ref) => this.fileUpload = ref} style={{display: 'none'}} onChange={this.handleFileChange} />
        <Button color="inherit" onClick={(e) => this.fileUpload.click()} >Upload RiveScript</Button>
        <GenericSnackBar message={this.state.message} handleClose={this.handleClose} open={this.state.open} />
      </div>
    )
  }
}

class NavBar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar className={classes.flex}>
            <img src="/logo.png"/>
            <Typography variant="title" color="inherit">
              RiveScript Interpreter
            </Typography>
            <UploadButton handleFileUpload={this.props.onFileUpload} />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavBar);
