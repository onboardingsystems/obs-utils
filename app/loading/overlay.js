import React from 'react';
import PropTypes from 'prop-types';

class LoadingOverlay extends React.Component {
  constructor(props) {
    super(props);

    this.blockClicks = this.blockClicks.bind(this);
    this.renderOverlay = this.renderOverlay.bind(this);
  }

  blockClicks(e) {
    return e.preventDefault();
  }

  renderOverlay() {
    if(this.props.show) {
      return(
        <div className="active-overlay" onClick={this.blockClicks}>
          <div className={"overlay-text " + this.props.width + " " + this.props.height}><i className="fa fa-cog fa-spin-x-slow"/></div>
        </div>
      );
    } else {
      return <noscript/>;
    }
  }

  render() {
    return(
      <div className="loading-overlay">
        {this.renderOverlay()}
        {this.props.children}
      </div>
    );
  }
}

LoadingOverlay.propTypes = {
  show: PropTypes.bool.isRequired,
  width: PropTypes.string,
  height: PropTypes.string
}

LoadingOverlay.defaultProps = {
  width: 'md',
  height: 'short'
}


module.exports = LoadingOverlay;