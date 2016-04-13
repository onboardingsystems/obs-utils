const React             = require('react')
const _                 = require('lodash')

const ObsRequiredMarker = OBSUtils.Forms.RequiredMarker
const ObsHint           = OBSUtils.Forms.Hint

const ObsLabel = React.createClass({
  propTypes: {
    text:       React.PropTypes.string,
    hint:       React.PropTypes.string,
    required:   React.PropTypes.bool,
    htmlFor:    React.PropTypes.string
  },

  getDefaultProps() {
    return {
      required: false
    }
  },

  somethingToRender() {
    return !_.isEmpty(this.props.text) || !_.isEmpty(this.props.hint)
  },

  render() {
    if (!this.somethingToRender())
      return <noscript />
    return (
      <label className="control-label" htmlFor={this.props.htmlFor}>
        {this.props.text}
        <ObsRequiredMarker required={this.props.required} />
        <ObsHint hint={this.props.hint} />
      </label>
    )
  }

})

_.set(window, 'OBSUtils.Forms.Label', ObsLabel)
