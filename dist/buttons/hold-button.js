"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HoldButton = _react2.default.createClass({
  displayName: "HoldButton",

  propTypes: {
    label: _react2.default.PropTypes.string, // button text
    classes: _react2.default.PropTypes.string, // top level css classes
    wait: _react2.default.PropTypes.number, // time in ms to wait for confirmation
    onStart: _react2.default.PropTypes.func, // function called when mouse is pressed
    onStop: _react2.default.PropTypes.func, // function called when mouse is released
    onAction: _react2.default.PropTypes.func // function called after confirmation clicked
  },

  getDefaultProps: function getDefaultProps() {
    return {
      label: "Delete",
      classes: "btn btn-default",
      doneIcon: "check-circle-o",
      transitionColor: "#337ab7",
      doneColor: "#27ae60",
      wait: 750
    };
  },
  getInitialState: function getInitialState() {
    return {
      clicked: false,
      percent: 0,
      mouseDown: null,
      timeout: null
    };
  },
  componentWillUnmount: function componentWillUnmount() {
    if (this.state.timeout != null) {
      clearTimeout(this.state.timeout);
    }
  },


  _increment: 100,

  mouseDown: function mouseDown(e) {
    if (this.state.percent < 100) {
      var timeout = setTimeout(this.timeout, this._increment);
      this.startAction();
      this.setState({ clicked: true, percent: 0, timeout: timeout, mouseDown: new Date() });
    }
  },
  mouseUp: function mouseUp() {
    clearTimeout(this.state.timeout);
    if (this.state.percent < 100) {
      this.stopAction();
      this.setState({ percent: 0, timeout: null, mouseDown: null });
    }
  },
  timeout: function timeout() {
    if (this.state.mouseDown != null) {
      var percent = this.incrementPercent();
      var timeout = null;
      if (percent >= 100) {
        percent = 100;
        setTimeout(this.fireAction, 100);
      } else {
        timeout = setTimeout(this.timeout, this._increment);
      }
      this.setState({ percent: percent, timeout: timeout });
    }
  },
  startAction: function startAction() {
    if (typeof this.props.onStart != "undefined") {
      this.props.onStart();
    }
  },
  stopAction: function stopAction() {
    if (typeof this.props.onStop != "undefined") {
      this.props.onStop();
    }
  },
  fireAction: function fireAction() {
    if (typeof this.props.onAction != "undefined") {
      this.props.onAction();
    }
  },
  incrementPercent: function incrementPercent() {
    return Math.floor(this._increment / this.props.wait * 100 + this.state.percent);
  },
  renderLabel: function renderLabel() {
    if (this.state.clicked) {
      return "Hold to " + this.props.label;
    } else {
      return this.props.label;
    }
  },
  renderProgressBar: function renderProgressBar() {
    if (this.state.mouseDown != null) {
      var style = {
        width: this.state.percent + "%",
        background: this.props.transitionColor
      };

      return _react2.default.createElement(
        "div",
        { className: "progress" },
        _react2.default.createElement("div", { className: "progress-bar progress-bar-striped", role: "progressbar", style: style })
      );
    }
  },
  render: function render() {
    var classes = this.props.classes + " hold-button";
    if (this.state.percent == 100) {
      classes += " disabled done";
    }
    var doneIcon = "fa fa-" + this.props.doneIcon + " done-icon";

    return _react2.default.createElement(
      "div",
      { className: classes, onMouseDown: this.mouseDown, onMouseUp: this.mouseUp },
      _react2.default.createElement(
        "div",
        { className: "message" },
        this.renderLabel()
      ),
      this.renderProgressBar(),
      _react2.default.createElement("i", { className: doneIcon, style: { color: this.props.doneColor } })
    );
  }
});

module.exports = HoldButton;