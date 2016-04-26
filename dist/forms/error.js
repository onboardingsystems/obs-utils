'use strict';

var React = require('react');
var _ = require('lodash');

var ObsError = React.createClass({
  displayName: 'ObsError',

  propTypes: {
    errors: React.PropTypes.array
  },

  getDefaultProps: function getDefaultProps() {
    return {
      errors: []
    };
  },
  getErrorText: function getErrorText() {
    return this.props.errors.join(', ');
  },
  render: function render() {
    if (_.isEmpty(this.props.errors)) return React.createElement('noscript', null);
    return React.createElement(
      'div',
      { className: 'error' },
      this.getErrorText()
    );
  }
});

module.exports = ObsError;