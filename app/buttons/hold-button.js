import React from 'react';

var HoldButton = React.createClass({
  propTypes: {
    label: React.PropTypes.string, // button text
    classes: React.PropTypes.string, // top level css classes
    wait: React.PropTypes.number, // time in ms to wait for confirmation
    onAction: React.PropTypes.func // function called after confirmation clicked
  },

  getDefaultProps() {
    return {
      label: "Delete",
      classes: "btn btn-danger",
      wait: 750
    };
  },

  getInitialState() {
    return {
      clicked: false,
      percent: 0,
      mouseDown: null,
      timeout: null
    };
  },

  _increment: 100,

  mouseDown(e) {
    var timeout = setTimeout(this.timeout, this._increment);
    this.setState({clicked: true, percent: 0, timeout: timeout, mouseDown: new Date()});
  },

  mouseUp() {
    clearTimeout(this.state.timeout);
    this.setState({percent: 0, timeout: null, mouseDown: null});
  },

  timeout() {
    if(this.state.mouseDown != null) {
      var timeout = setTimeout(this.timeout, this._increment);
      var percent = this.incrementPercent();
      if(percent >= 100) {
        percent = 100;
        if(typeof(this.props.onAction) != "undefined") {
          this.props.onAction();
        }
      }
      this.setState({percent: percent, timeout: timeout});
    }
  },

  incrementPercent() {
    return Math.floor(((this._increment / this.props.wait) * 100) + this.state.percent);
  },

  renderLabel() {
    if(this.state.clicked) {
      return "Hold to " + this.props.label;
    } else {
      return this.props.label;
    }
  },

  renderProgressBar() {
    if(this.state.mouseDown != null) {
      var style = {
	width: this.state.percent + "%"
      };

      return(
        <div className="progress">
          <div className="progress-bar progress-bar-striped" role="progressbar" style={style}></div>
        </div>
      );
    }
  },

  render() {
    var classes = this.props.classes + " hold-button";

    return(
      <div className={classes} onMouseDown={this.mouseDown} onMouseUp={this.mouseUp}>
	{this.renderLabel()}
	{this.renderProgressBar()}
      </div>
    );
  }
});

module.exports = HoldButton;
