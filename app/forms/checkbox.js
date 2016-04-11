import React from 'react'
import cx    from 'classnames'
import _     from 'lodash'

import ObsError          from './error'
import ObsRequiredMarker from './required-marker'
import ObsHint           from './hint'

const ObsCheckbox = React.createClass({
  propTypes: {
    value:        React.PropTypes.bool,
    onChange:     React.PropTypes.func,
    label:        React.PropTypes.string,
    hint:         React.PropTypes.string,
    required:     React.PropTypes.bool,
    className:    React.PropTypes.string,
    id:           React.PropTypes.string,
    errors:       React.PropTypes.array   // array of strings
  },

  getDefaultProps() {
    return {
      required: false,
      errors:   []
    }
  },

  getInitialState() {
    return {
      checked: this.props.value
    }
  },

  _valueChanged(e) {
    this.setState({checked: e.target.checked})
    if (_.isFunction(this.props.onChange))
      this.props.onChange(e.target.checked)
    if (_.isFunction(this.props.onTouch))
      this.props.onTouch()
  },

  render() {
    var bootstrapClasses
    bootstrapClasses = cx({
      "checkbox": true,
      "has-error":  !_.isEmpty(this.props.errors)
    })

    return (
      <div className={this.props.className}>
        <div className={bootstrapClasses}>
          <label>
            <input type="checkbox" id={this.props.id} checked={this.state.checked} onChange={this._valueChanged} />
            {this.props.label}
            <ObsRequiredMarker required={this.props.required} />
          </label>
          <ObsError errors={this.props.errors} />
        </div>
        <ObsHint hint={this.props.hint} />
      </div>
    )
  }
})

export default ObsCheckbox
