const React = require('react');

var LoggedInAs = React.createClass({
  propTypes: {
    profile: React.PropTypes.object.isRequired
  },

  render() {
    if(this.props.profile.kind != "masquerade") { return(<script />) }

    return(
      <div id="logged-in-as">
        You are logged in as <b>{this.props.profile.client.name}</b>
      </div>
    );
  }
});

module.exports = LoggedInAs;
