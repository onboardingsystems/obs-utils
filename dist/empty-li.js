"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HouseholdEmptyRow = _react2.default.createClass({
  displayName: "HouseholdEmptyRow",
  render: function render() {
    return _react2.default.createElement(
      "li",
      { className: "empty" },
      "(none)"
    );
  }
});

module.exports = HouseholdEmptyRow;