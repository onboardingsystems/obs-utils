import React from 'react'

const ObsHint = React.createClass({
  propTypes: {
    hint: React.PropTypes.string
  },

  render() {
    if (!this.props.hint)
      return <noscript />
    return <span className="help-block">{this.props.hint}</span>
  }
})

export default ObsHint
