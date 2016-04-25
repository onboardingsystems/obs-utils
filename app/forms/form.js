const React = require('react')

const ObsForm = React.createClass({
  propTypes: {
    onSubmit: React.PropTypes.func,
    builder: React.PropTypes.object
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
    return (
      <form className="form" onSubmit={this.onSubmit}>
        <input type="submit" className="hidden"/>
        {this.props.children}
      </form>
    )
  }
})

module.exports = ObsForm
