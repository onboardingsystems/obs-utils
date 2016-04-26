const React    = require('react')
const ReactDOM = require('react-dom')
const cx       = require('classnames')
const _        = require('lodash')


const ObsLabel   = require('./label')
const ObsError   = require('./error')
const Formatters = require('../formatters/formatters')

const ObsText = React.createClass({
  propTypes: {
    // value
    errors:           React.PropTypes.array,
    formatter:        React.PropTypes.func,
    id:               React.PropTypes.string,
    className:        React.PropTypes.string,
    placeholder:      React.PropTypes.string,
    label:            React.PropTypes.string,
    hint:             React.PropTypes.string,
    required:         React.PropTypes.bool,
    customValidator:  React.PropTypes.func,
    onChange:         React.PropTypes.func,
    onBlur:           React.PropTypes.func,
    didMount:         React.PropTypes.func,
    willUnmount:      React.PropTypes.func
  },

  getDefaultProps() {
    return {
      value: "",
      required: false,
      errors:   [],
      id: _.uniqueId('text_'),
      formatter: Formatters.requiredFormatter
    }
  },

  componentDidMount() {
    // register this component with the formBuilder
    if (_.isFunction(this.props.didMount))
      this.props.didMount(this)
    // attempt to perform the intial format (server values might not be
    // formatted)
    if (_.isFunction(this.props.onChange)) {
      var result = this.formatAndValidate(this.props.value)
      if (result.valid)
        this.props.onChange(result.formatted)
    }
  },

  componentWillUnmount() {
    if (_.isFunction(this.props.willUnmount))
      this.props.willUnmount(this)
  },

  componentWillReceiveProps(newProps) {
    var currentValue = ReactDOM.findDOMNode(this).getElementsByTagName("input")[0].value
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

  render() {
    var groupClasses = cx({
      "form-group": true,
      "has-error":  !_.isEmpty(this.props.errors),
      [ this.props.className ]: _.isString(this.props.className)
    })

    return (
      <div className={groupClasses}>
        <ObsLabel text={this.props.label} hint={this.props.hint} htmlFor={this.props.id} required={this.props.required} />
        <input id={this.props.id} className="form-control" type="text" value={this.props.value}
          placeholder={this.props.placeholder}
          onChange={this.onChange} onBlur={this.onBlur} />
        <ObsError errors={this.props.errors} />
      </div>
    )
  }
})

module.exports = ObsText
