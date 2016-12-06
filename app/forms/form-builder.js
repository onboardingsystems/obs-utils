const React             = require('react')
const ReactDOM          = require('react-dom')
const _                 = require('lodash')
const cx                = require('classnames')
const ObsForm           = require('./form')
const ObsLabel          = require('./label')
const ObsError          = require('./error')
const ObsTextarea       = require('./textarea')
const ObsText           = require('./text')
const ObsCheckbox       = require('./checkbox')
const ObsCompoundLayout = require('./compound-layout')
const ObsAddressUs      = require('./address-us')
const ObsName           = require('./name')
const Formatters        = require('../formatters/formatters')


// Expected errors format.
// errors: {
//   "person.name.first": ['Bad name']
//   "address.state": ['is required']
// }

var _getState = function(parent, stateAttr) {
  return parent.state[stateAttr]
}

var _setState = function(parent, stateAttr, newState) {
  parent.setState({
    [ stateAttr ]: newState
  })
}

const FormBuilder = {

  // The FormBuilder does not maintain its own state.  Instead, you pass in a
  // reference (parent) that is maintaining state.  formDataAttr tells us where to
  // find the data in the parent's state.
  new(options) {
    // add default options for the formData, errorData, and parsedData attr's.
    options = _.merge({}, {
      formDataAttr: 'formData',
      errorDataAttr: 'errorData',
      parsedDataAttr: 'parsedData'
    }, options)
    // initialize data sources on parent
    if (_.isNil(_getState(options.parent, options.formDataAttr)))
      _setState(options.parent, options.formDataAttr, {})
    if (_.isNil(_getState(options.parent, options.errorDataAttr)))
      _setState(options.parent, options.errorDataAttr, {})
    if (_.isNil(_getState(options.parent, options.parsedDataAttr)))
      _setState(options.parent, options.parsedDataAttr, {})
    return {
      parent: options.parent,
      formDataAttr: options.formDataAttr,
      errorDataAttr: options.errorDataAttr,
      parsedDataAttr: options.parsedDataAttr,
      _onSubmit: options.onSubmit,
      onChange: options.onChange,
      onErrorChange: options.onErrorChange,
      onTouch:       options.onTouch,
      inputs: [],

      data() {
        return _getState(this.parent, this.formDataAttr)
      },

      parsed() {
        return _getState(this.parent, this.parsedDataAttr)
      },

      errors() {
        return _getState(this.parent, this.errorDataAttr)
      },

      updateFormattedValue(attr, value) {
        var state = this.data()
        _.set(state, attr, value)
        _setState(this.parent, this.formDataAttr, state)
        if (_.isFunction(this.onChange))
          this.onChange()
      },

      updateParsedValue(attr, value) {
        var state = this.parsed()
        _.set(state, attr, value)
        _setState(this.parent, this.parsedDataAttr, state)
        if (_.isFunction(this.onChange))
          this.onChange()
      },

      updateErrors(attr, newErrors) {
        var storedErrors = this.errors()
        if (_.isEmpty(newErrors))
          delete storedErrors[attr]
        else
          storedErrors[attr] = newErrors
        _setState(this.parent, this.errorDataAttr, storedErrors)
        if (_.isFunction(this.onErrorChange))
          this.onErrorChange()
      },

      isValid() {
        // ask our components/inputs to report back their validation state -
        // usefull for inputs that have focus and that would not have reported
        // back validation
        return _.reduce(this.inputs, (valid, input)=> {
          if (!_.isEmpty(input.runValidations()))
            return false
          else
            return valid
        }, true);
      },

      onSubmit(e) {
        var valid = this.isValid();

        // fire our own onSubmit callback
        if (_.isFunction(this._onSubmit))
          this._onSubmit(e, valid, this)
      },

      // alias Obs components to make using them easier
      form: ObsForm,
      compoundLayout: ObsCompoundLayout,
      label: ObsLabel,

      formattedTextarea(label, attrName, formatterFun, options={}) {
        return (
          <ObsTextarea
            value={this._getValue(attrName)} errors={this._getErrors(attrName)}
            label={label} hint={options.hint} placeholder={options.placeholder}
            required={options.required} formatter={formatterFun}
            className={options.className} id={options.id}
            rows={options.rows}
            customValidator={options.customValidator}
            onChange={_.bind(this._onChange, this, attrName)}
            onBlur={_.bind(this._onBlur, this, attrName)}
            didMount={_.bind(this._register, this)}
            willUnmount={_.bind(this._unregister, this)} />
        )
      },

      formattedField(label, attrName, formatterFun, options={}) {
        return (
          <ObsText
            value={this._getValue(attrName)} errors={this._getErrors(attrName)}
            label={label} hint={options.hint} placeholder={options.placeholder}
            type={options.type}
            required={options.required} formatter={formatterFun}
            className={options.className} id={options.id}
            customValidator={options.customValidator}
            onChange={_.bind(this._onChange, this, attrName)}
            onBlur={_.bind(this._onBlur, this, attrName)}
            didMount={_.bind(this._register, this)}
            willUnmount={_.bind(this._unregister, this)} />
        )
      },

      checkboxField(label, attrName, options={}) {
        var options = this._mergeClasses(options, 'obs-checkbox')
        var value = !!this._getValue(attrName)
        return (
          <ObsCheckbox label={label} hint={options.hint} required={options.required}
            value={value} errors={this._getErrors(attrName)}
            className={options.className} id={options.id}
            onChange={_.bind(this._onChange, this, attrName)}
            onBlur={_.bind(this._onBlur, this, attrName)}
            didMount={_.bind(this._register, this)} willUnmount={_.bind(this._unregister, this)} />
        )
      },

      textField(label, attrName, options={}) {
        return this.formattedField(label, attrName, Formatters.stringFormatter, options)
      },

      numberField(label, attrName, options={}) {
        return this.formattedField(label, attrName, Formatters.numberFormatter, this._mergeClasses(options, 'obs-number'))
      },

      phoneField(label, attrName, options={}) {
        return this.formattedField(label, attrName, Formatters.phoneFormatter, this._mergeClasses(options, 'obs-phone'))
      },

      emailField(label, attrName, options={}) {
        return this.formattedField(label, attrName, Formatters.emailFormatter, this._mergeClasses(options, 'obs-email'))
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
          <ObsAddressUs
            value={this._getValue(attrName)} attr={attrName} errors={this.errors()}
            label={label} hint={options.hint}
            required={options.required}
            className={options.className}
            onChange={_.bind(this._onChange, this)}
            onBlur={_.bind(this._onBlur, this)}
            didMount={_.bind(this._register, this)}
            willUnmount={_.bind(this._unregister, this)} />
        )
      },

      nameField(label, options={}) {
        return (
          <ObsName
            value={this.data()} errors={this.errors()}
            firstNameAttr={options.firstNameAttr}
            lastNameAttr={options.lastNameAttr}
            label={label} hint={options.hint}
            required={options.required}
            className={options.className}
            onChange={_.bind(this._onChange, this)}
            onBlur={_.bind(this._onBlur, this)}
            didMount={_.bind(this._register, this)}
            willUnmount={_.bind(this._unregister, this)} />
        )
      },

      textarea(label, attrName, options={}) {
        return this.formattedTextarea(label, attrName, Formatters.stringFormatter, this._mergeClasses(options, 'obs-dollars'))
      },

      // private-like methods

      _mergeClasses(options, classes) {
        options['className'] = cx(options['className'], classes)
        return options
      },

      // Expect the attrName and the results of a formatter.  Always update the
      // formatted and parsed values eventhough the parsed value might be blank.
      // Ignore any errors that might be in the results however.
      _onChange(attrName, value) {
        // store the formatted and parsed values
        this.updateFormattedValue(attrName, value)

        // TODO: remove any errors we already have
      },

      // Similar to _onChange above except it logs any errors received from the
      // formatter.
      _onBlur(attrName, results) {
        // store the parsed and formatted values
        this.updateFormattedValue(attrName, results.formatted)
        this.updateParsedValue(attrName, results.parsed)

        // update the errors for this attribute
        this.updateErrors(attrName, results.errors)
      },

      _getErrors(attrName) {
        return this.errors()[attrName]
      },

      _getValue(attrName) {
        return this.data()[attrName]
      },

      _register(input) {
        if (!_.includes(this.inputs, input))
          this.inputs.push(input)
      },

      _unregister(input) {
        this.inputs = _.without(this.inputs, input)
      }
    }
  }
}

module.exports = FormBuilder
