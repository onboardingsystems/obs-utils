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
  // reference (parent) that is maintaining state.  formStateAttr tells us where to
  // find the data in the parent's state.
  new(options) {
    return {
      parent: options.parent,
      formStateAttr: options.formStateAttr,
      errorStateAttr: options.errorStateAttr,
      onSubmit: options.onSubmit,
      onValueChange: options.onValueChange,
      onErrorChange: options.onErrorChange,
      onTouch:       options.onTouch,
      inputs: [],

      data() {
        return _getState(this.parent, this.formStateAttr)
      },

      errors() {
        return _getState(this.parent, this.errorStateAttr)
      },

      setData(data) {
        _setState(this.parent, this.formStateAttr, data)
        if (_.isFunction(this.onValueChange))
          this.onValueChange(data)
      },

      setErrors(errors) {
        _setState(this.parent, this.errorStateAttr, errors)
        if (_.isFunction(this.onErrorChange))
          this.onErrorChange()
      },

      // return if the form builder form is valid
      isValid() { return _.isEmpty(this.errors()) },

      // set the value for the attribute name.
      set(attrName, value) {
        var state = this.data()
        _.set(state, attrName, value)
        this.setData(state)
      },

      // get the value for the attribute name.
      get(attrName) {
        return _.get(this.data(), attrName)
      },

      onSubmit(e) {
        // ask our components/inputs to report back their validation state -
        // usefull for inputs that have focus and that would not have reported
        // back validation
        var valid = _.reduce(this.inputs, (valid, input)=> {
          if (!_.isEmpty(input.runValidations()))
            valid = false
        }, true)

        // fire our own onSubmit callback
        if (_.isFunction(this.onSubmit))
          this.onSubmit(e, valid, this)
      },

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
            placeholder={options.placeholder} errors={this._getErrors(attrName)}
            didMount={_.bind(this._register, this)} willUnmount={_.bind(this._unregister, this)} />
        )
      },

      formattedField(label, attrName, formatterFun, options={}) {
        return (
          <ObsText label={label} hint={options.hint} required={options.required}
            object={this.data()} errors={this._getErrors(attrName)} attr={attrName} formatter={formatterFun}
            className={options.className} id={options.id}
            onChange={_.bind(this._onChange, this, options)}
            onErrorChange={_.bind(this._formatErrorChanged, this)}
            placeholder={options.placeholder}
            didMount={_.bind(this._register, this)} willUnmount={_.bind(this._unregister, this)} />
        )
      },

      checkboxField(label, attrName, options={}) {
        var options = this._mergeClasses(options, 'obs-checkbox')
        return (
          <ObsCheckbox label={label} hint={options.hint} required={options.required}
            value={!!this.get(attrName)} errors={this._getErrors(attrName)}
            className={options.className} id={options.id}
            onChange={_.bind(this._onChange, this, options, attrName)}
            didMount={_.bind(this._register, this)} willUnmount={_.bind(this._unregister, this)} />
        )
      },

      textField(label, attrName, options={}) {
        return this.formattedField(label, attrName, Formatters.stringFormatter, options)
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
          <ObsAddressUs label={label} object={this.data()} attr={attrName} errors={this.errors()}
            required={options.required} hint={options.hint} className={options.className}
            onChange={_.bind(this._onChange, this, options)}
            onErrorChange={_.bind(this._formatErrorChanged, this)}
            didMount={_.bind(this._register, this)} willUnmount={_.bind(this._unregister, this)} />
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
        // either add or remove the errors stored for the attribute
        var storedErrors = this.errors()
        if (_.isEmpty(errors))
          delete storedErrors[attrName]
        else
          storedErrors[attrName] = errors
        this.setErrors(storedErrors)
      },

      _getErrors(attrName) {
        return this.errors()[attrName]
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
