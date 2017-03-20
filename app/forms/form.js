const React = require('react');
const cx    = require('classnames');

const ObsForm = React.createClass({
  propTypes: {
    onSubmit:   React.PropTypes.func,
    builder:    React.PropTypes.object,
    className:  React.PropTypes.string
  },

  onSubmit(e) {
    e.stopPropagation()
    e.preventDefault()
    if (_.isObject(this.props.builder)) {
      this.props.builder.onSubmit(e)
    } else if (_.isFunction(this.props.onSubmit)) {
      this.props.onSubmit(e)
    }
  },

  render() {
    var classes
    classes = cx({
      'form': true,
      [ this.props.className ]: _.isString(this.props.className)
    })

    return (
      <form className={classes} onSubmit={this.onSubmit}>
        <input type="submit" style={{display: 'none'}}/>
        {this.props.children}
      </form>
    )
  }
})

module.exports = ObsForm
