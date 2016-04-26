'use strict';

var React = require('react');
var ObsRequiredMarker = require('./required-marker');
var ObsHint = require('./hint');

var ObsLabel = React.createClass({
  displayName: 'ObsLabel',

  propTypes: {
    text: React.PropTypes.string,
    hint: React.PropTypes.string,
    required: React.PropTypes.bool,
    htmlFor: React.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      required: false
    };
  },
  somethingToRender: function somethingToRender() {
    return !_.isEmpty(this.props.text) || !_.isEmpty(this.props.hint);
  },
  render: function render() {
    if (!this.somethingToRender()) return React.createElement('noscript', null);
    return React.createElement(
      'label',
      { className: 'control-label', htmlFor: this.props.htmlFor },
      this.props.text,
      React.createElement(ObsRequiredMarker, { required: this.props.required }),
      React.createElement(ObsHint, { hint: this.props.hint })
    );
  }
});

module.exports = ObsLabel;