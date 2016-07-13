'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoadingOverlay = _react2.default.createClass({
  displayName: 'LoadingOverlay',

  propTypes: {
    show: _react2.default.PropTypes.bool.isRequired,
    width: _react2.default.PropTypes.string,
    height: _react2.default.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      width: 'md',
      height: 'short'
    };
  },
  blockClicks: function blockClicks(e) {
    return e.preventDefault();
  },
  renderOverlay: function renderOverlay() {
    if (this.props.show) {
      return _react2.default.createElement(
        'div',
        { className: 'active-overlay', onClick: this.blockClicks },
        _react2.default.createElement(
          'div',
          { className: "overlay-text #{this.props.width} #{this.props.height}" },
          _react2.default.createElement('i', { className: 'fa fa-cog fa-spin-x-slow' })
        )
      );
    } else {
      return _react2.default.createElement('noscript', null);
    }
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'loading-overlay' },
      this.renderOverlay(),
      this.props.children
    );
  }
});

module.exports = LoadingOverlay;