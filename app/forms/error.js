const React = require('react')
const _     = require('lodash')

const ObsError = React.createClass({
  propTypes: {
    errors:   React.PropTypes.array
  },

  getDefaultProps() {
    return {
      errors: []
    }
  },

  getErrorText() {
    return this.props.errors.join(', ')
  },

  render() {
    if (_.isEmpty(this.props.errors))
      return <noscript />
    return <div className="error">{this.getErrorText()}</div>
  }
})

module.exports = ObsError
