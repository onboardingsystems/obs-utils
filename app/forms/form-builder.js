const React             = require('react')
const ReactDOM          = require('react-dom')
const _                 = require('lodash')
const cx                = require('classnames')
const ObsForm           = require('./form')
const ObsLabel          = require('./label')
const ObsError          = require('./error')
const ObsTextarea       = require('./textarea')
const ObsFormattedText  = require('./formatted-text')
const ObsCheckbox       = require('./checkbox')
const ObsCompoundLayout = require('./compound-layout')
const ObsAddressUs      = require('./address-us')
const Formatters        = require('../formatters/formatters')


// Expected errors format.
// errors: {
//   "person.name.first": ['Bad name']
//   "address.state": ['is required']
// }


const FormBuilder = {

  new(object, errors, options={}) {
    var data = {
      object,
      errors,
      onValueChange: options.onValueChange,
      onErrorChange: options.onErrorChange,
      onTouch:       options.onTouch,
      // return if the form builder form is valid
      isValid() { return_.isEmpty(this.errors) },
      // set the value for the attribute name.
      set(attrName, value) {
        _.set(this.object, attrName, value)
        if (_.isFunction(this.onValueChange))
          this.onValueChange(this.object)
      },
      // get the value for the attribute name.
      get(attrName) {
        return _.get(this.object, attrName)
      }
    }

    return _.extend({}, data, Components)
  }
}


const Components = {

  // alias Obs components to make using them easier
  form: ObsForm,
  compoundLayout: ObsCompoundLayout,
  label: ObsLabel,

  textareaField(label, attrName, options={}) {
    return (
      <ObsTextarea label={label} hint={options.hint} required={options.required}
        value={this.get(attrName)} rows={options.rows}
        className={options.className} id={options.id}
        onChange={_.bind(this._onChange, this, options, attrName)}
        placeholder={options.placeholder} errors={this._getErrors(attrName)} />
    )
  },

  formattedField(label, attrName, formatterFun, options={}) {
    return (
      <ObsFormattedText label={label} hint={options.hint} required={options.required}
        object={this.object} errors={this._getErrors(attrName)} attr={attrName} formatter={formatterFun}
        className={options.className} id={options.id}
        onChange={_.bind(this._onChange, this, options)}
        onTouch={_.bind(this._fieldTouched, this)}
        onErrorChange={_.bind(this._formatErrorChanged, this)}
        placeholder={options.placeholder} />
    )
  },

  checkboxField(label, attrName, options={}) {
    var options = this._mergeClasses(options, 'obs-checkbox')
    return (
      <ObsCheckbox label={label} hint={options.hint} required={options.required}
        value={!!this.get(attrName)} errors={this._getErrors(attrName)}
        className={options.className} id={options.id}
        onChange={_.bind(this._onChange, this, options, attrName)}
        onTouch={_.bind(this._fieldTouched, this, attrName)} />
    )
  },

  textField(label, attrName, options={}) {
    return this.formattedField(label, attrName, Formatters.stringFormatter, options)
  },

  phoneField(label, attrName, options={}) {
    return this.formattedField(label, attrName, Formatters.phoneFormatter, this._mergeClasses(options, 'obs-phone'))
  },

  ssnField(label, attrName, options={}) {
    return this.formattedField(label, attrName, Formatters.ssnFormatter, this._mergeClasses(options, 'obs-ssn'))
  },

  stateField(label, attrName, options={}) {
    return this.formattedField(label, attrName, Formatters.stateFormatter, this._mergeClasses(options, 'obs-state'))
  },

  zipcodeField(label, attrName, options={}) {
    return this.formattedField(label, attrName, Formatters.zipcodeFormatter, this._mergeClasses(options, 'obs-zipcode'))
  },

  currencyField(label, attrName, options={}) {
    return this.formattedField(label, attrName, Formatters.currencyFormatter, this._mergeClasses(options, 'obs-currency'))
  },

  dollarsField(label, attrName, options={}) {
    return this.formattedField(label, attrName, Formatters.dollarsFormatter, this._mergeClasses(options, 'obs-dollars'))
  },

  dateField(label, attrName, options={}) {
    // merge the requested format option in for the formatter
    var formatter = function(value, opt) {
      return Formatters.dateFormatter(value, _.merge({}, opt, {format: options.format}))
    }
    return this.formattedField(label, attrName, formatter, this._mergeClasses(options, 'obs-date'))
  },

  timeField(label, attrName, options={}) {
    // merge the requested format option in for the formatter
    var formatter = function(value, opt) {
      return Formatters.timeFormatter(value, _.merge({}, opt, {format: options.format}))
    }
    return this.formattedField(label, attrName, formatter, this._mergeClasses(options, 'obs-time'))
  },

  ordinalField(label, attrName, options={}) {
    return this.formattedField(label, attrName, Formatters.ordinalFormatter, this._mergeClasses(options, 'obs-ordinal'))
  },

  addressField(label, attrName, options={}) {
    return (
      <ObsAddressUs label={label} object={this.object} attr={attrName} errors={this.errors}
        required={options.required} hint={options.hint} className={options.className}
        onChange={_.bind(this._onChange, this, options)}
        onErrorChange={_.bind(this._formatErrorChanged, this)}
        onTouch={_.bind(this._fieldTouched, this)} />
    )
  },

  // private-like methods

  _mergeClasses(options, classes) {
    options['className'] = cx(options['className'], classes)
    return options
  },

  _onChange(options, attrName, value) {
    this.set(attrName, value)
    // if given an 'onChange' event in the options, fire it after setting the
    // value on the object. Pass the attrName after the value as it is
    // "optional". For complex inputs, it gives context to which part that
    // changed (like with an address).
    if (_.isFunction(options['onChange']))
      options['onChange'](value, attrName)
  },

  _formatErrorChanged(attrName, errors) {
    if (_.isEmpty(errors))
      delete this.errors[attrName]
    else
      this.errors[attrName] = errors
    if (_.isFunction(this.onErrorChange))
      this.onErrorChange()

  },

  _fieldTouched(attrName) {
    // remove any server errors from the list if the field was touched.
    delete this.errors[attrName]
    if (_.isFunction(this.onTouch))
      this.onTouch(attrName)
    if (_.isFunction(this.onErrorChange))
      this.onErrorChange()
  },

  _getErrors(attrName) {
    return this.errors[attrName]
  }
}

module.exports = FormBuilder
