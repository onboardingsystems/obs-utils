import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

class ConfirmButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      confirm: this.props.mode == "confirm",
      timeout: null
    };

    this._onClick = this._onClick.bind(this);
    this._onMouseOut = this._onMouseOut.bind(this);
    this._onMouseOver = this._onMouseOver.bind(this);
    this.clearTimeout = this.clearTimeout.bind(this);
    this.timeout = this.timeout.bind(this);
    this.endConfirm = this.endConfirm.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if((nextProps.mode == "confirm") !== this.state.confirm) {
      this.clearTimeout();
      this.setState({confirm: nextProps.mode == "confirm"});
    }
  }

  componentWillUnmount() {
    this.clearTimeout();
  }

  _onClick(e) {
    if(typeof(e) != "undefined") {
      e.stopPropagation();
    }

    if(this.state.confirm) {
      this.endConfirm();
      if(typeof(this.props.onAction) != "undefined") {
        this.props.onAction();
      }
    } else {
      this.setState({confirm: true});
      if(typeof(this.props.onConfirm) != "undefined") {
        this.props.onConfirm();
      }
    }
  }

  _onMouseOver() {
    if(this.state.confirm) {
      this.clearTimeout();
    }
  }

  _onMouseOut() {
    if(this.state.confirm) {
      var timeout = setTimeout(this.timeout, this.props.wait);
      this.setState({timeout: timeout});
    }
  }

  clearTimeout() {
    if(this.state.timeout != null) {
      clearTimeout(this.state.timeout);
      this.setState({timeout: null});
    }
  }

  timeout() {
    if(typeof(this.props.onTimeout) != "undefined") {
      this.props.onTimeout();
    }
    this.endConfirm();
  }

  endConfirm() {
    this.clearTimeout();
    this.setState({confirm: false});
  }

  render() {
    var classes = cx({
      'btn': true,
      'btn-default': !this.state.confirm,
      'btn-danger': this.state.confirm
    });

    var message = this.props.label;
    if(this.state.confirm) {
      message = this.props.message;
    }
    if(this.props.children != null) {
      message = this.props.children;
      classes = cx({});
    }

    return(
      <div className={classes} onMouseOver={this._onMouseOver} onMouseOut={this._onMouseOut} onClick={this._onClick}>
        {message}
      </div>
    );
  }
}

ConfirmButton.defaultProps = {
  label: "Delete",
  message: "Are you sure?",
  mode: null,
  wait: 3000
};

ConfirmButton.propTypes = {
  label: PropTypes.string, // Button text before click
  message: PropTypes.string, // Button text after click
  wait: PropTypes.number, // time in ms to wait for confirmation
  mode: PropTypes.string,
  onAction: PropTypes.func, // function called after confirmation clicked
  onConfirm: PropTypes.func, // function called on first click
  onTimeout: PropTypes.func // function called on timeout
};

export default ConfirmButton;