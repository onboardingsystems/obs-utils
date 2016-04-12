'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');
var cx = require('classnames');
var ObsForm = require('./form');
var ObsLabel = require('./label');
var ObsError = require('./error');
var ObsTextarea = require('./textarea');
var ObsFormattedText = require('./formatted-text');
var ObsCheckbox = require('./checkbox');
var ObsCompoundLayout = require('./compound-layout');
var ObsAddressUs = require('./address-us');
var Formatters = require('../formatters/formatters');

// Expected errors format.
// errors: {
//   "person.name.first": ['Bad name']
//   "address.state": ['is required']
// }

var FormBuilder = {
  new: function _new(object, errors) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var data = {
      object: object,
      errors: errors,
      onValueChange: options.onValueChange,
      onErrorChange: options.onErrorChange,
      onTouch: options.onTouch,
      // return if the form builder form is valid
      isValid: function isValid() {
        return_.isEmpty(this.errors);
      },

      // set the value for the attribute name.
      set: function set(attrName, value) {
        _.set(this.object, attrName, value);
        if (_.isFunction(this.onValueChange)) this.onValueChange(this.object);
      },

      // get the value for the attribute name.
      get: function get(attrName) {
        return _.get(this.object, attrName);
      }
    };

    return _.extend({}, data, Components);
  }
};

var Components = {

  // alias Obs components to make using them easier
  form: ObsForm,
  compoundLayout: ObsCompoundLayout,
  label: ObsLabel,

  textareaField: function textareaField(label, attrName) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    return React.createElement(ObsTextarea, { label: label, hint: options.hint, required: options.required,
      value: this.get(attrName), rows: options.rows,
      className: options.className, id: options.id,
      onChange: _.bind(this._onChange, this, options, attrName),
      placeholder: options.placeholder, errors: this._getErrors(attrName) });
  },
  formattedField: function formattedField(label, attrName, formatterFun) {
    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

    return React.createElement(ObsFormattedText, { label: label, hint: options.hint, required: options.required,
      object: this.object, errors: this._getErrors(attrName), attr: attrName, formatter: formatterFun,
      className: options.className, id: options.id,
      onChange: _.bind(this._onChange, this, options),
      onTouch: _.bind(this._fieldTouched, this),
      onErrorChange: _.bind(this._formatErrorChanged, this),
      placeholder: options.placeholder });
  },
  checkboxField: function checkboxField(label, attrName) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var options = this._mergeClasses(options, 'obs-checkbox');
    return React.createElement(ObsCheckbox, { label: label, hint: options.hint, required: options.required,
      value: !!this.get(attrName), errors: this._getErrors(attrName),
      className: options.className, id: options.id,
      onChange: _.bind(this._onChange, this, options, attrName),
      onTouch: _.bind(this._fieldTouched, this, attrName) });
  },
  textField: function textField(label, attrName) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    return this.formattedField(label, attrName, Formatters.stringFormatter, options);
  },
  phoneField: function phoneField(label, attrName) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    return this.formattedField(label, attrName, Formatters.phoneFormatter, this._mergeClasses(options, 'obs-phone'));
  },
  ssnField: function ssnField(label, attrName) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    return this.formattedField(label, attrName, Formatters.ssnFormatter, this._mergeClasses(options, 'obs-ssn'));
  },
  stateField: function stateField(label, attrName) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    return this.formattedField(label, attrName, Formatters.stateFormatter, this._mergeClasses(options, 'obs-state'));
  },
  zipcodeField: function zipcodeField(label, attrName) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    return this.formattedField(label, attrName, Formatters.zipcodeFormatter, this._mergeClasses(options, 'obs-zipcode'));
  },
  currencyField: function currencyField(label, attrName) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    return this.formattedField(label, attrName, Formatters.currencyFormatter, this._mergeClasses(options, 'obs-currency'));
  },
  dollarsField: function dollarsField(label, attrName) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    return this.formattedField(label, attrName, Formatters.dollarsFormatter, this._mergeClasses(options, 'obs-dollars'));
  },
  dateField: function dateField(label, attrName) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    // merge the requested format option in for the formatter
    var formatter = function formatter(value, opt) {
      return Formatters.dateFormatter(value, _.merge({}, opt, { format: options.format }));
    };
    return this.formattedField(label, attrName, formatter, this._mergeClasses(options, 'obs-date'));
  },
  timeField: function timeField(label, attrName) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    // merge the requested format option in for the formatter
    var formatter = function formatter(value, opt) {
      return Formatters.timeFormatter(value, _.merge({}, opt, { format: options.format }));
    };
    return this.formattedField(label, attrName, formatter, this._mergeClasses(options, 'obs-time'));
  },
  ordinalField: function ordinalField(label, attrName) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    return this.formattedField(label, attrName, Formatters.ordinalFormatter, this._mergeClasses(options, 'obs-ordinal'));
  },
  addressField: function addressField(label, attrName) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    return React.createElement(ObsAddressUs, { label: label, object: this.object, attr: attrName, errors: this.errors,
      required: options.required, hint: options.hint, className: options.className,
      onChange: _.bind(this._onChange, this, options),
      onErrorChange: _.bind(this._formatErrorChanged, this),
      onTouch: _.bind(this._fieldTouched, this) });
  },


  // private-like methods

  _mergeClasses: function _mergeClasses(options, classes) {
    options['className'] = cx(options['className'], classes);
    return options;
  },
  _onChange: function _onChange(options, attrName, value) {
    this.set(attrName, value);
    // if given an 'onChange' event in the options, fire it after setting the
    // value on the object. Pass the attrName after the value as it is
    // "optional". For complex inputs, it gives context to which part that
    // changed (like with an address).
    if (_.isFunction(options['onChange'])) options['onChange'](value, attrName);
  },
  _formatErrorChanged: function _formatErrorChanged(attrName, errors) {
    if (_.isEmpty(errors)) delete this.errors[attrName];else this.errors[attrName] = errors;
    if (_.isFunction(this.onErrorChange)) this.onErrorChange();
  },
  _fieldTouched: function _fieldTouched(attrName) {
    // remove any server errors from the list if the field was touched.
    delete this.errors[attrName];
    if (_.isFunction(this.onTouch)) this.onTouch(attrName);
    if (_.isFunction(this.onErrorChange)) this.onErrorChange();
  },
  _getErrors: function _getErrors(attrName) {
    return this.errors[attrName];
  }
};

module.exports = FormBuilder;
;"use strict";

var React = require('react');

var ObsForm = React.createClass({
  displayName: "ObsForm",

  propTypes: {
    onSubmit: React.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      onSubmit: this.blockManualSubmit
    };
  },
  blockManualSubmit: function blockManualSubmit(e) {
    e.preventDefault();
    // don't do anything here. prevent hitting "ENTER" from reloading the form.
  },
  render: function render() {
    return React.createElement(
      "form",
      { className: "form", onSubmit: this.props.onSubmit },
      this.props.children
    );
  }
});

module.exports = ObsForm;
;'use strict';

var React = require('react');
var cx = require('classnames');
var _ = require('lodash');

var ObsText = require('./text');

var ObsFormattedText = React.createClass({
  displayName: 'ObsFormattedText',

  propTypes: {
    object: React.PropTypes.object.isRequired,
    attr: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    formatter: React.PropTypes.func.isRequired,
    onErrorChange: React.PropTypes.func,
    // field was "touched" by user. Requires a change.
    onTouch: React.PropTypes.func,
    errors: React.PropTypes.array,
    label: React.PropTypes.string,
    hint: React.PropTypes.string,
    required: React.PropTypes.bool,
    placeholder: React.PropTypes.string,
    className: React.PropTypes.string,
    id: React.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      required: false,
      errors: []
    };
  },
  getInitialState: function getInitialState() {
    return _.merge(this.processValue(_.get(this.props.object, this.props.attr)), { userTouched: false });
  },
  processValue: function processValue(value) {
    var val;
    val = this.props.formatter(value);
    return {
      value: val.parsed,
      formatted: val.formatted,
      display: val.formatted,
      formatErrors: val.errors
    };
  },
  componentDidMount: function componentDidMount() {
    // re-assign the same errors, so it will fire the callback. Inform
    // parent/subscriber that there are initial state formatting errors. No
    // state actually changes.
    if (!_.isEmpty(this.state.formatErrors)) this.formatErrorsChange(this.state.formatErrors);
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var rawFieldVal;
    // if errors changed, reset the "userTouched" flag and not empty, display
    // them again. Clear state of modified-since-errors-given
    if (this.props.errors !== nextProps.errors) this.setState({ userTouched: false });
    // respond to the value being changed outside the input. display the new
    // value if it has changed.
    rawFieldVal = _.get(this.props.object, this.props.attr);
    if (rawFieldVal !== this.state.value) this.setState(this.processValue(rawFieldVal));
  },
  _valueChanged: function _valueChanged(newVal) {
    var val;
    val = this.props.formatter(newVal);
    this.setState({ value: val.parsed, display: newVal });
    this.formatErrorsChange(null);
    this.fieldTouched();
    // only fire onChange if valid. Clear formatting errors
    if (_.isFunction(this.props.onChange)) this.props.onChange(this.props.attr, val.parsed);
  },
  _onBlur: function _onBlur() {
    var val, display;
    // add any 'required' errors on blur
    val = this.props.formatter(this.state.display, { required: this.props.required });
    // if valid, display it as formatted.
    // if not valid, display the user's invalid text
    // and add any formatter errors.
    if (val.valid) display = val.formatted;else display = this.state.display;
    this.setState({ display: display, formatErrors: val.errors });
    this.formatErrorsChange(val.errors);
    if (_.isFunction(this.props.onBlur)) this.props.onBlur();
  },
  formatErrorsChange: function formatErrorsChange(newErrors) {
    this.setState({ formatErrors: newErrors });
    // callback that the error state changed.
    // Send the new error state. Expects null, [] or ['message'].
    if (_.isFunction(this.props.onErrorChange)) this.props.onErrorChange(this.props.attr, newErrors);
  },
  fieldTouched: function fieldTouched() {
    this.setState({ userTouched: true });
    if (_.isFunction(this.props.onTouch)) this.props.onTouch(this.props.attr);
  },
  getDisplayErrors: function getDisplayErrors() {
    // this.state.formatErrors
    if (this.state.userTouched) return this.state.formatErrors;else return this.props.errors;
  },
  render: function render() {
    return React.createElement(ObsText, { label: this.props.label, hint: this.props.hint, required: this.props.required,
      id: this.props.id, value: this.state.display, placeholder: this.props.placeholder,
      errors: this.getDisplayErrors(), className: this.props.className,
      onChange: this._valueChanged, onBlur: this._onBlur });
  }
});

module.exports = ObsFormattedText;
;
//# sourceMappingURL=form.js.map