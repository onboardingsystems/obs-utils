"use strict";

var React = require('react');

var ObsHint = React.createClass({
  displayName: "ObsHint",

  propTypes: {
    hint: React.PropTypes.string
  },

  render: function render() {
    if (!this.props.hint) return React.createElement("noscript", null);
    return React.createElement(
      "span",
      { className: "help-block" },
      this.props.hint
    );
  }
});

module.exports = ObsHint;