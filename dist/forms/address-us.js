'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = require('react');
var cx = require('classnames');
var _ = require('lodash');

var Formatters = require('../formatters/formatters');

var ObsCompoundLayout = require('./compound-layout');
var ObsFormattedText = require('./formatted-text');
var ObsLabel = require('./label');
var ObsHint = require('./hint');
var ObsError = require('./error');

var ObsAddressUs = React.createClass({
  displayName: 'ObsAddressUs',

  propTypes: {
    object: React.PropTypes.object.isRequired,
    attr: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    onErrorChange: React.PropTypes.func,
    // field was "touched" by user. Requires a change.
    onTouch: React.PropTypes.func,
    // errors are an object here (covers multiple fields)
    errors: React.PropTypes.object,
    label: React.PropTypes.string,
    hint: React.PropTypes.string,
    required: React.PropTypes.bool,
    className: React.PropTypes.string
  },

  fields: {
    street_1: { name: 'Address', attr: 'street_1' },
    city: { name: 'City', attr: 'city' },
    state: { name: 'State', attr: 'state' },
    zip: { name: 'Zip', attr: 'zip' }
  },

  getDefaultProps: function getDefaultProps() {
    return {
      label: "Address"
    };
  },
  getInitialState: function getInitialState() {
    return {
      addressId: _.uniqueId('address1_'),
      errors: this._addressErrors(this.props.errors)
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.setState({ errors: this._addressErrors(nextProps.errors) });
  },
  _address_attrs: function _address_attrs() {
    var _this = this;

    var list = [];
    _.forOwn(this.fields, function (field, value) {
      list.push(_this._fullAttrName(value.attr));
    });
    return list;
  },
  _addressErrors: function _addressErrors(errors) {
    var _this2 = this;

    var fullAttrErrors,
        result = {};
    // turn fully-qualified errors structure into one that
    // is only relevant for this context for the defined fields.
    // {
    //   "person.address.state": ["is required"]
    // }
    //
    // Convert to format:
    //
    // {
    //   "state": ["is required"]
    // }
    fullAttrErrors = _.pick(errors, this._address_attrs());
    // loop through all the defined fields and look for any fully qualified
    // errors for it. If found, add then to the result object with the local
    // attr path.
    _.forOwn(this.fields, function (value, field) {
      var errors;
      errors = fullAttrErrors[_this2._fullAttrName(value.attr)];
      if (!_.isEmpty(errors)) result[value.attr] = errors;
    });
    return result;
  },
  _getErrors: function _getErrors(attr) {
    return this.state.errors[attr];
  },
  _anyChildErrors: function _anyChildErrors() {
    return !_.isEmpty(this.state.errors);
  },
  _fullAttrName: function _fullAttrName(attr) {
    return this.props.attr + '.' + attr;
  },
  _errorsText: function _errorsText() {
    var _this3 = this;

    var list = [];
    _.forEach(this.state.errors, function (errors, field) {
      _.forEach(errors, function (error) {
        list.push(_this3.fields[field].name + ' ' + error);
      });
    });
    return list;
  },
  _valueChanged: function _valueChanged(attr, newVal) {
    // Fire onChange event for the full attribute name and the updated value.
    if (_.isFunction(this.props.onChange)) this.props.onChange(this._fullAttrName(attr), newVal);
  },
  _fieldTouched: function _fieldTouched(attr) {
    if (_.isFunction(this.props.onTouch)) this.props.onTouch(this._fullAttrName(attr));
  },
  _errorsChanged: function _errorsChanged(attr, errors) {
    var newErrors;
    // update the errors state. start with existing, remove resolved errors and
    // add new ones.
    newErrors = this.state.errors;
    if (_.isEmpty(errors)) delete newErrors[attr];else newErrors[attr] = errors;
    this.setState({ errors: newErrors });
    // if have onErrorChange event, convert errors back to global version and
    // fire update
    if (_.isFunction(this.props.onErrorChange)) this.props.onErrorChange(this._fullAttrName(attr), errors);
  },
  render: function render() {
    var addrObject, classes;
    addrObject = _.get(this.props.object, this.props.attr) || {};

    classes = cx(_defineProperty({
      'address-us': true,
      'address-us': true,
      'form-group': true,
      'has-child-error': this._anyChildErrors()
    }, this.props.className, true));

    return React.createElement(
      'div',
      { className: classes },
      React.createElement(ObsLabel, { text: this.props.label, required: this.props.required, htmlFor: this.state.addressId }),
      React.createElement(ObsHint, { hint: this.props.hint }),
      React.createElement(
        ObsCompoundLayout,
        { label: this.props.label, layout: "full", className: this.props.className },
        React.createElement(ObsFormattedText, { id: this.state.addressId,
          object: addrObject, attr: this.fields.street_1.attr, formatter: Formatters.stringFormatter,
          required: this.props.required, errors: this._getErrors(this.fields.street_1.attr),
          placeholder: "Address", onErrorChange: this._errorsChanged,
          onChange: _.bind(this._valueChanged, this), className: 'address-line-1',
          onTouch: this._fieldTouched }),
        React.createElement(
          ObsCompoundLayout,
          { label: this.props.label, layout: "inline", className: this.props.className },
          React.createElement(
            'div',
            { className: 'flex-grow-shrink' },
            React.createElement(ObsFormattedText, { object: addrObject, attr: this.fields.city.attr, formatter: Formatters.stringFormatter,
              required: this.props.required, errors: this._getErrors(this.fields.city.attr),
              placeholder: "City", onErrorChange: this._errorsChanged,
              onChange: _.bind(this._valueChanged, this), className: 'address-city',
              onTouch: this._fieldTouched })
          ),
          React.createElement(
            'div',
            { className: 'flex-static' },
            React.createElement(ObsFormattedText, { object: addrObject, attr: this.fields.state.attr, formatter: Formatters.stateFormatter,
              required: this.props.required, errors: this._getErrors(this.fields.state.attr),
              placeholder: "ST", onErrorChange: this._errorsChanged,
              onChange: _.bind(this._valueChanged, this), className: 'address-state state',
              onTouch: this._fieldTouched })
          ),
          React.createElement(
            'div',
            { className: 'flex-static' },
            React.createElement(ObsFormattedText, { object: addrObject, attr: this.fields.zip.attr, formatter: Formatters.zipcodeFormatter,
              required: this.props.required, errors: this._getErrors(this.fields.zip.attr),
              placeholder: "Zip", onErrorChange: this._errorsChanged,
              onChange: _.bind(this._valueChanged, this), className: 'address-zipcode zipcode',
              onTouch: this._fieldTouched })
          )
        )
      ),
      React.createElement(ObsError, { errors: this._errorsText() })
    );
  }
});

module.exports = ObsAddressUs;
;
//# sourceMappingURL=address-us.js.map