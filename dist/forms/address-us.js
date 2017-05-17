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

var _formatters = require('../formatters/formatters');

var _formatters2 = _interopRequireDefault(_formatters);

var _compoundLayout = require('./compound-layout');

var _compoundLayout2 = _interopRequireDefault(_compoundLayout);

var _text = require('./text');

var _text2 = _interopRequireDefault(_text);

var _label = require('./label');

var _label2 = _interopRequireDefault(_label);

var _hint = require('./hint');

var _hint2 = _interopRequireDefault(_hint);

var _error = require('./error');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ObsAddressUs = function (_React$Component) {
  _inherits(ObsAddressUs, _React$Component);

  function ObsAddressUs(props) {
    _classCallCheck(this, ObsAddressUs);

    var _this = _possibleConstructorReturn(this, (ObsAddressUs.__proto__ || Object.getPrototypeOf(ObsAddressUs)).call(this, props));

    _this.fields = {
      street_1: { name: 'Address', attr: 'street_1' },
      city: { name: 'City', attr: 'city' },
      state: { name: 'State', attr: 'state' },
      zip: { name: 'Zip', attr: 'zip' }
    };

    _this.inputs = [];

    _this.state = {
      id: props.id || _lodash2.default.uniqueId('address_')
    };

    _this._address_attrs = _this._address_attrs.bind(_this);
    _this._addressErrors = _this._addressErrors.bind(_this);
    _this._fullAttrName = _this._fullAttrName.bind(_this);
    _this.errorsWithLabelNames = _this.errorsWithLabelNames.bind(_this);
    _this.onChange = _this.onChange.bind(_this);
    _this.onBlur = _this.onBlur.bind(_this);
    _this.runValidations = _this.runValidations.bind(_this);
    _this.register = _this.register.bind(_this);
    _this.unregister = _this.unregister.bind(_this);
    _this.classesForAttr = _this.classesForAttr.bind(_this);
    return _this;
  }

  _createClass(ObsAddressUs, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (_lodash2.default.isFunction(this.props.didMount)) this.props.didMount(this);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (_lodash2.default.isFunction(this.props.willUnmount)) this.props.willUnmount(this);
    }

    // returns a list of fully qualified address attributes (such as address.city
    // and address.zip)

  }, {
    key: '_address_attrs',
    value: function _address_attrs() {
      var _this2 = this;

      var list = [];
      _lodash2.default.forOwn(this.fields, function (field, value) {
        list.push(_this2._fullAttrName(field.attr));
      });
      return list;
    }

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

  }, {
    key: '_addressErrors',
    value: function _addressErrors() {
      var _this3 = this;

      var addressErrors,
          result = {};
      addressErrors = _lodash2.default.pick(this.props.errors, this._address_attrs());
      _lodash2.default.forOwn(this.fields, function (value, field) {
        var errors = addressErrors[_this3._fullAttrName(value.attr)];
        if (!_lodash2.default.isEmpty(errors)) result[value.attr] = errors;
      });
      return result;
    }

    // converts the partial field names into fully qualified names

  }, {
    key: '_fullAttrName',
    value: function _fullAttrName(attr) {
      return this.props.attr + '.' + attr;
    }
  }, {
    key: 'errorsWithLabelNames',
    value: function errorsWithLabelNames() {
      var _this4 = this;

      return _lodash2.default.reduce(this._addressErrors(), function (acc, errors, attr) {
        _lodash2.default.forEach(errors, function (error) {
          acc.push(_this4.fields[attr].name + ' ' + error);
        });
        return acc;
      }, []);
    }
  }, {
    key: 'onChange',
    value: function onChange(attr, value) {
      // Fire onChange event for the full attribute name
      if (_lodash2.default.isFunction(this.props.onChange)) this.props.onChange(this._fullAttrName(attr), value);
    }
  }, {
    key: 'onBlur',
    value: function onBlur(attr, results) {
      // since the input is already returning the results of the formatter, we
      // don't need to call the formetter here.  We only need to convert the
      // attribute name to a fully qualified name
      if (_lodash2.default.isFunction(this.props.onBlur)) this.props.onBlur(this._fullAttrName(attr), results);
    }

    // run through validations on each input

  }, {
    key: 'runValidations',
    value: function runValidations() {
      var errors = _lodash2.default.reduce(this.inputs, function (errors, input) {
        return _lodash2.default.concat(errors, input.runValidations());
      }, []);
      return errors;
    }
  }, {
    key: 'register',
    value: function register(input) {
      this.inputs = _lodash2.default.concat(this.inputs, input);
    }
  }, {
    key: 'unregister',
    value: function unregister(input) {
      this.inputs = _lodash2.default.without(this.inputs, input);
    }
  }, {
    key: 'classesForAttr',
    value: function classesForAttr(attr) {
      var _cx;

      var classes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

      return (0, _classnames2.default)((_cx = {}, _defineProperty(_cx, classes, _lodash2.default.isString(classes)), _defineProperty(_cx, "has-error", !_lodash2.default.isEmpty(this._addressErrors()[attr])), _cx));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var valueFor = function valueFor(attr) {
        return _lodash2.default.get(_this5.props.value || {}, attr);
      };
      var classes = (0, _classnames2.default)(_defineProperty({
        'address-us': true,
        'form-group': true,
        'has-child-error': !_lodash2.default.isEmpty(this.errorsWithLabelNames())
      }, this.props.className, _lodash2.default.isString(this.props.className)));

      return _react2.default.createElement(
        'div',
        { className: classes },
        _react2.default.createElement(_label2.default, { text: this.props.label, required: this.props.required, htmlFor: this.state.id }),
        _react2.default.createElement(_hint2.default, { hint: this.props.hint }),
        _react2.default.createElement(
          _compoundLayout2.default,
          { layout: "full" },
          _react2.default.createElement(_text2.default, { id: this.state.id,
            value: valueFor(this.fields.street_1.attr), errors: [],
            required: this.props.required, formatter: _formatters2.default.stringFormatter,
            placeholder: "Address",
            className: this.classesForAttr(this.fields.street_1.attr, "address-line-1"),
            onChange: _lodash2.default.bind(this.onChange, this, this.fields.street_1.attr),
            onBlur: _lodash2.default.bind(this.onBlur, this, this.fields.street_1.attr),
            didMount: this.register, willUnmount: this.unregister,
            autoFocus: this.props.autoFocus, customValidator: this.props.streetCustomValidator }),
          _react2.default.createElement(
            _compoundLayout2.default,
            { layout: "inline" },
            _react2.default.createElement(
              'div',
              { className: 'flex-grow-shrink' },
              _react2.default.createElement(_text2.default, {
                value: valueFor(this.fields.city.attr), errors: [],
                required: this.props.required, formatter: _formatters2.default.stringFormatter,
                placeholder: "City",
                className: this.classesForAttr(this.fields.city.attr, "address-city"),
                onChange: _lodash2.default.bind(this.onChange, this, this.fields.city.attr),
                onBlur: _lodash2.default.bind(this.onBlur, this, this.fields.city.attr),
                didMount: this.register, willUnmount: this.unregister, customValidator: this.props.cityCustomValidator })
            ),
            _react2.default.createElement(
              'div',
              { className: 'flex-static' },
              _react2.default.createElement(_text2.default, {
                value: valueFor(this.fields.state.attr), errors: [],
                required: this.props.required, formatter: _formatters2.default.stateFormatter,
                placeholder: "ST",
                className: this.classesForAttr(this.fields.state.attr, "address-state state"),
                onChange: _lodash2.default.bind(this.onChange, this, this.fields.state.attr),
                onBlur: _lodash2.default.bind(this.onBlur, this, this.fields.state.attr),
                didMount: this.register, willUnmount: this.unregister, customValidator: this.props.stateCustomValidator })
            ),
            _react2.default.createElement(
              'div',
              { className: 'flex-static' },
              _react2.default.createElement(_text2.default, {
                value: valueFor(this.fields.zip.attr), errors: [],
                required: this.props.required, formatter: _formatters2.default.zipcodeFormatter,
                placeholder: "Zip",
                className: this.classesForAttr(this.fields.zip.attr, "address-zipcode zipcode"),
                onChange: _lodash2.default.bind(this.onChange, this, this.fields.zip.attr),
                onBlur: _lodash2.default.bind(this.onBlur, this, this.fields.zip.attr),
                didMount: this.register, willUnmount: this.unregister, customValidator: this.props.zipCustomValidator })
            )
          )
        ),
        _react2.default.createElement(_error2.default, { errors: this.errorsWithLabelNames() })
      );
    }
  }]);

  return ObsAddressUs;
}(_react2.default.Component);

ObsAddressUs.defaultProps = {
  label: "Address",
  required: false,
  autoFocus: false,
  errors: {}
};

ObsAddressUs.propTypes = {
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  errors: _propTypes2.default.object,
  attr: _propTypes2.default.string.isRequired,
  onChange: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  label: _propTypes2.default.string,
  hint: _propTypes2.default.string,
  required: _propTypes2.default.bool,
  id: _propTypes2.default.string,
  className: _propTypes2.default.string,
  autoFocus: _propTypes2.default.bool,
  didMount: _propTypes2.default.func,
  willUnmount: _propTypes2.default.func,
  streetCustomValidator: _propTypes2.default.func,
  cityCustomValidator: _propTypes2.default.func,
  stateCustomValidator: _propTypes2.default.func,
  zipCustomValidator: _propTypes2.default.func
};

module.exports = ObsAddressUs;