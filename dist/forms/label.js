'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _requiredMarker = require('./required-marker');

var _requiredMarker2 = _interopRequireDefault(_requiredMarker);

var _hint = require('./hint');

var _hint2 = _interopRequireDefault(_hint);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ObsLabel = function (_React$Component) {
  _inherits(ObsLabel, _React$Component);

  function ObsLabel() {
    _classCallCheck(this, ObsLabel);

    return _possibleConstructorReturn(this, (ObsLabel.__proto__ || Object.getPrototypeOf(ObsLabel)).apply(this, arguments));
  }

  _createClass(ObsLabel, [{
    key: 'somethingToRender',
    value: function somethingToRender() {
      return !_lodash2.default.isEmpty(this.props.text) || !_lodash2.default.isEmpty(this.props.hint);
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.somethingToRender()) return _react2.default.createElement('noscript', null);
      return _react2.default.createElement(
        'label',
        { className: 'control-label', htmlFor: this.props.htmlFor },
        this.props.text,
        _react2.default.createElement(_requiredMarker2.default, { required: this.props.required }),
        _react2.default.createElement(_hint2.default, { hint: this.props.hint })
      );
    }
  }]);

  return ObsLabel;
}(_react2.default.Component);

ObsLabel.propTypes = {
  text: _propTypes2.default.string,
  hint: _propTypes2.default.string,
  required: _propTypes2.default.bool,
  htmlFor: _propTypes2.default.string
}, ObsLabel.getDefaultProps = {
  required: false
};

module.exports = ObsLabel;