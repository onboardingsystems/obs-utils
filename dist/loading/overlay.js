'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoadingOverlay = function (_React$Component) {
  _inherits(LoadingOverlay, _React$Component);

  function LoadingOverlay(props) {
    _classCallCheck(this, LoadingOverlay);

    var _this = _possibleConstructorReturn(this, (LoadingOverlay.__proto__ || Object.getPrototypeOf(LoadingOverlay)).call(this, props));

    _this.blockClicks = _this.blockClicks.bind(_this);
    _this.renderOverlay = _this.renderOverlay.bind(_this);
    return _this;
  }

  _createClass(LoadingOverlay, [{
    key: 'blockClicks',
    value: function blockClicks(e) {
      return e.preventDefault();
    }
  }, {
    key: 'renderOverlay',
    value: function renderOverlay() {
      if (this.props.show) {
        return _react2.default.createElement(
          'div',
          { className: 'active-overlay', onClick: this.blockClicks },
          _react2.default.createElement(
            'div',
            { className: "overlay-text " + this.props.width + " " + this.props.height },
            _react2.default.createElement('i', { className: 'fa fa-cog fa-spin-x-slow' })
          )
        );
      } else {
        return _react2.default.createElement('noscript', null);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'loading-overlay' },
        this.renderOverlay(),
        this.props.children
      );
    }
  }]);

  return LoadingOverlay;
}(_react2.default.Component);

LoadingOverlay.propTypes = {
  show: _propTypes2.default.bool.isRequired,
  width: _propTypes2.default.string,
  height: _propTypes2.default.string
};

LoadingOverlay.defaultProps = {
  width: 'md',
  height: 'short'
};

module.exports = LoadingOverlay;