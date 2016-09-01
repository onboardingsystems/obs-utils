"use strict";

var React = require('react');

var LoggedInAs = React.createClass({
  displayName: "LoggedInAs",

  propTypes: {
    profile: React.PropTypes.object.isRequired
  },

  render: function render() {
    if (this.props.profile.kind != "masquerade") {
      return React.createElement("script", null);
    }

    return React.createElement(
      "div",
      { id: "logged-in-as" },
      "You are logged in as ",
      React.createElement(
        "b",
        null,
        this.props.profile.client.name
      )
    );
  }
});

module.exports = LoggedInAs;