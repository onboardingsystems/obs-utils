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

var Name = function (_React$Component) {
  _inherits(Name, _React$Component);

  function Name(props) {
    _classCallCheck(this, Name);

    var _this = _possibleConstructorReturn(this, (Name.__proto__ || Object.getPrototypeOf(Name)).call(this, props));

    _this.inputs = [];
    _this.state = {
      id: props.id || _lodash2.default.uniqueId('name_')
    };

    _this._nameErrors = _this._nameErrors.bind(_this);
    _this.errorsWithLabelNames = _this.errorsWithLabelNames.bind(_this);
    _this.onChange = _this.onChange.bind(_this);
    _this.onBlur = _this.onBlur.bind(_this);
    _this.runValidations = _this.runValidations.bind(_this);
    _this.register = _this.register.bind(_this);
    _this.unregister = _this.unregister.bind(_this);
    return _this;
  }

  _createClass(Name, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (_lodash2.default.isFunction(this.props.didMount)) this.props.didMount(this);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (_lodash2.default.isFunction(this.props.willUnmount)) this.props.willUnmount(this);
    }

    // takes the errors passed in and selects out only errors for this component

  }, {
    key: '_nameErrors',
    value: function _nameErrors() {
      return _lodash2.default.pick(this.props.errors, [this.props.firstNameAttr, this.props.lastNameAttr]);
    }
  }, {
    key: 'errorsWithLabelNames',
    value: function errorsWithLabelNames() {
      var _this2 = this;

      return _lodash2.default.reduce(this._nameErrors(), function (acc, errors, attr) {
        var name;
        if (attr === _this2.props.firstNameAttr) name = "First name";else name = "Last name";
        _lodash2.default.forEach(errors, function (error) {
          acc.push(name + ' ' + error);
        });
        return acc;
      }, []);
    }
  }, {
    key: 'onChange',
    value: function onChange(attr, value) {
      // Fire onChange event for the full attribute name
      if (_lodash2.default.isFunction(this.props.onChange)) this.props.onChange(attr, value);
    }
  }, {
    key: 'onBlur',
    value: function onBlur(attr, results) {
      // since the input is already returning the results of the formatter, we
      // don't need to call the formetter here.  We only need to convert the
      // attribute name to a fully qualified name
      if (_lodash2.default.isFunction(this.props.onBlur)) this.props.onBlur(attr, results);
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
    key: 'render',
    value: function render() {
      var _this3 = this;

      var valueFor = function valueFor(attr) {
        return _lodash2.default.get(_this3.props.value || {}, attr);
      };
      var classesFor = function classesFor(attr) {
        var _cx;

        var classes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        return (0, _classnames2.default)((_cx = {}, _defineProperty(_cx, classes, _lodash2.default.isString(classes)), _defineProperty(_cx, "has-error", !_lodash2.default.isEmpty(_this3._nameErrors()[attr])), _cx));
      };
      var classes = (0, _classnames2.default)(_defineProperty({
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
          { layout: 'inline' },
          _react2.default.createElement(
            'div',
            { className: 'flex-grow-shrink' },
            _react2.default.createElement(_text2.default, { id: this.state.id,
              value: valueFor(this.props.firstNameAttr), errors: [],
              required: this.props.required, formatter: _formatters2.default.stringFormatter,
              placeholder: "First",
              className: classesFor(this.props.firstNameAttr, "name-first"),
              onChange: _lodash2.default.bind(this.onChange, this, this.props.firstNameAttr),
              onBlur: _lodash2.default.bind(this.onBlur, this, this.props.firstNameAttr),
              didMount: this.register, willUnmount: this.unregister,
              autoFocus: this.props.autoFocus,
              customValidator: this.props.firstNameCustomValidator })
          ),
          _react2.default.createElement(
            'div',
            { className: 'flex-grow-shrink' },
            _react2.default.createElement(_text2.default, {
              value: valueFor(this.props.lastNameAttr), errors: [],
              required: this.props.required, formatter: _formatters2.default.stringFormatter,
              placeholder: "Last",
              className: classesFor(this.props.lastNameAttr, "name-last"),
              onChange: _lodash2.default.bind(this.onChange, this, this.props.lastNameAttr),
              onBlur: _lodash2.default.bind(this.onBlur, this, this.props.lastNameAttr),
              didMount: this.register, willUnmount: this.unregister,
              customValidator: this.props.lastNameCustomValidator })
          )
        ),
        _react2.default.createElement(_error2.default, { errors: this.errorsWithLabelNames() })
      );
    }
  }]);

  return Name;
}(_react2.default.Component);

Name.propTypes = {
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  firstNameAttr: _propTypes2.default.string,
  lastNameAttr: _propTypes2.default.string,
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
  firstNameCustomValidator: _propTypes2.default.func,
  lastNameCustomValidator: _propTypes2.default.func
};

Name.defaultProps = {
  label: "Name",
  firstNameAttr: "first_name",
  lastNameAttr: "last_name",
  required: false,
  autoFocus: false,
  errors: {}
};

module.exports = Name;