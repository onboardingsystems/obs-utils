import React from 'react';
import cx    from 'classnames';
import PropTypes from 'prop-types';

class ObsCompoundLayout extends React.Component {
  render() {
    var classes
    classes = cx({
      'compound-field': true,
      'form-group': true,
      'layout-full':   this.props.layout === 'full',
      'layout-inline': this.props.layout === 'inline',
      [ this.props.className ]: _.isString(this.props.className)
    })

    return (
      <div className={classes}>
        <div className="children">
          {this.props.children}
        </div>
      </div>
    )
  }
}

ObsCompoundLayout.propTypes = {
  // layouts: 'inline', 'full'
  layout:       PropTypes.string,
  className:    PropTypes.string
};

ObsCompoundLayout.defaultProps = {
  layout: 'inline'
}

module.exports = ObsCompoundLayout;
