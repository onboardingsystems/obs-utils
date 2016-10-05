'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cx = require('classnames');

var ConfirmButton = _react2.default.createClass({
  displayName: 'ConfirmButton',
  getInitialState: function getInitialState() {
    return {
      confirm: false,
      delay: null
    };
  },
  componentWillUnmount: function componentWillUnmount() {
    clearTimeout(this.state.delay);
  },
  _onClick: function _onClick(e) {
    var _this = this;

    e.stopPropagation();
    if (this.state.confirm) {
      this.props.action();
    } else {
      this.setState({
        confirm: true,
        delay: delay(3000, function () {
          _this.setState({ confirm: false });
        })
      });
    }
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

    return _react2.default.createElement(
      'div',
      { className: classes, onClick: this._onClick },
      message
    );
  }
});

module.exports = ConfirmButton;