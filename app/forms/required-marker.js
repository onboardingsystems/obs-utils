import React from 'react';
import PropTypes from 'prop-types';

class ObsRequiredMarker extends React.Component {
  render() {
    if (!this.props.required)
      return <noscript />
    return <span aria-hidden="true" className="required_marker" title="Required Field">*</span>
  }
}

ObsRequiredMarker.propTypes = {
  required: PropTypes.bool
};

ObsRequiredMarker.defaultProps = {
  required: false
};

module.exports = ObsRequiredMarker;
