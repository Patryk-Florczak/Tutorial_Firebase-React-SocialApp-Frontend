import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';

import {
  withStyles,
  Button,
  TextField,
  Dialog,
  CircularProgress,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

import {
  Edit as EditIcon,
  Add as AddIcon,
  Close as CloseIcon,
} from '@material-ui/icons';

import { connect } from 'react-redux';
import { postScream } from '../redux/actions/dataActions';

const styles = (theme) => ({
  ...theme.globalStyles,
  submitButton: {
    position: 'relative',
  },
  progressSpinner: {
    position: 'absolute',
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
    top: '10%',
  },
});

class PostScream extends Component {
  state = {
    open: false,
    body: '',
    errors: {},
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: '' });
      this.handleClose();
    }
  }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false, errors: {} });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.postScream({ body: this.state.body });
  };
  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading },
    } = this.props;
    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="Post a Scream!">
          <AddIcon />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Post a new Scream</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="Scream"
                multiline
                rows="3"
                placeholder="Scream!"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={5}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { postScream })(
  withStyles(styles)(PostScream)
);
