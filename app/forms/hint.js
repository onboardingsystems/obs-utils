const React = require('react')

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

_.set(window, 'OBSUtils.Forms.Hint', ObsHint)
