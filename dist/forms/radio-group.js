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

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _label = require('./label');

var _label2 = _interopRequireDefault(_label);

var _error = require('./error');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ObsRadioGroup = function (_React$Component) {
  _inherits(ObsRadioGroup, _React$Component);

  function ObsRadioGroup(props) {
    _classCallCheck(this, ObsRadioGroup);

    var _this = _possibleConstructorReturn(this, (ObsRadioGroup.__proto__ || Object.getPrototypeOf(ObsRadioGroup)).call(this, props));

    _this.state = {
      id: props.id || _lodash2.default.uniqueId('radio_group_')
    };

    _this.runValidations = _this.runValidations.bind(_this);
    _this.onChange = _this.onChange.bind(_this);
    _this.onBlur = _this.onBlur.bind(_this);
    _this.formatAndValidate = _this.formatAndValidate.bind(_this);
    return _this;
  }

  _createClass(ObsRadioGroup, [{
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
      var currentValue = (0, _jquery2.default)('#' + this.state.id + ' input:checked').val();

      if (newProps.value !== currentValue && _lodash2.default.isFunction(this.props.onChange)) {
        var result = this.formatAndValidate(newProps.value);
        if (result.valid) this.props.onChange(result.formatted);
      }
    }
  }, {
    key: 'runValidations',
    value: function runValidations() {
      this.onBlur();
    }

    // have onChange also fire onBlur so it can clear errors.  Otherwise,
    // selecting a radio will not clear errors and when you try to click on
    // something below the input it will blur, clear the error, and shift the
    // layout making it difficult to click on the next input.

  }, {
    key: 'onChange',
    value: function onChange(e) {
      if (_lodash2.default.isFunction(this.props.onBlur)) {
        this.props.onBlur(this.formatAndValidate(e.target.value));
      }
    }
  }, {
    key: 'onBlur',
    value: function onBlur() {
      if (_lodash2.default.isFunction(this.props.onBlur)) {
        this.props.onBlur(this.formatAndValidate(this.props.value));
      }
    }
  }, {
    key: 'formatAndValidate',
    value: function formatAndValidate(value) {
      var formatted,
          parsed,
          errors = [];

      // rewrite "blank" values as null
      if (_lodash2.default.isNil(value)) value = null;
      if (_lodash2.default.isEmpty(value)) value = null;

      // both formatted and parsed values are the same.  This is by design to
      // simplify things.  Otherwise, the value props would have to be able to
      // accept the formatted or parsed value as valid input.
      formatted = value;
      parsed = value;

      // check for required
      if (this.props.required && _lodash2.default.isNull(parsed)) {
        errors.push('is required');
      }

      // check for inclusion in the list of options, but only if there wasn't a
      // requirement error first
      if (_lodash2.default.isEmpty(errors)) {
        var allowedValues = _lodash2.default.map(this.props.options, "value");
        if (!_lodash2.default.includes(allowedValues, value)) {
          errors.push('invalid value');
          parsed = null;
        }
      }

      return {
        valid: errors.length === 0,
        parsed: parsed,
        formatted: formatted,
        errors: errors
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var groupClasses = (0, _classnames2.default)(_defineProperty({
        "form-group": true,
        "has-error": !_lodash2.default.isEmpty(this.props.errors)
      }, this.props.className, _lodash2.default.isString(this.props.className)));

      var options = _lodash2.default.map(this.props.options, function (option, i) {
        var checked = option.value === _this2.props.value;
        // give the radio input an id of "id[value]".  So if the id was
        // "some_radio_group" and the value was "red" the resulting id will be
        // "some_radio_group[red]"
        var id = _this2.state.id + '[' + option.value + ']';
        // create a checked style to make it easier to create custom radio
        // styles
        var radioLabelClass = (0, _classnames2.default)({
          "radio-label": true,
          "checked": checked
        });
        return _react2.default.createElement(
          'div',
          { className: 'radio', key: i },
          _react2.default.createElement(
            'label',
            { className: radioLabelClass },
            _react2.default.createElement('input', { type: 'radio', id: id, value: option.value, checked: checked, onChange: _this2.onChange, onBlur: _this2.onBlur, autoFocus: _this2.props.autoFocus }),
            option.name
          )
        );
      });

      return _react2.default.createElement(
        'div',
        { className: groupClasses, id: this.state.id },
        _react2.default.createElement(_label2.default, { className: 'radio-group-label', text: this.props.label, hint: this.props.hint, htmlFor: this.state.id, required: this.props.required }),
        options,
        _react2.default.createElement(_error2.default, { errors: this.props.errors })
      );
    }
  }]);

  return ObsRadioGroup;
}(_react2.default.Component);

ObsRadioGroup.propTypes = {
  value: _propTypes2.default.string,
  defaultValue: _propTypes2.default.string,
  options: _propTypes2.default.array,
  errors: _propTypes2.default.array,
  id: _propTypes2.default.string,
  className: _propTypes2.default.string,
  autoFocus: _propTypes2.default.bool,
  label: _propTypes2.default.string,
  hint: _propTypes2.default.string,
  required: _propTypes2.default.bool,
  customValidator: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  didMount: _propTypes2.default.func,
  willUnmount: _propTypes2.default.func
};

ObsRadioGroup.defaultProps = {
  defaultValue: "",
  required: false,
  autoFocus: false,
  options: [],
  errors: []
};

module.exports = ObsRadioGroup;