"use strict";

var React = require('react');

var ObsForm = React.createClass({
  displayName: "ObsForm",

  propTypes: {
    onSubmit: React.PropTypes.func,
    builder: React.PropTypes.object
  },

  onSubmit: function onSubmit(e) {
    e.stopPropagation();
    e.preventDefault();
    if (_.isObject(this.props.builder)) {
      this.props.builder.onSubmit(e);
    } else if (_.isFunction(this.props.onSubmit)) {
      this.props.onSubmit(e);
    }
  },
  render: function render() {
    return React.createElement(
      "form",
      { className: "form", onSubmit: this.onSubmit },
      React.createElement("input", { type: "submit", className: "hidden" }),
      this.props.children
    );
  }
});

module.exports = ObsForm;