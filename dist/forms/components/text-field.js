'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TextField(props) {
  return props.form.textField(props.label, props.name, props.options);
}

TextField.propTypes = {
  form: _propTypes2.default.object.isRequired,
  label: _propTypes2.default.string.isRequired,
  name: _propTypes2.default.string.isRequired,
  options: _propTypes2.default.object
};

module.exports = TextField;