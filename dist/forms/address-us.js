'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = require('react');
var cx = require('classnames');

var Formatters = require('../formatters/formatters');

var ObsCompoundLayout = require('./compound-layout');
var ObsText = require('./text');
var ObsLabel = require('./label');
var ObsHint = require('./hint');
var ObsError = require('./error');

var ObsAddressUs = React.createClass({
  displayName: 'ObsAddressUs',

  propTypes: {
    value: React.PropTypes.object,
    errors: React.PropTypes.object,
    attr: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    label: React.PropTypes.string,
    hint: React.PropTypes.string,
    required: React.PropTypes.bool,
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    didMount: React.PropTypes.func,
    willUnmount: React.PropTypes.func
  },

  fields: {
    street_1: { name: 'Address', attr: 'street_1' },
    city: { name: 'City', attr: 'city' },
    state: { name: 'State', attr: 'state' },
    zip: { name: 'Zip', attr: 'zip' }
  },
  inputs: [],

  getDefaultProps: function getDefaultProps() {
    return {
      label: "Address",
      required: false,
      errors: {},
      id: _.uniqueId('address1_')
    };
  },
  componentDidMount: function componentDidMount() {
    if (_.isFunction(this.props.didMount)) this.props.didMount(this);
  },
  componentWillUnmount: function componentWillUnmount() {
    if (_.isFunction(this.props.willUnmount)) this.props.willUnmount(this);
  },


  // returns a list of fully qualified address attributes (such as address.city
  // and address.zip)
  _address_attrs: function _address_attrs() {
    var _this = this;

    var list = [];
    _.forOwn(this.fields, function (field, value) {
      list.push(_this._fullAttrName(field.attr));
    });
    return list;
  },


  // turn fully-qualified errors structure into one that is relative to the fields
  // this component renders
  // {
  //   "person.address.state": ["is required"]
  // }
  //
  // Convert to format:
  //
  // {
  //   "state": ["is required"]
  // }
  _addressErrors: function _addressErrors() {
    var _this2 = this;

    var addressErrors,
        result = {};
    addressErrors = _.pick(this.props.errors, this._address_attrs());
    _.forOwn(this.fields, function (value, field) {
      var errors = addressErrors[_this2._fullAttrName(value.attr)];
      if (!_.isEmpty(errors)) result[value.attr] = errors;
    });
    return result;
  },


  // converts the partial field names into fully qualified names
  _fullAttrName: function _fullAttrName(attr) {
    return this.props.attr + '.' + attr;
  },
  errorsWithLabelNames: function errorsWithLabelNames() {
    var _this3 = this;

    return _.reduce(this._addressErrors(), function (acc, errors, attr) {
      _.forEach(errors, function (error) {
        acc.push(_this3.fields[attr].name + ' ' + error);
      });
      return acc;
    }, []);
  },
  onChange: function onChange(attr, value) {
    // Fire onChange event for the full attribute name
    if (_.isFunction(this.props.onChange)) this.props.onChange(this._fullAttrName(attr), value);
  },
  onBlur: function onBlur(attr, results) {
    // since the input is already returning the results of the formatter, we
    // don't need to call the formetter here.  We only need to convert the
    // attribute name to a fully qualified name
    if (_.isFunction(this.props.onBlur)) this.props.onBlur(this._fullAttrName(attr), results);
  },


  // run through validations on each input
  runValidations: function runValidations() {
    var errors = _.reduce(this.inputs, function (errors, input) {
      return _.concat(errors, input.runValidations());
    }, []);
    return errors;
  },
  register: function register(input) {
    this.inputs = _.concat(this.inputs, input);
  },
  unregister: function unregister(input) {
    this.inputs = _.without(this.inputs, input);
  },
  classesForAttr: function classesForAttr(attr) {
    var _cx;

    var classes = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];

    return cx((_cx = {}, _defineProperty(_cx, classes, _.isString(classes)), _defineProperty(_cx, "has-error", !_.isEmpty(this._addressErrors()[attr])), _cx));
  },
  render: function render() {
    var _this4 = this;

    var valueFor = function valueFor(attr) {
      return _.get(_this4.props.value || {}, attr);
    };
    var classes = cx(_defineProperty({
      'address-us': true,
      'address-us': true,
      'form-group': true,
      'has-child-error': !_.isEmpty(this.errorsWithLabelNames())
    }, this.props.className, _.isString(this.props.className)));

    return React.createElement(
      'div',
      { className: classes },
      React.createElement(ObsLabel, { text: this.props.label, required: this.props.required, htmlFor: this.props.id }),
      React.createElement(ObsHint, { hint: this.props.hint }),
      React.createElement(
        ObsCompoundLayout,
        { layout: "full" },
        React.createElement(ObsText, { id: this.props.id,
          value: valueFor(this.fields.street_1.attr), errors: [],
          required: this.props.required, formatter: Formatters.stringFormatter,
          placeholder: "Address",
          className: this.classesForAttr(this.fields.street_1.attr, "address-line-1"),
          onChange: _.bind(this.onChange, this, this.fields.street_1.attr),
          onBlur: _.bind(this.onBlur, this, this.fields.street_1.attr),
          didMount: this.register, willUnmount: this.unregister }),
        React.createElement(
          ObsCompoundLayout,
          { layout: "inline" },
          React.createElement(
            'div',
            { className: 'flex-grow-shrink' },
            React.createElement(ObsText, {
              value: valueFor(this.fields.city.attr), errors: [],
              required: this.props.required, formatter: Formatters.stringFormatter,
              placeholder: "City",
              className: this.classesForAttr(this.fields.city.attr, "address-city"),
              onChange: _.bind(this.onChange, this, this.fields.city.attr),
              onBlur: _.bind(this.onBlur, this, this.fields.city.attr),
              didMount: this.register, willUnmount: this.unregister })
          ),
          React.createElement(
            'div',
            { className: 'flex-static' },
            React.createElement(ObsText, {
              value: valueFor(this.fields.state.attr), errors: [],
              required: this.props.required, formatter: Formatters.stateFormatter,
              placeholder: "ST",
              className: this.classesForAttr(this.fields.state.attr, "address-state state"),
              onChange: _.bind(this.onChange, this, this.fields.state.attr),
              onBlur: _.bind(this.onBlur, this, this.fields.state.attr),
              didMount: this.register, willUnmount: this.unregister })
          ),
          React.createElement(
            'div',
            { className: 'flex-static' },
            React.createElement(ObsText, {
              value: valueFor(this.fields.zip.attr), errors: [],
              required: this.props.required, formatter: Formatters.zipcodeFormatter,
              placeholder: "Zip",
              className: this.classesForAttr(this.fields.zip.attr, "address-zipcode zipcode"),
              onChange: _.bind(this.onChange, this, this.fields.zip.attr),
              onBlur: _.bind(this.onBlur, this, this.fields.zip.attr),
              didMount: this.register, willUnmount: this.unregister })
          )
        )
      ),
      React.createElement(ObsError, { errors: this.errorsWithLabelNames() })
    );
  }
});

module.exports = ObsAddressUs;