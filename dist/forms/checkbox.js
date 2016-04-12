'use strict';

var React = require('react');
var cx = require('classnames');
var _ = require('lodash');

var ObsError = require('./error');
var ObsRequiredMarker = require('./required-marker');
var ObsHint = require('./hint');

var ObsCheckbox = React.createClass({
  displayName: 'ObsCheckbox',

  propTypes: {
    value: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    label: React.PropTypes.string,
    hint: React.PropTypes.string,
    required: React.PropTypes.bool,
    className: React.PropTypes.string,
    id: React.PropTypes.string,
    errors: React.PropTypes.array // array of strings
  },

  getDefaultProps: function getDefaultProps() {
    return {
      required: false,
      errors: []
    };
  },
  getInitialState: function getInitialState() {
    return {
      checked: this.props.value
    };
  },
  _valueChanged: function _valueChanged(e) {
    this.setState({ checked: e.target.checked });
    if (_.isFunction(this.props.onChange)) this.props.onChange(e.target.checked);
    if (_.isFunction(this.props.onTouch)) this.props.onTouch();
  },
  render: function render() {
    var bootstrapClasses;
    bootstrapClasses = cx({
      "checkbox": true,
      "has-error": !_.isEmpty(this.props.errors)
    });

    return React.createElement(
      'div',
      { className: this.props.className },
      React.createElement(
        'div',
        { className: bootstrapClasses },
        React.createElement(
          'label',
          null,
          React.createElement('input', { type: 'checkbox', id: this.props.id, checked: this.state.checked, onChange: this._valueChanged }),
          this.props.label,
          React.createElement(ObsRequiredMarker, { required: this.props.required })
        ),
        React.createElement(ObsError, { errors: this.props.errors })
      ),
      React.createElement(ObsHint, { hint: this.props.hint })
    );
  }
});

module.exports = ObsCheckbox;
;
//# sourceMappingURL=checkbox.js.map