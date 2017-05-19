'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _label = require('./label');

var _label2 = _interopRequireDefault(_label);

var _error = require('./error');

var _error2 = _interopRequireDefault(_error);

var _formatters = require('../formatters/formatters');

var _formatters2 = _interopRequireDefault(_formatters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ObsText = function (_React$Component) {
  _inherits(ObsText, _React$Component);

  function ObsText(props) {
    _classCallCheck(this, ObsText);

    var _this = _possibleConstructorReturn(this, (ObsText.__proto__ || Object.getPrototypeOf(ObsText)).call(this, props));

    _this.state = {
      id: props.id || _lodash2.default.uniqueId('text_')
    };

    _this.format = _this.format.bind(_this);
    _this.runValidations = _this.runValidations.bind(_this);
    _this.onChange = _this.onChange.bind(_this);
    _this.onBlur = _this.onBlur.bind(_this);
    _this.formatAndValidate = _this.formatAndValidate.bind(_this);
    _this.value = _this.value.bind(_this);
    return _this;
  }

  _createClass(ObsText, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // register this component with the formBuilder to aid with form validation
      // before submission (so that fields with focus can still be validated
      // instead of having to wait for a blur even to validate)
      if (_lodash2.default.isFunction(this.props.didMount)) this.props.didMount(this);

      // nothing left to do if there isn't an onChange to call
      if (!_lodash2.default.isFunction(this.props.onChange)) return;

      // If props.value is nil (undefined or null), fall back to
      // props.defaultValue and submit the formatted and parsed defaultValue back
      // to the formBuilder so we can be rendered again with a valid value in our
      // props.
      //
      // A defaultValue that responds to _.isNil will result in an infinate loop.
      // So check that the defaultValue will not respond to isNil before
      // submitting a new value for props.value.
      if (_lodash2.default.isNil(this.props.value) && !_lodash2.default.isNil(this.props.defaultValue)) {
        var _formatAndValidate = this.formatAndValidate(this.props.defaultValue),
            valid = _formatAndValidate.valid,
            parsed = _formatAndValidate.parsed,
            formatted = _formatAndValidate.formatted;

        if (valid) {
          this.props.onChange({ formatted: formatted, parsed: parsed });
        }
      } else {
        var _formatAndValidate2 = this.formatAndValidate(this.props.value),
            valid = _formatAndValidate2.valid,
            formatted = _formatAndValidate2.formatted;

        if (valid) {
          this.props.onChange({ formatted: formatted });
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (_lodash2.default.isFunction(this.props.willUnmount)) this.props.willUnmount(this);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      var currentValue = document.getElementById(this.state.id).value;
      if (newProps.value !== currentValue && _lodash2.default.isFunction(this.props.onChange)) {
        var result = this.formatAndValidate(newProps.value);
        if (result.valid) this.props.onChange(result.formatted);
      }
    }
  }, {
    key: 'format',
    value: function format(value) {
      return this.props.formatter(value, { required: this.props.required });
    }
  }, {
    key: 'runValidations',
    value: function runValidations() {
      return this.onBlur();
    }
  }, {
    key: 'onChange',
    value: function onChange(e) {
      if (_lodash2.default.isFunction(this.props.onChange)) this.props.onChange(e.target.value);
    }
  }, {
    key: 'onBlur',
    value: function onBlur(e) {
      if (_lodash2.default.isFunction(this.props.onBlur)) {
        var result = this.formatAndValidate(this.props.value);
        this.props.onBlur(result);
        return result.errors;
      }
    }
  }, {
    key: 'formatAndValidate',
    value: function formatAndValidate(value) {
      var formatResult,
          customErrors = [];
      formatResult = this.format(value);
      // run the customValidator if there is one.  Modify the formatResults if
      // there are errors.
      if (_lodash2.default.isFunction(this.props.customValidator)) {
        customErrors = this.props.customValidator(formatResult.formatted);
        if (!_lodash2.default.isEmpty(customErrors)) {
          formatResult.valid = false;
          formatResult.parsed = null;
          formatResult.errors = _lodash2.default.concat(formatResult.errors, customErrors);
        }
      }
      return formatResult;
    }

    // having a value of null can be bad for our controlled inputs, even if for a
    // little while.  So since our defaultValue doesn't kick in right away we
    // still need something here to help prevent bad values from being rendered.

  }, {
    key: 'value',
    value: function value() {
      if (_lodash2.default.isNil(this.props.value)) {
        return "";
      } else {
        return this.props.value;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var groupClasses = (0, _classnames2.default)(_defineProperty({
        "form-group": true,
        "has-error": !_lodash2.default.isEmpty(this.props.errors)
      }, this.props.className, _lodash2.default.isString(this.props.className)));

      return _react2.default.createElement(
        'div',
        { className: groupClasses },
        _react2.default.createElement(_label2.default, { text: this.props.label, hint: this.props.hint, htmlFor: this.state.id, required: this.props.required }),
        _react2.default.createElement('input', { id: this.state.id, className: 'form-control', type: this.props.type, value: this.value(),
          placeholder: this.props.placeholder,
          onChange: this.onChange, onBlur: this.onBlur,
          autoFocus: this.props.autoFocus }),
        _react2.default.createElement(_error2.default, { errors: this.props.errors })
      );
    }
  }]);

  return ObsText;
}(_react2.default.Component);

ObsText.propTypes = {
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  defaultValue: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  errors: _propTypes2.default.array,
  formatter: _propTypes2.default.func,
  id: _propTypes2.default.string,
  className: _propTypes2.default.string,
  autoFocus: _propTypes2.default.bool,
  placeholder: _propTypes2.default.string,
  label: _propTypes2.default.string,
  hint: _propTypes2.default.string,
  required: _propTypes2.default.bool,
  type: _propTypes2.default.string,
  customValidator: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  didMount: _propTypes2.default.func,
  willUnmount: _propTypes2.default.func
};

ObsText.defaultProps = {
  defaultValue: "",
  required: false,
  autoFocus: false,
  type: "text",
  errors: [],
  formatter: _formatters2.default.requiredFormatter
};

module.exports = ObsText;