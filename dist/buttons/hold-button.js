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
    onAction: _react2.default.PropTypes.func // function called after confirmation clicked
  },

  getDefaultProps: function getDefaultProps() {
    return {
      label: "Delete",
      classes: "btn btn-danger",
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


  _increment: 100,

  mouseDown: function mouseDown(e) {
    var timeout = setTimeout(this.timeout, this._increment);
    this.setState({ clicked: true, percent: 0, timeout: timeout, mouseDown: new Date() });
  },
  mouseUp: function mouseUp() {
    clearTimeout(this.state.timeout);
    this.setState({ percent: 0, timeout: null, mouseDown: null });
  },
  timeout: function timeout() {
    if (this.state.mouseDown != null) {
      var timeout = setTimeout(this.timeout, this._increment);
      var percent = this.incrementPercent();
      if (percent >= 100) {
        percent = 100;
        if (typeof this.props.onAction != "undefined") {
          this.props.onAction();
        }
      }
      this.setState({ percent: percent, timeout: timeout });
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
        width: this.state.percent + "%"
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

    return _react2.default.createElement(
      "div",
      { className: classes, onMouseDown: this.mouseDown, onMouseUp: this.mouseUp },
      this.renderLabel(),
      this.renderProgressBar()
    );
  }
});

module.exports = HoldButton;