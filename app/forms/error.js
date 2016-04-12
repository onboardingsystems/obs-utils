import React from 'react'
import _     from 'lodash'

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
    return <div className="error error">{this.getErrorText()}</div>
  }
})

export default ObsError
