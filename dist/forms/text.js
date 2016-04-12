'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = require('react');
var cx = require('classnames');
var _ = require('lodash');

var ObsLabel = require('./label');
var ObsError = require('./error');

var ObsText = React.createClass({
  displayName: 'ObsText',

  propTypes: {
    value: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    label: React.PropTypes.string,
    hint: React.PropTypes.string,
    required: React.PropTypes.bool,
    placeholder: React.PropTypes.string,
    className: React.PropTypes.string,
    id: React.PropTypes.string,
    errors: React.PropTypes.array },

  // array of strings
  getDefaultProps: function getDefaultProps() {
    return {
      required: false,
      errors: []
    };
  },
  getInitialState: function getInitialState() {
    return {
      linkingId: _.uniqueId('text_')
    };
  },
  _valueChanged: function _valueChanged(e) {
    if (_.isFunction(this.props.onChange)) this.props.onChange(e.target.value);
  },
  render: function render() {
    var groupClasses, usingId;
    groupClasses = cx(_defineProperty({
      "form-group": true,
      "has-error": !_.isEmpty(this.props.errors)
    }, this.props.className, true));

    // determine the html ID used to link the label and the input If an explicit
    // ID is given, use that. Otherwise use a genrated one to reliably link them
    // together.
    if (!_.isEmpty(this.props.id)) usingId = this.props.id;else usingId = this.state.linkingId;

    return React.createElement(
      'div',
      { className: groupClasses },
      React.createElement(ObsLabel, { text: this.props.label, hint: this.props.hint, htmlFor: usingId,
        required: this.props.required }),
      React.createElement('input', { id: usingId, className: 'form-control', type: 'text', value: this.props.value,
        placeholder: this.props.placeholder,
        onChange: this._valueChanged, onBlur: this.props.onBlur }),
      React.createElement(ObsError, { errors: this.props.errors })
    );
  }
});

module.exports = ObsText;
;'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = require('react');
var cx = require('classnames');
var _ = require('lodash');

var ObsLabel = require('./label');
var ObsError = require('./error');

var ObsTextarea = React.createClass({
  displayName: 'ObsTextarea',

  propTypes: {
    value: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    label: React.PropTypes.string,
    hint: React.PropTypes.string,
    required: React.PropTypes.bool,
    placeholder: React.PropTypes.string,
    className: React.PropTypes.string,
    id: React.PropTypes.string,
    rows: React.PropTypes.number,
    errors: React.PropTypes.array // array of strings
  },

  getDefaultProps: function getDefaultProps() {
    return {
      required: false,
      rows: 3
    };
  },
  _valueChanged: function _valueChanged(e) {
    if (_.isFunction(this.props.onChange)) this.props.onChange(e.target.value);
  },
  render: function render() {
    var groupClasses;
    groupClasses = cx(_defineProperty({
      "form-group": true,
      "has-error": !_.isEmpty(this.props.errors)
    }, this.props.className, this.props.className));

    return React.createElement(
      'div',
      { className: groupClasses },
      React.createElement(ObsLabel, { text: this.props.label, hint: this.props.hint, required: this.props.required }),
      React.createElement('textarea', { id: this.props.id, className: 'form-control', rows: this.props.rows, type: 'text', value: this.props.value,
        placeholder: this.props.placeholder,
        onChange: this._valueChanged, onBlur: this.props.onBlur }),
      React.createElement(ObsError, { errors: this.props.errors })
    );
  }
});

module.exports = ObsTextarea;
;
//# sourceMappingURL=text.js.map