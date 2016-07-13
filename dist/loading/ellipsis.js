'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoadingEllipsis = _react2.default.createClass({
  displayName: 'LoadingEllipsis',

  _dotInterval: null,

  getInitialState: function getInitialState() {
    return {
      dotCount: 0,
      dots: ''
    };
  },
  componentDidMount: function componentDidMount() {
    this._dotInterval = setInterval(this.updateDots, 500);
  },
  componentWillUnmount: function componentWillUnmount() {
    clearInterval(this._dotInterval);
  },
  updateDots: function updateDots() {
    var count = this.state.dotCount + 1;
    if (count >= 4) count = 0;
    var dots = ".".repeat(count);
    this.setState({ dotCount: count, dots: dots });
  },
  render: function render() {
    return _react2.default.createElement(
      'span',
      { className: 'loading-ellipsis' },
      this.props.children || 'loading',
      _react2.default.createElement(
        'span',
        { className: 'dot-holder' },
        _react2.default.createElement(
          'span',
          { className: 'invisi-dots' },
          '...'
        ),
        _react2.default.createElement(
          'span',
          { className: 'dots' },
          this.state.dots
        )
      )
    );
  }
});

module.exports = LoadingEllipsis;