const React = require('react')
const cx    = require('classnames')
const _     = require('lodash')

const ObsLabel   = require('./label')
const ObsError   = require('./error')
const Formatters = require('../formatters/formatters')

const ObsText = React.createClass({
  propTypes: {
    object:       React.PropTypes.object.isRequired,
    errors:       React.PropTypes.array,
    attr:         React.PropTypes.string.isRequired,
    formatter:    React.PropTypes.func,
    id:           React.PropTypes.string,
    className:    React.PropTypes.string,
    placeholder:  React.PropTypes.string,
    label:        React.PropTypes.string,
    hint:         React.PropTypes.string,
    required:     React.PropTypes.bool,
    onChange:     React.PropTypes.func,
    onBlur:       React.PropTypes.func,
    didMount:     React.PropTypes.func,
    willUnmount:   React.PropTypes.func
  },

  getDefaultProps() {
    return {
      required: false,
      errors:   [],
      id: _.uniqueId('text_'),
      formatter: Formatters.requiredFormatter
    }
  },

  getInitialState() {
    var result = this.props.formatter(this.value(), {required: this.props.required})
    return _.pick(result, ['parsed', 'formatted'])
  },

  componentDidMount() {
    if (_.isFunction(this.props.didMount))
      this.props.didMount(this)
  },

  componentWillUnmount() {
    if (_.isFunction(this.props.willUnmount))
      this.props.willUnmount(this)
  },

  componentWillReceiveProps(nextProps) {
    // if the props value changes out from under us (if the form is saved for
    // example and the server returns a new value), update our state with the
    // new value
    var nextValue = _.get(nextProps.object, nextProps.attr)
    if (nextValue !== this.state.parsed)
      var result = this.props.formatter(nextValue, {required: nextProps.required})
      this.setState(_.pick(result, ['parsed', 'formatted']))
  },

  value() {
    return _.get(this.props.object, this.props.attr)
  },

  runValidations() {
    // If valid, display the newly formatted value. Otherwise, continue to
    // display the value the user entered.
    var result = this.props.formatter(this.state.formatted, {required: this.props.required})
    if (result.valid)
      this.setState({formatted: result.formatted})
    this.updateFormatErrors(result.errors)
    return result.errors
  },

  // forward the new errors along to the form builder
  updateFormatErrors(newErrors) {
    if (_.isFunction(this.props.onErrorChange))
      this.props.onErrorChange(this.props.attr, newErrors)
  },

  onChange(e) {
    // parse the newValue using the formatter
    var newValue = e.target.value
    var {parsed: parsed} = this.props.formatter(newValue)
    // update the state with the new parsed value but display what the user
    // entered unmodified
    this.setState({parsed, formatted: newValue})
    // clear out any errors we might have
    this.updateFormatErrors(null)
    // finally, forward on the change event so we can update the form builder
    if (_.isFunction(this.props.onChange))
      this.props.onChange(this.props.attr, parsed)
  },

  onBlur() {
    this.runValidations()
    // forward the event
    if (_.isFunction(this.props.onBlur))
      this.props.onBlur()
  },

  render() {
    var groupClasses = cx({
      "form-group": true,
      "has-error":  !_.isEmpty(this.props.errors),
      [ this.props.className ]: true
    })

    return (
      <div className={groupClasses}>
        <ObsLabel text={this.props.label} hint={this.props.hint} htmlFor={this.props.id}
          required={this.props.required} />
        <input id={this.props.id} className="form-control" type="text" value={this.state.formatted}
          placeholder={this.props.placeholder}
          onChange={this.onChange} onBlur={this.onBlur} />
        <ObsError errors={this.props.errors} />
      </div>
    )
  }
})

module.exports = ObsText
