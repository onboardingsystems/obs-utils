import React from 'react';

var HoldButton = React.createClass({
  propTypes: {
    label: React.PropTypes.string, // button text
    classes: React.PropTypes.string, // top level css classes
    wait: React.PropTypes.number, // time in ms to wait for confirmation
    onStart: React.PropTypes.func, // function called when mouse is pressed
    onStop: React.PropTypes.func, // function called when mouse is released
    onAction: React.PropTypes.func // function called after confirmation clicked
  },

  getDefaultProps() {
    return {
      label: "Delete",
      classes: "btn btn-default",
      doneIcon: "check-circle-o",
      transitionColor: "#337ab7",
      doneColor: "#27ae60",
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

  componentWillUnmount() {
    if(this.state.timeout != null) {
      clearTimeout(this.state.timeout);
    }
  },

  _increment: 100,

  mouseDown(e) {
    if(this.state.percent < 100) {
      var timeout = setTimeout(this.timeout, this._increment);
      this.startAction();
      this.setState({clicked: true, percent: 0, timeout: timeout, mouseDown: new Date()});
    }
  },

  mouseUp() {
    clearTimeout(this.state.timeout);
    if(this.state.percent < 100) {
      this.stopAction();
      this.setState({percent: 0, timeout: null, mouseDown: null});
    }
  },

  timeout() {
    if(this.state.mouseDown != null) {
      var percent = this.incrementPercent();
      var timeout = null;
      if(percent >= 100) {
        percent = 100;
        setTimeout(this.fireAction, 100);
      } else {
        timeout = setTimeout(this.timeout, this._increment);
      }
      this.setState({percent: percent, timeout: timeout});
    }
  },

  startAction() {
    if(typeof(this.props.onStart) != "undefined") {
      this.props.onStart();
    }
  },

  stopAction() {
    if(typeof(this.props.onStop) != "undefined") {
      this.props.onStop();
    }
  },

  fireAction() {
    if(typeof(this.props.onAction) != "undefined") {
      this.props.onAction();
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
	width: this.state.percent + "%",
        background: this.props.transitionColor
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
    if(this.state.percent == 100) {
      classes += " disabled done";
    }
    var doneIcon = "fa fa-" + this.props.doneIcon + " done-icon";

    return(
      <div className={classes} onMouseDown={this.mouseDown} onMouseUp={this.mouseUp}>
        <div className="message">{this.renderLabel()}</div>
        {this.renderProgressBar()}
        <i className={doneIcon} style={{color: this.props.doneColor}}/>
      </div>
    );
  }
});

module.exports = HoldButton;
