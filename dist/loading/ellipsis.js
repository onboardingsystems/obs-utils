'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoadingEllipsis = function (_React$Component) {
  _inherits(LoadingEllipsis, _React$Component);

  function LoadingEllipsis(props) {
    _classCallCheck(this, LoadingEllipsis);

    var _this = _possibleConstructorReturn(this, (LoadingEllipsis.__proto__ || Object.getPrototypeOf(LoadingEllipsis)).call(this, props));

    _this._dotInterval = null;
    _this.state = {
      dotCount: 0,
      dots: ''
    };

    _this.updateDots = _this.updateDots.bind(_this);
    return _this;
  }

  _createClass(LoadingEllipsis, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._dotInterval = setInterval(this.updateDots, 500);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(this._dotInterval);
    }
  }, {
    key: 'updateDots',
    value: function updateDots() {
      var count = this.state.dotCount + 1;
      if (count >= 4) count = 0;
      var dots = ".".repeat(count);
      this.setState({ dotCount: count, dots: dots });
    }
  }, {
    key: 'render',
    value: function render() {
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
  }]);

  return LoadingEllipsis;
}(_react2.default.Component);

module.exports = LoadingEllipsis;