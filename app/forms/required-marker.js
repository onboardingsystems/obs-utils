const React = require('react')

const ObsRequiredMarker = React.createClass({
  propTypes: {
    required: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      required: false
    }
  },

  render() {
    if (!this.props.required)
      return <noscript />
    return <span aria-hidden="true" className="required_marker" title="Required Field">*</span>
  }
})

_.set(window, 'OBSUtils.Forms.RequiredMarker', ObsRequiredMarker)
