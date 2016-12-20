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
    defaultValue: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    label: React.PropTypes.string,
    hint: React.PropTypes.string,
    required: React.PropTypes.bool,
    className: React.PropTypes.string,
    id: React.PropTypes.string,
    errors: React.PropTypes.array, // array of strings
    didMount: React.PropTypes.func,
    willUnmount: React.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      defaultValue: false,
      required: false,
      errors: []
    };
  },
  getInitialState: function getInitialState() {
    return {
      checked: this.props.value
    };
  },
  componentDidMount: function componentDidMount() {
    // register this component with the formBuilder to aid with form validation
    // before submission (so that fields with focus can still be validated
    // instead of having to wait for a blur even to validate)
    if (_.isFunction(this.props.didMount)) this.props.didMount(this);

    // nothing left to do if there isn't an onChange to call
    if (!_.isFunction(this.props.onChange)) return;

    // If props.value isn't a boolean value, fall back to the defaultValue and
    // submit it back to the formBuilder so we can be rendered again with a
    // valid value in our props.
    //
    // A defaultValue that isn't a boolean will result in an infinate loop. So
    // check defaultValue before submitting a new value for props.value.
    if (!_.isBoolean(this.props.value) && _.isBoolean(this.props.defaultValue)) {
      this.props.onChange({
        formatted: this.props.defaultValue,
        parsed: this.props.defaultValue
      });
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    if (_.isFunction(this.props.willUnmount)) this.props.willUnmount(this);
  },
  _valueChanged: function _valueChanged(e) {
    var value = e.target.checked;
    this.setState({ checked: value });
    if (_.isFunction(this.props.onChange)) this.props.onChange(value);
    if (_.isFunction(this.props.onBlur)) this.props.onBlur({ valid: true, parsed: value, formatted: value, errors: [] });
  },
  runValidations: function runValidations() {},


  // having a value of null can be bad for our controlled inputs, even if for a
  // little while.  So since our defaultValue doesn't kick in right away we
  // still need something here to help prevent bad values from being rendered.
  value: function value() {
    if (_.isBoolean(this.props.value)) {
      return this.props.value;
    } else {
      return false;
    }
  },
  render: function render() {
    var bootstrapClasses = cx({
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
          React.createElement('input', { type: 'checkbox', id: this.props.id, checked: this.value(), onChange: this._valueChanged }),
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