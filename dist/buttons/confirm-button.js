'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cx = require('classnames');

var ConfirmButton = _react2.default.createClass({
  displayName: 'ConfirmButton',

  propTypes: {
    label: _react2.default.PropTypes.string, // Button text before click
    message: _react2.default.PropTypes.string, // Button text after click
    wait: _react2.default.PropTypes.number, // time in ms to wait for confirmation
    mode: _react2.default.PropTypes.string,
    onAction: _react2.default.PropTypes.func, // function called after confirmation clicked
    onConfirm: _react2.default.PropTypes.func, // function called on first click
    onTimeout: _react2.default.PropTypes.func // function called on timeout
  },

  getDefaultProps: function getDefaultProps() {
    return {
      label: "Delete",
      message: "Are you sure?",
      mode: null,
      wait: 3000
    };
  },
  getInitialState: function getInitialState() {
    return {
      confirm: this.props.mode == "confirm",
      timeout: null
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.mode == "confirm" !== this.state.confirm) {
      this.clearTimeout();
      this.setState({ confirm: nextProps.mode == "confirm" });
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    this.clearTimeout();
  },
  _onClick: function _onClick(e) {
    if (typeof e != "undefined") {
      e.stopPropagation();
    }

    if (this.state.confirm) {
      this.endConfirm();
      if (typeof this.props.onAction != "undefined") {
        this.props.onAction();
      }
    } else {
      this.setState({ confirm: true });
      if (typeof this.props.onConfirm != "undefined") {
        this.props.onConfirm();
      }
    }
  },
  _onMouseOver: function _onMouseOver() {
    if (this.state.confirm) {
      this.clearTimeout();
    }
  },
  _onMouseOut: function _onMouseOut() {
    if (this.state.confirm) {
      var timeout = setTimeout(this.timeout, this.props.wait);
      this.setState({ timeout: timeout });
    }
  },
  clearTimeout: function (_clearTimeout) {
    function clearTimeout() {
      return _clearTimeout.apply(this, arguments);
    }

    clearTimeout.toString = function () {
      return _clearTimeout.toString();
    };

    return clearTimeout;
  }(function () {
    if (this.state.timeout != null) {
      clearTimeout(this.state.timeout);
      this.setState({ timeout: null });
    }
  }),
  timeout: function timeout() {
    if (typeof this.props.onTimeout != "undefined") {
      this.props.onTimeout();
    }
    this.endConfirm();
  },
  endConfirm: function endConfirm() {
    this.clearTimeout();
    this.setState({ confirm: false });
  },
  render: function render() {
    var classes = cx({
      'btn': true,
      'btn-default': !this.state.confirm,
      'btn-danger': this.state.confirm
    });

    var message = this.props.label;
    if (this.state.confirm) {
      message = this.props.message;
    }
    if (this.props.children != null) {
      message = this.props.children;
      classes = cx({});
    }

    return _react2.default.createElement(
      'div',
      { className: classes, onMouseOver: this._onMouseOver, onMouseOut: this._onMouseOut, onClick: this._onClick },
      message
    );
  }
});

module.exports = ConfirmButton;