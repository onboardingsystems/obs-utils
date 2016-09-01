const React = require('react');

var PrimaryNav = React.createClass({
  propTypes: {
    profile: React.PropTypes.object.isRequired,
    selected: React.PropTypes.string.isRequired
  },

  renderApplications() {
    if(this.props.selected == "applications") {
      return(<a href="/t/applications" className="selected">Applications</a>);
    } else {
      return(<a href="/t/applications">Applications</a>);
    }
  },

  renderHouseholds() {
    if(this.props.selected == "households") {
      return(<a href="/t/households" className="selected">Households</a>);
    } else {
      return(<a href="/t/households">Households</a>);
    }
  },

  renderProperties() {
    return(<a href="/c/properties">Properties</a>);
  },

  renderLibrary() {
    if(!this.props.profile.permissions.manage_client) { return <script />; }

    return(<a href="/t/library">Library</a>);
  },

  renderAdmin() {
    if(!this.props.profile.permissions.manage_client) { return <script />; }

    return(<a href="/c/client">Admin</a>);
  },

  renderBilling() {
    if(!this.props.profile.permissions.manage_billing) { return <script />; }

    return(<a href={"/t/billing#/" + this.props.profile.client.billing_id + "/plans"}>Billing</a>);
  },

  render() {
    return(
      <div id="primary_nav">
        {this.renderApplications()}
        {this.renderHouseholds()}
        {this.renderProperties()}
        {this.renderLibrary()}
        {this.renderAdmin()}
        {this.renderBilling()}
      </div>
    );
  }
});

module.exports = PrimaryNav;
