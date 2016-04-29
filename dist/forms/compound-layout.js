'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = require('react');
var cx = require('classnames');

var ObsCompoundLayout = React.createClass({
  displayName: 'ObsCompoundLayout',

  propTypes: {
    // layouts: 'inline', 'full'
    layout: React.PropTypes.string,
    className: React.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      layout: 'inline'
    };
  },
  render: function render() {
    var classes;
    classes = cx(_defineProperty({
      'compound-field': true,
      'form-group': true,
      'layout-full': this.props.layout === 'full',
      'layout-inline': this.props.layout === 'inline'
    }, this.props.className, _.isString(this.props.className)));

    return React.createElement(
      'div',
      { className: classes },
      React.createElement(
        'div',
        { className: 'children' },
        this.props.children
      )
    );
  }
});

module.exports = ObsCompoundLayout;