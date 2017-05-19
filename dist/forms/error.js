'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ObsError = function (_React$Component) {
  _inherits(ObsError, _React$Component);

  function ObsError(props) {
    _classCallCheck(this, ObsError);

    var _this = _possibleConstructorReturn(this, (ObsError.__proto__ || Object.getPrototypeOf(ObsError)).call(this, props));

    _this.getErrorText = _this.getErrorText.bind(_this);
    return _this;
  }

  _createClass(ObsError, [{
    key: 'getErrorText',
    value: function getErrorText() {
      return this.props.errors.join(', ');
    }
  }, {
    key: 'render',
    value: function render() {
      if (_lodash2.default.isEmpty(this.props.errors)) return _react2.default.createElement('noscript', null);
      return _react2.default.createElement(
        'div',
        { className: 'error' },
        this.getErrorText()
      );
    }
  }]);

  return ObsError;
}(_react2.default.Component);

ObsError.propTypes = {
  errors: _propTypes2.default.array
};

ObsError.defaultProps = {
  errors: []
};

module.exports = ObsError;