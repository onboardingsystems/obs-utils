const React = require('react')
const cx    = require('classnames')
const _     = require('lodash')

const ObsLabel = require('./label')
const ObsError = require('./error')

const ObsTextarea = React.createClass({
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
    rows:         React.PropTypes.number,
    errors:       React.PropTypes.array,  // array of strings
    didMount:     React.PropTypes.func,
    willUnmount:   React.PropTypes.func
  },

  getDefaultProps() {
    return {
      required: false,
      rows:     3
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

  _valueChanged(e) {
    if (_.isFunction(this.props.onChange))
      this.props.onChange(e.target.value)
  },

  render() {
    var groupClasses
    groupClasses = cx({
      "form-group": true,
      "has-error":  !_.isEmpty(this.props.errors),
      [ this.props.className ]: this.props.className
    })

    return (
      <div className={groupClasses}>
        <ObsLabel text={this.props.label} hint={this.props.hint} required={this.props.required} />
        <textarea id={this.props.id} className="form-control" rows={this.props.rows} type="text" value={this.props.value}
          placeholder={this.props.placeholder}
          onChange={this._valueChanged} onBlur={this.props.onBlur} />
        <ObsError errors={this.props.errors} />
      </div>
    )
  }
})

module.exports = ObsTextarea
