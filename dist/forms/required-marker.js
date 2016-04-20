"use strict";

var React = require('react');

var ObsRequiredMarker = React.createClass({
  displayName: "ObsRequiredMarker",

  propTypes: {
    required: React.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      required: false
    };
  },
  render: function render() {
    if (!this.props.required) return React.createElement("noscript", null);
    return React.createElement(
      "span",
      { "aria-hidden": "true", className: "required_marker", title: "Required Field" },
      "*"
    );
  }
});

module.exports = ObsRequiredMarker;