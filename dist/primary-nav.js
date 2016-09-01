"use strict";

var React = require('react');

var PrimaryNav = React.createClass({
  displayName: "PrimaryNav",

  propTypes: {
    profile: React.PropTypes.object.isRequired,
    selected: React.PropTypes.string.isRequired
  },

  renderApplications: function renderApplications() {
    if (this.props.selected == "applications") {
      return React.createElement(
        "a",
        { href: "/t/applications", className: "selected" },
        "Applications"
      );
    } else {
      return React.createElement(
        "a",
        { href: "/t/applications" },
        "Applications"
      );
    }
  },
  renderHouseholds: function renderHouseholds() {
    if (this.props.selected == "households") {
      return React.createElement(
        "a",
        { href: "/t/households", className: "selected" },
        "Households"
      );
    } else {
      return React.createElement(
        "a",
        { href: "/t/households" },
        "Households"
      );
    }
  },
  renderProperties: function renderProperties() {
    return React.createElement(
      "a",
      { href: "/c/properties" },
      "Properties"
    );
  },
  renderLibrary: function renderLibrary() {
    if (!this.props.profile.permissions.manage_client) {
      return React.createElement("script", null);
    }

    return React.createElement(
      "a",
      { href: "/t/library" },
      "Library"
    );
  },
  renderAdmin: function renderAdmin() {
    if (!this.props.profile.permissions.manage_client) {
      return React.createElement("script", null);
    }

    return React.createElement(
      "a",
      { href: "/c/client" },
      "Admin"
    );
  },
  renderBilling: function renderBilling() {
    if (!this.props.profile.permissions.manage_billing) {
      return React.createElement("script", null);
    }

    return React.createElement(
      "a",
      { href: "/t/billing#/" + this.props.profile.client.billing_id + "/plans" },
      "Billing"
    );
  },
  render: function render() {
    return React.createElement(
      "div",
      { id: "primary_nav" },
      this.renderApplications(),
      this.renderHouseholds(),
      this.renderProperties(),
      this.renderLibrary(),
      this.renderAdmin(),
      this.renderBilling()
    );
  }
});

module.exports = PrimaryNav;