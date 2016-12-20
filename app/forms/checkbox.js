const React = require('react')
const cx    = require('classnames')
const _     = require('lodash')

const ObsError          = require('./error')
const ObsRequiredMarker = require('./required-marker')
const ObsHint           = require('./hint')

const ObsCheckbox = React.createClass({
  propTypes: {
    value:        React.PropTypes.bool,
    defaultValue: React.PropTypes.bool,
    onChange:     React.PropTypes.func,
    onBlur:       React.PropTypes.func,
    label:        React.PropTypes.string,
    hint:         React.PropTypes.string,
    required:     React.PropTypes.bool,
    className:    React.PropTypes.string,
    id:           React.PropTypes.string,
    errors:       React.PropTypes.array,   // array of strings
    didMount:     React.PropTypes.func,
    willUnmount:  React.PropTypes.func
  },

  getDefaultProps() {
    return {
      required: false,
      defaultValue: false,
      errors:   []
    }
  },

  getInitialState() {
    let checked = this.props.defaultValue
    if (_.isBoolean(this.props.value)) {
      checked = this.props.value
    }
    return {checked}
  },

  componentDidMount() {
    if (_.isFunction(this.props.didMount))
      this.props.didMount(this)
  },

  componentWillUnmount() {
    if (_.isFunction(this.props.willUnmount))
      this.props.willUnmount(this)
  },

  _valueChanged(e) {
    var value = e.target.checked
    this.setState({checked: value})
    if (_.isFunction(this.props.onChange))
      this.props.onChange(value)
    if (_.isFunction(this.props.onBlur))
      this.props.onBlur({valid: true, parsed: value, formatted: value, errors: []})
  },

  // returns either the value passed in via props, or the default value.
  value() {

  },

  runValidations() {},

  render() {
    var bootstrapClasses = cx({
      "checkbox": true,
      "has-error":  !_.isEmpty(this.props.errors)
    });

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

module.exports = ObsCheckbox
