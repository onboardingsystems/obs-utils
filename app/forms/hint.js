import React from 'react';
import PropTypes from 'prop-types';

class ObsHint extends React.Component {
  render() {
    if (!this.props.hint)
      return <noscript />
    return <span className="help-block">{this.props.hint}</span>
  }
}

ObsHint.propTypes = {
  hint: PropTypes.string
};

module.exports = ObsHint;
