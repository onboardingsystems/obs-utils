const React = require('react')
const cx    = require('classnames')

const ObsCompoundLayout = React.createClass({
  propTypes: {
    // layouts: 'inline', 'full'
    layout:       React.PropTypes.string,
    className:    React.PropTypes.string
  },

  getDefaultProps() {
    return {
      layout: 'inline'
    }
  },

  render() {
    var classes
    classes = cx({
      'compound-field': true,
      'form-group': true,
      'layout-full':   this.props.layout === 'full',
      'layout-inline': this.props.layout === 'inline',
      [ this.props.className ]: true
    })

    return (
      <div className={classes}>
        <div className="children">
          {this.props.children}
        </div>
      </div>
    )
  }
})

_.set(window, 'OBSUtils.Forms.CompoundLayout', ObsCompoundLayout)
