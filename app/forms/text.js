const React = require('react')
const cx    = require('classnames')
const _     = require('lodash')

const ObsLabel = require('./label')
const ObsError = require('./error')

const ObsText = React.createClass({
  propTypes: {
    value:        React.PropTypes.string,
    onChange:     React.PropTypes.func,
    onBlur:       React.PropTypes.func,
    label:        React.PropTypes.string,
    hint:         React.PropTypes.string,
    required:     React.PropTypes.bool,
    placeholder:  React.PropTypes.string,
    className:    React.PropTypes.string,
    id:           React.PropTypes.string,
    errors:       React.PropTypes.array,   // array of strings
  },

  getDefaultProps() {
    return {
      required: false,
      errors:   []
    }
  },

  getInitialState() {
    return {
      linkingId: _.uniqueId('text_')
    }
  },

  _valueChanged(e) {
    if (_.isFunction(this.props.onChange))
      this.props.onChange(e.target.value)
  },

  render() {
    var groupClasses, usingId
    groupClasses = cx({
      "form-group": true,
      "has-error":  !_.isEmpty(this.props.errors),
      [ this.props.className ]: true
    })


    // determine the html ID used to link the label and the input If an explicit
    // ID is given, use that. Otherwise use a genrated one to reliably link them
    // together.
    if (!_.isEmpty(this.props.id))
      usingId = this.props.id
    else
      usingId = this.state.linkingId

    return (
      <div className={groupClasses}>
        <ObsLabel text={this.props.label} hint={this.props.hint} htmlFor={usingId}
          required={this.props.required} />
        <input id={usingId} className="form-control" type="text" value={this.props.value}
          placeholder={this.props.placeholder}
          onChange={this._valueChanged} onBlur={this.props.onBlur} />
        <ObsError errors={this.props.errors} />
      </div>
    )
  }

})

module.exports = ObsText
