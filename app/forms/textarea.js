const React    = require('react')
const ReactDOM = require('react-dom')
const cx       = require('classnames')
const _        = require('lodash')

const ObsLabel   = require('./label')
const ObsError   = require('./error')
const Formatters = require('../formatters/formatters')

const ObsTextarea = React.createClass({
  propTypes: {
    // value:            React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    value:            React.PropTypes.string,
    defaultValue:     React.PropTypes.string,
    errors:           React.PropTypes.array,
    formatter:        React.PropTypes.func,
    id:               React.PropTypes.string,
    className:        React.PropTypes.string,
    placeholder:      React.PropTypes.string,
    label:            React.PropTypes.string,
    hint:             React.PropTypes.string,
    required:         React.PropTypes.bool,
    rows:             React.PropTypes.number,
    customValidator:  React.PropTypes.func,
    onChange:         React.PropTypes.func,
    onBlur:           React.PropTypes.func,
    didMount:         React.PropTypes.func,
    willUnmount:      React.PropTypes.func
  },

  getDefaultProps() {
    return {
      value: "",
      defaultValue: "",
      required: false,
      errors:   [],
      id: _.uniqueId('text_'),
      formatter: Formatters.requiredFormatter,
      rows: 3
    }
  },

  componentDidMount() {
    if (_.isFunction(this.props.didMount))
      this.props.didMount(this)
  },

  componentWillUnmount() {
    if (_.isFunction(this.props.willUnmount))
      this.props.willUnmount(this)
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
      var formatResult, customErrors = []
      formatResult = this.format(this.props.value)
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
      this.props.onBlur(formatResult)
      return formatResult.errors
    }
  },

  // returns either the value passed in via props or the default value
  value() {
    if(_.isNil(this.props.value)) {
      return this.props.defaultValue
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
        <ObsLabel text={this.props.label} hint={this.props.hint} htmlFor={this.props.id} required={this.props.required} />
        <textarea id={this.props.id} className="form-control" rows={this.props.rows} value={this.value()}
          placeholder={this.props.placeholder}
          onChange={this.onChange} onBlur={this.onBlur} />
        <ObsError errors={this.props.errors} />
      </div>
    )
  }
})

module.exports = ObsTextarea
