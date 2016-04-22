const React    = require('react')
const ReactDOM = require('react-dom')
const cx       = require('classnames')
const _        = require('lodash')

const ObsLabel   = require('./label')
const ObsError   = require('./error')
const Formatters = require('../formatters/formatters')

const ObsTextarea = React.createClass({
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
    this.onBlur()
  },

  onChange(e) {
    if (_.isFunction(this.props.onChange))
      this.props.onChange(e.target.value)
  },

  onBlur(e) {
    if (_.isFunction(this.props.onBlur)) {
      var inputValue, formatResult, customErrors = []
      inputValue = $(ReactDOM.findDOMNode(this)).find(':input').val()
      formatResult = this.format(inputValue)
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
        <textarea id={this.props.id} className="form-control" rows={this.props.rows} value={this.props.value}
          placeholder={this.props.placeholder}
          onChange={this.onChange} onBlur={this.onBlur} />
        <ObsError errors={this.props.errors} />
      </div>
    )
  }
})

module.exports = ObsTextarea
