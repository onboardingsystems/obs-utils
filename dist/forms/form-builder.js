'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');
var cx = require('classnames');
var ObsForm = require('./form');
var ObsLabel = require('./label');
var ObsError = require('./error');
var ObsTextarea = require('./textarea');
var ObsText = require('./text');
var ObsCheckbox = require('./checkbox');
var ObsCompoundLayout = require('./compound-layout');
var ObsAddressUs = require('./address-us');
var ObsName = require('./name');
var ObsRadioGroup = require('./radio-group');
var Formatters = require('../formatters/formatters');

// Expected errors format.
// errors: {
//   "person.name.first": ['Bad name']
//   "address.state": ['is required']
// }

var _getState = function _getState(parent, stateAttr) {
  return parent.state[stateAttr];
};

var _setState = function _setState(parent, stateAttr, newState) {
  parent.setState(_defineProperty({}, stateAttr, newState));
};

var FormBuilder = {

  // The FormBuilder does not maintain its own state.  Instead, you pass in a
  // reference (parent) that is maintaining state.  formDataAttr tells us where to
  // find the data in the parent's state.
  new: function _new(options) {
    // add default options for the formData, errorData, and parsedData attr's.
    options = _.merge({}, {
      formDataAttr: 'formData',
      errorDataAttr: 'errorData',
      parsedDataAttr: 'parsedData'
    }, options);
    // initialize data sources on parent
    if (_.isNil(_getState(options.parent, options.formDataAttr))) _setState(options.parent, options.formDataAttr, {});
    if (_.isNil(_getState(options.parent, options.errorDataAttr))) _setState(options.parent, options.errorDataAttr, {});
    if (_.isNil(_getState(options.parent, options.parsedDataAttr))) _setState(options.parent, options.parsedDataAttr, {});
    return {
      parent: options.parent,
      formDataAttr: options.formDataAttr,
      errorDataAttr: options.errorDataAttr,
      parsedDataAttr: options.parsedDataAttr,
      _onSubmit: options.onSubmit,
      onChange: options.onChange,
      onErrorChange: options.onErrorChange,
      onTouch: options.onTouch,
      inputs: [],

      data: function data() {
        return _getState(this.parent, this.formDataAttr);
      },
      parsed: function parsed() {
        return _getState(this.parent, this.parsedDataAttr);
      },
      errors: function errors() {
        return _getState(this.parent, this.errorDataAttr);
      },
      updateFormattedValue: function updateFormattedValue(attr, value) {
        var state = this.data();
        _.set(state, attr, value);
        _setState(this.parent, this.formDataAttr, state);
        if (_.isFunction(this.onChange)) this.onChange();
      },
      updateParsedValue: function updateParsedValue(attr, value) {
        var state = this.parsed();
        _.set(state, attr, value);
        _setState(this.parent, this.parsedDataAttr, state);
        if (_.isFunction(this.onChange)) this.onChange();
      },
      updateErrors: function updateErrors(attr, newErrors) {
        var storedErrors = this.errors();
        if (_.isEmpty(newErrors)) delete storedErrors[attr];else storedErrors[attr] = newErrors;
        _setState(this.parent, this.errorDataAttr, storedErrors);
        if (_.isFunction(this.onErrorChange)) this.onErrorChange();
      },
      isValid: function isValid() {
        // ask our components/inputs to report back their validation state -
        // usefull for inputs that have focus and that would not have reported
        // back validation
        return _.reduce(this.inputs, function (valid, input) {
          if (!_.isEmpty(input.runValidations())) return false;else return valid;
        }, true);
      },
      onSubmit: function onSubmit(e) {
        var valid = this.isValid();

        // fire our own onSubmit callback
        if (_.isFunction(this._onSubmit)) this._onSubmit(e, valid, this);
      },


      // alias Obs components to make using them easier
      form: ObsForm,
      compoundLayout: ObsCompoundLayout,
      label: ObsLabel,

      formattedTextarea: function formattedTextarea(label, attrName, formatterFun) {
        var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

        return React.createElement(ObsTextarea, {
          value: this._getValue(attrName), defaultValue: options.defaultValue,
          errors: this._getErrors(attrName),
          label: label, hint: options.hint, placeholder: options.placeholder,
          required: options.required, formatter: formatterFun,
          className: options.className, id: options.id,
          autoFocus: options.autoFocus,
          rows: options.rows,
          customValidator: options.customValidator,
          onChange: _.bind(this._onChange, this, attrName),
          onBlur: _.bind(this._onBlur, this, attrName),
          didMount: _.bind(this._register, this),
          willUnmount: _.bind(this._unregister, this) });
      },
      formattedField: function formattedField(label, attrName, formatterFun) {
        var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

        return React.createElement(ObsText, {
          value: this._getValue(attrName), defaultValue: options.defaultValue,
          errors: this._getErrors(attrName),
          label: label, hint: options.hint, placeholder: options.placeholder,
          type: options.type,
          required: options.required, formatter: formatterFun,
          className: options.className, id: options.id,
          autoFocus: options.autoFocus,
          customValidator: options.customValidator,
          onChange: _.bind(this._onChange, this, attrName),
          onBlur: _.bind(this._onBlur, this, attrName),
          didMount: _.bind(this._register, this),
          willUnmount: _.bind(this._unregister, this) });
      },
      checkboxField: function checkboxField(label, attrName) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        var options = this._mergeClasses(options, 'obs-checkbox');
        return React.createElement(ObsCheckbox, { label: label, hint: options.hint, required: options.required,
          value: this._getValue(attrName), defaultValue: options.defaultValue,
          errors: this._getErrors(attrName),
          className: options.className, id: options.id,
          onChange: _.bind(this._onChange, this, attrName),
          onBlur: _.bind(this._onBlur, this, attrName),
          didMount: _.bind(this._register, this), willUnmount: _.bind(this._unregister, this) });
      },
      radioGroup: function radioGroup(label, attrName, options) {
        var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

        var opts = this._mergeClasses(opts, 'obs-radio-group');
        return React.createElement(ObsRadioGroup, { label: label, hint: opts.hint, required: opts.required,
          value: this._getValue(attrName), defaultValue: opts.defaultValue,
          options: options, includeBlank: opts.includeBlank,
          errors: this._getErrors(attrName),
          className: opts.className, id: opts.id,
          onChange: _.bind(this._onChange, this, attrName),
          onBlur: _.bind(this._onBlur, this, attrName),
          didMount: _.bind(this._register, this), willUnmount: _.bind(this._unregister, this) });
      },
      textField: function textField(label, attrName) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        return this.formattedField(label, attrName, Formatters.stringFormatter, options);
      },
      numberField: function numberField(label, attrName) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        return this.formattedField(label, attrName, Formatters.numberFormatter, this._mergeClasses(options, 'obs-number'));
      },
      phoneField: function phoneField(label, attrName) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        return this.formattedField(label, attrName, Formatters.phoneFormatter, this._mergeClasses(options, 'obs-phone'));
      },
      emailField: function emailField(label, attrName) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        return this.formattedField(label, attrName, Formatters.emailFormatter, this._mergeClasses(options, 'obs-email'));
      },
      ssnField: function ssnField(label, attrName) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        return this.formattedField(label, attrName, Formatters.ssnFormatter, this._mergeClasses(options, 'obs-ssn'));
      },
      stateField: function stateField(label, attrName) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        return this.formattedField(label, attrName, Formatters.stateFormatter, this._mergeClasses(options, 'obs-state'));
      },
      zipcodeField: function zipcodeField(label, attrName) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        return this.formattedField(label, attrName, Formatters.zipcodeFormatter, this._mergeClasses(options, 'obs-zipcode'));
      },
      currencyField: function currencyField(label, attrName) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        return this.formattedField(label, attrName, Formatters.currencyFormatter, this._mergeClasses(options, 'obs-currency'));
      },
      dollarsField: function dollarsField(label, attrName) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        return this.formattedField(label, attrName, Formatters.dollarsFormatter, this._mergeClasses(options, 'obs-dollars'));
      },
      percentField: function percentField(label, attrName) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        return this.formattedField(label, attrName, Formatters.percentFormatter, this._mergeClasses(options, 'obs-percent'));
      },
      dateField: function dateField(label, attrName) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        // merge the requested format option in for the formatter
        var formatter = function formatter(value, opt) {
          return Formatters.dateFormatter(value, _.merge({}, opt, { format: options.format }));
        };
        return this.formattedField(label, attrName, formatter, this._mergeClasses(options, 'obs-date'));
      },
      timeField: function timeField(label, attrName) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        // merge the requested format option in for the formatter
        var formatter = function formatter(value, opt) {
          return Formatters.timeFormatter(value, _.merge({}, opt, { format: options.format }));
        };
        return this.formattedField(label, attrName, formatter, this._mergeClasses(options, 'obs-time'));
      },
      ordinalField: function ordinalField(label, attrName) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        return this.formattedField(label, attrName, Formatters.ordinalFormatter, this._mergeClasses(options, 'obs-ordinal'));
      },
      addressField: function addressField(label, attrName) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        return React.createElement(ObsAddressUs, {
          value: this._getValue(attrName), attr: attrName, errors: this.errors(),
          label: label, hint: options.hint,
          required: options.required,
          className: options.className,
          autoFocus: options.autoFocus,
          onChange: _.bind(this._onChange, this),
          onBlur: _.bind(this._onBlur, this),
          didMount: _.bind(this._register, this),
          willUnmount: _.bind(this._unregister, this) });
      },
      nameField: function nameField(label) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        return React.createElement(ObsName, {
          value: this.data(), errors: this.errors(),
          firstNameAttr: options.firstNameAttr,
          lastNameAttr: options.lastNameAttr,
          label: label, hint: options.hint,
          required: options.required,
          className: options.className,
          autoFocus: options.autoFocus,
          onChange: _.bind(this._onChange, this),
          onBlur: _.bind(this._onBlur, this),
          didMount: _.bind(this._register, this),
          willUnmount: _.bind(this._unregister, this) });
      },
      textarea: function textarea(label, attrName) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        return this.formattedTextarea(label, attrName, Formatters.stringFormatter, this._mergeClasses(options, 'obs-dollars'));
      },


      // private-like methods

      _mergeClasses: function _mergeClasses(options, classes) {
        options['className'] = cx(options['className'], classes);
        return options;
      },


      // Expect the attrName and the results of a formatter.  Always update the
      // formatted and parsed values eventhough the parsed value might be blank.
      // Ignore any errors that might be in the results however.
      _onChange: function _onChange(attrName, value) {
        if (_.isObject(value)) {
          if (value.hasOwnProperty("formatted")) this.updateFormattedValue(attrName, value.formatted);
          if (value.hasOwnProperty("parsed")) this.updateParsedValue(attrName, value.parsed);
        } else {
          this.updateFormattedValue(attrName, value);
        }
      },


      // Similar to _onChange above except it logs any errors received from the
      // formatter.
      _onBlur: function _onBlur(attrName, results) {
        // store the parsed and formatted values
        this.updateFormattedValue(attrName, results.formatted);
        this.updateParsedValue(attrName, results.parsed);

        // update the errors for this attribute
        this.updateErrors(attrName, results.errors);
      },
      _getErrors: function _getErrors(attrName) {
        return this.errors()[attrName];
      },
      _getValue: function _getValue(attrName) {
        return this.data()[attrName];
      },
      _register: function _register(input) {
        if (!_.includes(this.inputs, input)) this.inputs.push(input);
      },
      _unregister: function _unregister(input) {
        this.inputs = _.without(this.inputs, input);
      }
    };
  }
};

module.exports = FormBuilder;