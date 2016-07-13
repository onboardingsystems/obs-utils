import React from 'react';

var LoadingOverlay = React.createClass({
  propTypes: {
    show: React.PropTypes.bool.isRequired,
    width: React.PropTypes.string,
    height: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      width: 'md',
      height: 'short'
    };
  },

  blockClicks(e) {
    return e.preventDefault();
  },

  renderOverlay() {
    if(this.props.show) {
      return(
        <div className="active-overlay" onClick={this.blockClicks}>
          <div className={"overlay-text #{this.props.width} #{this.props.height}"}><i className="fa fa-cog fa-spin-x-slow"/></div>
        </div>
      );
    } else {
      return <noscript/>;
    }
  },

  render() {
    return(
      <div className="loading-overlay">
        {this.renderOverlay()}
        {this.props.children}
      </div>
    );
  }
});

module.exports = LoadingOverlay;