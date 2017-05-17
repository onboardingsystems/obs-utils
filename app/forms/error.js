import React from 'react';
import _     from 'lodash';
import PropTypes from 'prop-types';

class ObsError extends React.Component {
  constructor(props) {
    super(props);

    this.getErrorText = this.getErrorText.bind(this);
  }

  getErrorText() {
    return this.props.errors.join(', ')
  }

  render() {
    if (_.isEmpty(this.props.errors))
      return <noscript />
    return <div className="error">{this.getErrorText()}</div>
  }
}

ObsError.propTypes = {
  errors: PropTypes.array
}

ObsError.defaultProps = {
  errors: []
}


module.exports = ObsError;
