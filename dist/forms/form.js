'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ObsForm = function (_React$Component) {
  _inherits(ObsForm, _React$Component);

  function ObsForm(props) {
    _classCallCheck(this, ObsForm);

    var _this = _possibleConstructorReturn(this, (ObsForm.__proto__ || Object.getPrototypeOf(ObsForm)).call(this, props));

    _this.onSubmit = _this.onSubmit.bind(_this);
    return _this;
  }

  _createClass(ObsForm, [{
    key: 'onSubmit',
    value: function onSubmit(e) {
      e.stopPropagation();
      e.preventDefault();
      if (_.isObject(this.props.builder)) {
        this.props.builder.onSubmit(e);
      } else if (_.isFunction(this.props.onSubmit)) {
        this.props.onSubmit(e);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var classes;
      classes = (0, _classnames2.default)(_defineProperty({
        'form': true
      }, this.props.className, _.isString(this.props.className)));

      return _react2.default.createElement(
        'form',
        { className: classes, onSubmit: this.onSubmit },
        _react2.default.createElement('input', { type: 'submit', style: { display: 'none' } }),
        this.props.children
      );
    }
  }]);

  return ObsForm;
}(_react2.default.Component);

ObsForm.propTypes = {
  onSubmit: _propTypes2.default.func,
  builder: _propTypes2.default.object,
  className: _propTypes2.default.string
};

module.exports = ObsForm;