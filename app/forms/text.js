const React    = require('react')
const ReactDOM = require('react-dom')
const cx       = require('classnames')
const _        = require('lodash')


const ObsLabel   = require('./label')
const ObsError   = require('./error')
const Formatters = require('../formatters/formatters')

const ObsText = React.createClass({
  propTypes: {
    value:            React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    defaultValue:     React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    errors:           React.PropTypes.array,
    formatter:        React.PropTypes.func,
    id:               React.PropTypes.string,
    className:        React.PropTypes.string,
    autoFocus:        React.PropTypes.bool,
    placeholder:      React.PropTypes.string,
    label:            React.PropTypes.string,
    hint:             React.PropTypes.string,
    required:         React.PropTypes.bool,
    type:             React.PropTypes.string,
    customValidator:  React.PropTypes.func,
    onChange:         React.PropTypes.func,
    onBlur:           React.PropTypes.func,
    didMount:         React.PropTypes.func,
    willUnmount:      React.PropTypes.func
  },

  getDefaultProps() {
    return {
      defaultValue: "",
      required: false,
      autoFocus: false,
      type: "text",
      errors:   [],
      formatter: Formatters.requiredFormatter
    }
  },

  getInitialState() {
    return {
      id: this.props.id || _.uniqueId('text_'),
    }
  },

  componentDidMount() {
    // register this component with the formBuilder to aid with form validation
    // before submission (so that fields with focus can still be validated
    // instead of having to wait for a blur even to validate)
    if (_.isFunction(this.props.didMount))
      this.props.didMount(this)

    // nothing left to do if there isn't an onChange to call
    if (!_.isFunction(this.props.onChange))
      return

    // If props.value is nil (undefined or null), fall back to
    // props.defaultValue and submit the formatted and parsed defaultValue back
    // to the formBuilder so we can be rendered again with a valid value in our
    // props.
    //
    // A defaultValue that responds to _.isNil will result in an infinate loop.
    // So check that the defaultValue will not respond to isNil before
    // submitting a new value for props.value.
    if (_.isNil(this.props.value) && !_.isNil(this.props.defaultValue)) {
      var {valid: valid, parsed: parsed, formatted: formatted} = this.formatAndValidate(this.props.defaultValue)
      if(valid) {
        this.props.onChange({formatted, parsed})
      }
    } else {
      var {valid: valid, formatted: formatted} = this.formatAndValidate(this.props.value)
      if(valid) {
        this.props.onChange({formatted})
      }
    }
  },

  componentWillUnmount() {
    if (_.isFunction(this.props.willUnmount))
      this.props.willUnmount(this)
  },

  componentWillReceiveProps(newProps) {
    var currentValue = document.getElementById(this.state.id).value
    if (newProps.value !== currentValue && _.isFunction(this.props.onChange)) {
      var result = this.formatAndValidate(newProps.value)
      if (result.valid)
        this.props.onChange(result.formatted)
    }
  },

  format(value) {
    return this.props.formatter(value, {required: this.props.required})
  },

  runValidations() {
    return this.onBlur()
  },

  onChange(e) {
    if (_.isFunction(this.props.onChange))
      this.props.onChange(e.target.value)
  },

  onBlur(e) {
    if (_.isFunction(this.props.onBlur)) {
      var result = this.formatAndValidate(this.props.value)
      this.props.onBlur(result)
      return result.errors
    }
  },

  formatAndValidate(value) {
    var formatResult, customErrors = []
    formatResult = this.format(value)
    // run the customValidator if there is one.  Modify the formatResults if
    // there are errors.
    if (_.isFunction(this.props.customValidator)) {
      customErrors = this.props.customValidator(formatResult.formatted)
      if (!_.isEmpty(customErrors)) {
        formatResult.valid = false
        formatResult.parsed = null
        formatResult.errors = _.concat(formatResult.errors, customErrors)
      }
    }
    return formatResult
  },

  // having a value of null can be bad for our controlled inputs, even if for a
  // little while.  So since our defaultValue doesn't kick in right away we
  // still need something here to help prevent bad values from being rendered.
  value() {
    if (_.isNil(this.props.value)) {
      return ""
    } else {
      return this.props.value
    }
  },

  render() {
    var groupClasses = cx({
      "form-group": true,
      "has-error":  !_.isEmpty(this.props.errors),
      [ this.props.className ]: _.isString(this.props.className)
    })

    return (
      <div className={groupClasses}>
        <ObsLabel text={this.props.label} hint={this.props.hint} htmlFor={this.state.id} required={this.props.required} />
        <input id={this.state.id} className="form-control" type={this.props.type} value={this.value()}
          placeholder={this.props.placeholder}
          onChange={this.onChange} onBlur={this.onBlur}
          autoFocus={this.props.autoFocus} />
        <ObsError errors={this.props.errors} />
      </div>
    )
  }
})

module.exports = ObsText
