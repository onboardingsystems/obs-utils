'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = require('react');
var cx = require('classnames');

var ObsForm = React.createClass({
  displayName: 'ObsForm',

  propTypes: {
    onSubmit: React.PropTypes.func,
    builder: React.PropTypes.object,
    className: React.PropTypes.string
  },

  onSubmit: function onSubmit(e) {
    e.stopPropagation();
    e.preventDefault();
    if (_.isObject(this.props.builder)) {
      this.props.builder.onSubmit(e);
    } else if (_.isFunction(this.props.onSubmit)) {
      this.props.onSubmit(e);
    }
  },
  render: function render() {
    var classes;
    classes = cx(_defineProperty({
      'form': true
    }, this.props.className, _.isString(this.props.className)));

    return React.createElement(
      'form',
      { className: classes, onSubmit: this.onSubmit },
      React.createElement('input', { type: 'submit', className: 'hidden' }),
      this.props.children
    );
  }
});

module.exports = ObsForm;