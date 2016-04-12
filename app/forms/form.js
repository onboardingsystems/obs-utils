import React from 'react'

const ObsForm = React.createClass({
  propTypes: {
    onSubmit: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      onSubmit: this.blockManualSubmit
    }
  },

  blockManualSubmit(e) {
    e.preventDefault()
    // don't do anything here. prevent hitting "ENTER" from reloading the form.
  },

  render() {
    return (
      <form className="form" onSubmit={this.props.onSubmit}>
        {this.props.children}
      </form>
    )
  }
})

export default ObsForm
