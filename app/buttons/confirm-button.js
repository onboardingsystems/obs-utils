import React from 'react';
var cx = require('classnames');

var ConfirmButton = React.createClass({
  propTypes: {
    label: React.PropTypes.string, // Button text before click
    message: React.PropTypes.string, // Button text after click
    wait: React.PropTypes.number, // time in ms to wait for confirmation
    onAction: React.PropTypes.func, // function called after confirmation clicked
    onConfirm: React.PropTypes.func // function called on first click
  },

  getDefaultProps() {
    return {
      label: "Delete",
      message: "Are you sure?",
      wait: 3000
    };
  },

  getInitialState() {
    return {
      confirm: false,
      timeout: null
    }
  },

  componentWillUnmount() {
    this.clearTimeout();
  },

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
  },

  _onMouseOver() {
    if(this.state.confirm) {
      this.clearTimeout();
    }
  },

  _onMouseOut() {
    if(this.state.confirm) {
      var timeout = setTimeout(this.endConfirm, this.props.wait);
      this.setState({timeout: timeout});
    }
  },

  clearTimeout() {
    if(this.state.timeout != null) {
      clearTimeout(this.state.timeout);
      this.setState({timeout: null});
    }
  },

  endConfirm() {
    this.clearTimeout();
    this.setState({confirm: false});
  },

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

    return(
      <div className={classes} onMouseOver={this._onMouseOver} onMouseOut={this._onMouseOut} onClick={this._onClick}>
        {message}
      </div>
    );
  }
});

module.exports = ConfirmButton;