import React from 'react'
import cx    from 'classnames'
import _     from 'lodash'

import ObsText from './text'

const ObsFormattedText = React.createClass({
  propTypes: {
    object:       React.PropTypes.object.isRequired,
    attr:         React.PropTypes.string.isRequired,
    onChange:     React.PropTypes.func,
    formatter:    React.PropTypes.func.isRequired,
    onErrorChange:React.PropTypes.func,
    // field was "touched" by user. Requires a change.
    onTouch:      React.PropTypes.func,
    errors:       React.PropTypes.array,
    label:        React.PropTypes.string,
    hint:         React.PropTypes.string,
    required:     React.PropTypes.bool,
    placeholder:  React.PropTypes.string,
    className:    React.PropTypes.string,
    id:           React.PropTypes.string,
  },

  getDefaultProps() {
    return {
      required: false,
      errors:   []
    }
  },

  getInitialState() {
    return _.merge(this.processValue(_.get(this.props.object, this.props.attr)), {userTouched: false})
  },

  processValue(value) {
    var val
    val = this.props.formatter(value)
    return {
      value:        val.parsed,
      formatted:    val.formatted,
      display:      val.formatted,
      formatErrors: val.errors
    }
  },

  componentDidMount() {
    // re-assign the same errors, so it will fire the callback. Inform
    // parent/subscriber that there are initial state formatting errors. No
    // state actually changes.
    if (!_.isEmpty(this.state.formatErrors))
      this.formatErrorsChange(this.state.formatErrors)
  },

  componentWillReceiveProps(nextProps) {
    var rawFieldVal
    // if errors changed, reset the "userTouched" flag and not empty, display
    // them again. Clear state of modified-since-errors-given
    if (this.props.errors !== nextProps.errors)
      this.setState({userTouched: false})
    // respond to the value being changed outside the input. display the new
    // value if it has changed.
    rawFieldVal = _.get(this.props.object, this.props.attr)
    if (rawFieldVal !== this.state.value)
      this.setState(this.processValue(rawFieldVal))
  },

  _valueChanged(newVal) {
    var val
    val = this.props.formatter(newVal)
    this.setState({value: val.parsed, display: newVal})
    this.formatErrorsChange(null)
    this.fieldTouched()
    // only fire onChange if valid. Clear formatting errors
    if (_.isFunction(this.props.onChange))
      this.props.onChange(this.props.attr, val.parsed)
  },

  _onBlur() {
    var val, display
    // add any 'required' errors on blur
    val = this.props.formatter(this.state.display, {required: this.props.required})
    // if valid, display it as formatted.
    // if not valid, display the user's invalid text
    // and add any formatter errors.
    if (val.valid)
      display = val.formatted
    else
      display = this.state.display
    this.setState({display: display, formatErrors: val.errors})
    this.formatErrorsChange(val.errors)
    if (_.isFunction(this.props.onBlur))
      this.props.onBlur()
  },

  formatErrorsChange(newErrors) {
    this.setState({formatErrors: newErrors})
    // callback that the error state changed.
    // Send the new error state. Expects null, [] or ['message'].
    if (_.isFunction(this.props.onErrorChange))
      this.props.onErrorChange(this.props.attr, newErrors)
  },

  fieldTouched() {
    this.setState({userTouched: true})
    if (_.isFunction(this.props.onTouch))
      this.props.onTouch(this.props.attr)
  },

  getDisplayErrors() {
    // this.state.formatErrors
    if (this.state.userTouched)
      return this.state.formatErrors
    else
      return this.props.errors
  },

  render() {
    return (
      <ObsText label={this.props.label} hint={this.props.hint} required={this.props.required}
        id={this.props.id} value={this.state.display} placeholder={this.props.placeholder}
        errors={this.getDisplayErrors()} className={this.props.className}
        onChange={this._valueChanged} onBlur={this._onBlur} />
    )
  }
})

export default ObsFormattedText
