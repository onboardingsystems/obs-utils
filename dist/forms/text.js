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
    // value
    errors: React.PropTypes.array,
    formatter: React.PropTypes.func,
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    label: React.PropTypes.string,
    hint: React.PropTypes.string,
    required: React.PropTypes.bool,
    customValidator: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    didMount: React.PropTypes.func,
    willUnmount: React.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      value: "",
      required: false,
      errors: [],
      id: _.uniqueId('text_'),
      formatter: Formatters.requiredFormatter
    };
  },
  componentDidMount: function componentDidMount() {
    if (_.isFunction(this.props.didMount)) this.props.didMount(this);
  },
  componentWillUnmount: function componentWillUnmount() {
    if (_.isFunction(this.props.willUnmount)) this.props.willUnmount(this);
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
      var formatResult,
          customErrors = [];
      formatResult = this.format(this.props.value);
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
      this.props.onBlur(formatResult);
      return formatResult.errors;
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
      React.createElement(ObsLabel, { text: this.props.label, hint: this.props.hint, htmlFor: this.props.id, required: this.props.required }),
      React.createElement('input', { id: this.props.id, className: 'form-control', type: 'text', value: this.props.value,
        placeholder: this.props.placeholder,
        onChange: this.onChange, onBlur: this.onBlur }),
      React.createElement(ObsError, { errors: this.props.errors })
    );
  }
});

module.exports = ObsText;