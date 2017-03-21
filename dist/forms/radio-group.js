'use strict';

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = require('react');
var ReactDOM = require('react-dom');
var cx = require('classnames');
var _ = require('lodash');


var ObsLabel = require('./label');
var ObsError = require('./error');

var ObsRadioGroup = React.createClass({
  displayName: 'ObsRadioGroup',

  propTypes: {
    value: React.PropTypes.string,
    defaultValue: React.PropTypes.string,
    options: React.PropTypes.array,
    errors: React.PropTypes.array,
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    autoFocus: React.PropTypes.bool,
    label: React.PropTypes.string,
    hint: React.PropTypes.string,
    required: React.PropTypes.bool,
    customValidator: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    didMount: React.PropTypes.func,
    willUnmount: React.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      defaultValue: "",
      required: false,
      autoFocus: false,
      options: [],
      errors: []
    };
  },
  getInitialState: function getInitialState() {
    return {
      id: this.props.id || _.uniqueId('radio_group_')
    };
  },
  componentDidMount: function componentDidMount() {
    // register this component with the formBuilder to aid with form validation
    // before submission (so that fields with focus can still be validated
    // instead of having to wait for a blur even to validate)
    if (_.isFunction(this.props.didMount)) this.props.didMount(this);

    // nothing left to do if there isn't an onChange to call
    if (!_.isFunction(this.props.onChange)) return;

    // If props.value is nil (undefined or null), fall back to
    // props.defaultValue and submit the formatted and parsed defaultValue back
    // to the formBuilder so we can be rendered again with a valid value in our
    // props.
    //
    // A defaultValue that responds to _.isNil will result in an infinate loop.
    // So check that the defaultValue will not respond to isNil before
    // submitting a new value for props.value.
    if (_.isNil(this.props.value) && !_.isNil(this.props.defaultValue)) {
      var _formatAndValidate = this.formatAndValidate(this.props.defaultValue),
          valid = _formatAndValidate.valid,
          parsed = _formatAndValidate.parsed,
          formatted = _formatAndValidate.formatted;

      if (valid) {
        this.props.onChange({ formatted: formatted, parsed: parsed });
      }
    } else {
      var _formatAndValidate2 = this.formatAndValidate(this.props.value),
          valid = _formatAndValidate2.valid,
          formatted = _formatAndValidate2.formatted;

      if (valid) {
        this.props.onChange({ formatted: formatted });
      }
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    if (_.isFunction(this.props.willUnmount)) this.props.willUnmount(this);
  },
  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    var currentValue = (0, _jquery2.default)('#' + this.state.id + ' input:checked').val();

    if (newProps.value !== currentValue && _.isFunction(this.props.onChange)) {
      var result = this.formatAndValidate(newProps.value);
      if (result.valid) this.props.onChange(result.formatted);
    }
  },
  runValidations: function runValidations() {
    this.onBlur();
  },


  // have onChange also fire onBlur so it can clear errors.  Otherwise,
  // selecting a radio will not clear errors and when you try to click on
  // something below the input it will blur, clear the error, and shift the
  // layout making it difficult to click on the next input.
  onChange: function onChange(e) {
    if (_.isFunction(this.props.onBlur)) {
      this.props.onBlur(this.formatAndValidate(e.target.value));
    }
  },
  onBlur: function onBlur() {
    if (_.isFunction(this.props.onBlur)) {
      this.props.onBlur(this.formatAndValidate(this.props.value));
    }
  },
  formatAndValidate: function formatAndValidate(value) {
    var formatted,
        parsed,
        errors = [];

    // rewrite "blank" values as null
    if (_.isNil(value)) value = null;
    if (_.isEmpty(value)) value = null;

    // both formatted and parsed values are the same.  This is by design to
    // simplify things.  Otherwise, the value props would have to be able to
    // accept the formatted or parsed value as valid input.
    formatted = value;
    parsed = value;

    // check for required
    if (this.props.required && _.isNull(parsed)) {
      errors.push('is required');
    }

    // check for inclusion in the list of options, but only if there wasn't a
    // requirement error first
    if (_.isEmpty(errors)) {
      var allowedValues = _.map(this.props.options, "value");
      if (!_.includes(allowedValues, value)) {
        errors.push('invalid value');
        parsed = null;
      }
    }

    return {
      valid: errors.length === 0,
      parsed: parsed,
      formatted: formatted,
      errors: errors
    };
  },
  render: function render() {
    var _this = this;

    var groupClasses = cx(_defineProperty({
      "form-group": true,
      "has-error": !_.isEmpty(this.props.errors)
    }, this.props.className, _.isString(this.props.className)));

    var options = _.map(this.props.options, function (option, i) {
      // give the radio input an id of "id[value]".  So if the id was
      // "some_radio_group" and the value was "red" the resulting id will be
      // "some_radio_group[red]"
      var id = _this.state.id + '[' + option.value + ']';
      return React.createElement(
        'div',
        { className: 'radio', key: i },
        React.createElement(
          'label',
          { className: 'radio-label' },
          React.createElement('input', { type: 'radio', id: id, value: option.value, checked: option.value === _this.props.value, onChange: _this.onChange, onBlur: _this.onBlur, autoFocus: _this.props.autoFocus }),
          option.name
        )
      );
    });

    return React.createElement(
      'div',
      { className: groupClasses, id: this.state.id },
      React.createElement(ObsLabel, { className: 'radio-group-label', text: this.props.label, hint: this.props.hint, htmlFor: this.state.id, required: this.props.required }),
      options,
      React.createElement(ObsError, { errors: this.props.errors })
    );
  }
});

module.exports = ObsRadioGroup;