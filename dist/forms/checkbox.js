'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _error = require('./error');

var _error2 = _interopRequireDefault(_error);

var _requiredMarker = require('./required-marker');

var _requiredMarker2 = _interopRequireDefault(_requiredMarker);

var _hint = require('./hint');

var _hint2 = _interopRequireDefault(_hint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ObsCheckbox = function (_React$Component) {
  _inherits(ObsCheckbox, _React$Component);

  function ObsCheckbox(props) {
    _classCallCheck(this, ObsCheckbox);

    var _this = _possibleConstructorReturn(this, (ObsCheckbox.__proto__ || Object.getPrototypeOf(ObsCheckbox)).call(this, props));

    _this.state = {
      checked: props.value
    };

    _this._valueChanged = _this._valueChanged.bind(_this);
    _this.runValidations = _this.runValidations.bind(_this);
    _this.value = _this.value.bind(_this);
    return _this;
  }

  _createClass(ObsCheckbox, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // register this component with the formBuilder to aid with form validation
      // before submission (so that fields with focus can still be validated
      // instead of having to wait for a blur even to validate)
      if (_lodash2.default.isFunction(this.props.didMount)) this.props.didMount(this);

      // nothing left to do if there isn't an onChange to call
      if (!_lodash2.default.isFunction(this.props.onChange)) return;

      // If props.value isn't a boolean value, fall back to the defaultValue and
      // submit it back to the formBuilder so we can be rendered again with a
      // valid value in our props.
      //
      // A defaultValue that isn't a boolean will result in an infinate loop. So
      // check defaultValue before submitting a new value for props.value.
      if (!_lodash2.default.isBoolean(this.props.value) && _lodash2.default.isBoolean(this.props.defaultValue)) {
        this.props.onChange({
          formatted: this.props.defaultValue,
          parsed: this.props.defaultValue
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (_lodash2.default.isFunction(this.props.willUnmount)) this.props.willUnmount(this);
    }
  }, {
    key: '_valueChanged',
    value: function _valueChanged(e) {
      var value = e.target.checked;
      this.setState({ checked: value });
      if (_lodash2.default.isFunction(this.props.onChange)) this.props.onChange(value);
      if (_lodash2.default.isFunction(this.props.onBlur)) this.props.onBlur({ valid: true, parsed: value, formatted: value, errors: [] });
    }
  }, {
    key: 'runValidations',
    value: function runValidations() {}

    // having a value of null can be bad for our controlled inputs, even if for a
    // little while.  So since our defaultValue doesn't kick in right away we
    // still need something here to help prevent bad values from being rendered.

  }, {
    key: 'value',
    value: function value() {
      if (_lodash2.default.isBoolean(this.props.value)) {
        return this.props.value;
      } else {
        return false;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var bootstrapClasses = (0, _classnames2.default)({
        "checkbox": true,
        "has-error": !_lodash2.default.isEmpty(this.props.errors)
      });

      return _react2.default.createElement(
        'div',
        { className: this.props.className },
        _react2.default.createElement(
          'div',
          { className: bootstrapClasses },
          _react2.default.createElement(
            'label',
            null,
            _react2.default.createElement('input', { type: 'checkbox', id: this.props.id, checked: this.value(), onChange: this._valueChanged }),
            this.props.label,
            _react2.default.createElement(_requiredMarker2.default, { required: this.props.required })
          ),
          _react2.default.createElement(_error2.default, { errors: this.props.errors })
        ),
        _react2.default.createElement(_hint2.default, { hint: this.props.hint })
      );
    }
  }]);

  return ObsCheckbox;
}(_react2.default.Component);

ObsCheckbox.defaultProps = {
  defaultValue: false,
  required: false,
  errors: []
};

ObsCheckbox.propTypes = {
  value: _propTypes2.default.bool,
  defaultValue: _propTypes2.default.bool,
  onChange: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  label: _propTypes2.default.string,
  hint: _propTypes2.default.string,
  required: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  id: _propTypes2.default.string,
  errors: _propTypes2.default.array, // array of strings
  didMount: _propTypes2.default.func,
  willUnmount: _propTypes2.default.func
};

module.exports = ObsCheckbox;