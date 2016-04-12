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
;
//# sourceMappingURL=form-builder.js.map