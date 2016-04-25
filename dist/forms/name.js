'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = require('react');
var cx = require('classnames');
var _ = require('lodash');

var Formatters = require('../formatters/formatters');

var ObsCompoundLayout = require('./compound-layout');
var ObsText = require('./text');
var ObsLabel = require('./label');
var ObsHint = require('./hint');
var ObsError = require('./error');

var Name = React.createClass({
  displayName: 'Name',

  propTypes: {
    value: React.PropTypes.object,
    attr: React.PropTypes.string,
    firstNameAttr: React.PropTypes.string,
    lastNameAttr: React.PropTypes.string,
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

  getDefaultProps: function getDefaultProps() {
    return {
      label: "Name",
      firstNameAttr: "first",
      lastNameAttr: "last",
      required: false,
      errors: {},
      id: _.uniqueId('name_')
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
  _name_attrs: function _name_attrs() {
    return [this._fullAttrName(this.props.firstNameAttr), this._fullAttrName(this.props.lastNameAttr)];
  },


  // turn fully-qualified errors structure into one that is relative to the fields
  // this component renders
  // {
  //   "person.name.first": ["is required"]
  // }
  //
  // Convert to format:
  //
  // {
  //   "first": ["is required"]
  // }
  _nameErrors: function _nameErrors() {
    var _this = this;

    var errors = this.props.errors;
    return _.reduce([this.props.firstNameAttr, this.props.lastNameAttr], function (acc, attr) {
      var attrErrors = _.get(errors, _this._fullAttrName(attr));
      if (!_.isEmpty(attrErrors)) acc[attr] = attrErrors;
      return acc;
    }, {});
  },


  // converts the partial field names into fully qualified names
  _fullAttrName: function _fullAttrName(attr) {
    return this.props.attr + '.' + attr;
  },
  errorsWithLabelNames: function errorsWithLabelNames() {
    var _this2 = this;

    return _.reduce(this._nameErrors(), function (acc, errors, attr) {
      var name;
      if (attr === _this2.props.firstNameAttr) name = "First name";else name = "Last name";
      _.forEach(errors, function (error) {
        acc.push(name + ' ' + error);
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
  render: function render() {
    var _this3 = this;

    var valueFor = function valueFor(attr) {
      return _.get(_this3.props.value || {}, attr);
    };
    var classesFor = function classesFor(attr) {
      var _cx;

      var classes = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];

      return cx((_cx = {}, _defineProperty(_cx, classes, _.isString(classes)), _defineProperty(_cx, "has-error", !_.isEmpty(_this3._nameErrors()[attr])), _cx));
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
        { layout: 'inline' },
        React.createElement(
          'div',
          { className: 'flex-grow-shrink' },
          React.createElement(ObsText, { id: this.props.id,
            value: valueFor(this.props.firstNameAttr), errors: [],
            required: this.props.required, formatter: Formatters.stringFormatter,
            placeholder: "First",
            className: classesFor(this.props.firstNameAttr, "name-first"),
            onChange: _.bind(this.onChange, this, this.props.firstNameAttr),
            onBlur: _.bind(this.onBlur, this, this.props.firstNameAttr) })
        ),
        React.createElement(
          'div',
          { className: 'flex-grow-shrink' },
          React.createElement(ObsText, {
            value: valueFor(this.props.lastNameAttr), errors: [],
            required: this.props.required, formatter: Formatters.stringFormatter,
            placeholder: "Last",
            className: classesFor(this.props.lastNameAttr, "name-last"),
            onChange: _.bind(this.onChange, this, this.props.lastNameAttr),
            onBlur: _.bind(this.onBlur, this, this.props.lastNameAttr) })
        )
      ),
      React.createElement(ObsError, { errors: this.errorsWithLabelNames() })
    );
  }
});

module.exports = Name;