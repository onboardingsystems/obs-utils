'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = require('react');
var ReactDOM = require('react-dom');
var cx = require('classnames');
var _ = require('lodash');

var ObsLabel = require('./label');
var ObsError = require('./error');
var Formatters = require('../formatters/formatters');

var ObsText = React.createClass({
  displayName: 'ObsText',

  propTypes: {
    value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    defaultValue: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    errors: React.PropTypes.array,
    formatter: React.PropTypes.func,
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    autoFocus: React.PropTypes.bool,
    placeholder: React.PropTypes.string,
    label: React.PropTypes.string,
    hint: React.PropTypes.string,
    required: React.PropTypes.bool,
    type: React.PropTypes.string,
    customValidator: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    didMount: React.PropTypes.func,
    willUnmount: React.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      defaultValue: "",
      required: false,
      autoFocus: false,
      type: "text",
      errors: [],
      formatter: Formatters.requiredFormatter
    };
  },
  getInitialState: function getInitialState() {
    return {
      id: this.props.id || _.uniqueId('text_')
    };
  },
  componentDidMount: function componentDidMount() {
    // register this component with the formBuilder to aid with form validation
    // before submission (so that fields with focus can still be validated
    // instead of having to wait for a blur even to validate)
    if (_.isFunction(this.props.didMount)) this.props.didMount(this);

    // nothing left to do if there isn't an onChange to call
    if (!_.isFunction(this.props.onChange)) return;

    // If props.value is nil (undefined or null), fall back to
    // props.defaultValue and submit the formatted and parsed defaultValue back
    // to the formBuilder so we can be rendered again with a valid value in our
    // props.
    //
    // A defaultValue that responds to _.isNil will result in an infinate loop.
    // So check that the defaultValue will not respond to isNil before
    // submitting a new value for props.value.
    if (_.isNil(this.props.value) && !_.isNil(this.props.defaultValue)) {
      var _formatAndValidate = this.formatAndValidate(this.props.defaultValue);

      var valid = _formatAndValidate.valid;
      var parsed = _formatAndValidate.parsed;
      var formatted = _formatAndValidate.formatted;

      if (valid) {
        this.props.onChange({ formatted: formatted, parsed: parsed });
      }
    } else {
      var _formatAndValidate2 = this.formatAndValidate(this.props.value);

      var valid = _formatAndValidate2.valid;
      var formatted = _formatAndValidate2.formatted;

      if (valid) {
        this.props.onChange({ formatted: formatted });
      }
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    if (_.isFunction(this.props.willUnmount)) this.props.willUnmount(this);
  },
  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    var currentValue = document.getElementById(this.state.id).value;
    if (newProps.value !== currentValue && _.isFunction(this.props.onChange)) {
      var result = this.formatAndValidate(newProps.value);
      if (result.valid) this.props.onChange(result.formatted);
    }
  },
  format: function format(value) {
    return this.props.formatter(value, { required: this.props.required });
  },
  runValidations: function runValidations() {
    return this.onBlur();
  },
  onChange: function onChange(e) {
    if (_.isFunction(this.props.onChange)) this.props.onChange(e.target.value);
  },
  onBlur: function onBlur(e) {
    if (_.isFunction(this.props.onBlur)) {
      var result = this.formatAndValidate(this.props.value);
      this.props.onBlur(result);
      return result.errors;
    }
  },
  formatAndValidate: function formatAndValidate(value) {
    var formatResult,
        customErrors = [];
    formatResult = this.format(value);
    // run the customValidator if there is one.  Modify the formatResults if
    // there are errors.
    if (_.isFunction(this.props.customValidator)) {
      customErrors = this.props.customValidator(formatResult.formatted);
      if (!_.isEmpty(customErrors)) {
        formatResult.valid = false;
        formatResult.parsed = null;
        formatResult.errors = _.concat(formatResult.errors, customErrors);
      }
    }
    return formatResult;
  },


  // having a value of null can be bad for our controlled inputs, even if for a
  // little while.  So since our defaultValue doesn't kick in right away we
  // still need something here to help prevent bad values from being rendered.
  value: function value() {
    if (_.isNil(this.props.value)) {
      return "";
    } else {
      return this.props.value;
    }
  },
  render: function render() {
    var groupClasses = cx(_defineProperty({
      "form-group": true,
      "has-error": !_.isEmpty(this.props.errors)
    }, this.props.className, _.isString(this.props.className)));

    return React.createElement(
      'div',
      { className: groupClasses },
      React.createElement(ObsLabel, { text: this.props.label, hint: this.props.hint, htmlFor: this.state.id, required: this.props.required }),
      React.createElement('input', { id: this.state.id, className: 'form-control', type: this.props.type, value: this.value(),
        placeholder: this.props.placeholder,
        onChange: this.onChange, onBlur: this.onBlur,
        autoFocus: this.props.autoFocus }),
      React.createElement(ObsError, { errors: this.props.errors })
    );
  }
});

module.exports = ObsText;