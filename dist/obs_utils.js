(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  require.reset = function() {
    modules = {};
    cache = {};
    aliases = {};
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var result = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  require.brunch = true;
  require._cache = cache;
  globals.require = require;
})();
require.register("formatters/formatters.js", function(exports, require, module) {
'use strict';

var _ = require('lodash');
var moment = require('moment');
var numeral = require('numeral');

var Formatters = {
  addressLines: function addressLines(addressObj) {
    if (_.isEmpty(_.omitBy(addressObj, _.isEmpty))) return [];
    var line1 = addressObj.street_1;
    var line2 = null;
    var line3 = addressObj.city + ', ' + addressObj.state + ' ' + addressObj.zip;
    return _.compact(_.concat([], line1, line2, line3));
  },
  addressOneLine: function addressOneLine(addressObj) {
    if (_.isEmpty(_.omitBy(addressObj, _.isEmpty))) return '';
    return this.addressLines(addressObj).join(', ');
  },
  currencyDisplay: function currencyDisplay(value) {
    var format = arguments.length <= 1 || arguments[1] === undefined ? 'dollars' : arguments[1];

    var numObj;
    numObj = numeral(value);
    if (format === 'dollars') return numObj.format('$0,0');else return numObj.format('$0,0.00');
  },
  ordinalize: function ordinalize(value) {
    var ordinal, last_2;
    value = (value || "").toString();
    if (_.isEmpty(value)) return '';
    // check what digit the number ends with for choosing the correct text
    // ending
    switch (value.charAt(value.length - 1)) {
      case '1':
        ordinal = 'st';
        break;
      case '2':
        ordinal = 'nd';
        break;
      case '3':
        ordinal = 'rd';
        break;
      default:
        ordinal = 'th';
    }
    // address some exceptions when looking at larger portion
    last_2 = value.slice(-2);
    if (last_2 == '11' || last_2 == '12' || last_2 == '13') ordinal = 'th';

    return value + ordinal;
  },


  // ########
  //
  timeFormat: 'h:mm a',
  // Standard Date Formatter (ex: Jun 3, 2014) - uses locale settings
  dateFormat: 'll',
  dollarsFormat: '$0,0',
  dollarsCentsFormat: '$0,0.00',
  monthYearFormat: 'MMM YYYY',
  monthDayYearFormat: 'MMM D, YYYY',
  // Default detailed date/time display format
  dateTimeDetailedFormat: 'MMM DD, YYYY  h:mm:ss a',

  // Relative language description of the date/time (ex: "3 days ago", "seconds ago")
  timeAgoDisplay: function timeAgoDisplay(value) {
    if (_.isEmpty(value)) return null;
    return this.parseDate(value).fromNow();
  },


  // Standard Date and Time Formatter (ex: Jun 3, 2014 3:05:53 p)
  datetimeDisplay: function datetimeDisplay(value) {
    if (_.isEmpty(value)) return null;
    return this.parseDate(value).format(this.dateTimeDetailedFormat);
  },
  requiredFormatter: function requiredFormatter(value) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var options = _.merge({}, { required: false }, options);
    var errors = [];

    if (options.required && _.isEmpty(value)) errors.push('is required');
    return {
      valid: errors.length === 0,
      parsed: value,
      formatted: value,
      errors: errors
    };
  },
  stringFormatter: function stringFormatter(value) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var options = _.merge({}, { required: false }, options);
    var parsed,
        formatted,
        errors = [];

    if (_.isNumber(value)) value = value.toString();
    if (_.isEmpty(value)) value = "";
    parsed = _.trim(value.toString());
    if (options.required && _.isEmpty(parsed)) errors.push('is required');
    return {
      valid: errors.length === 0,
      parsed: parsed,
      formatted: parsed,
      errors: errors
    };
  },
  phoneFormatter: function phoneFormatter(value) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var val,
        valid,
        parsed,
        formatted,
        errors = [];
    val = Formatters.stringFormatter(value, options);
    if (_.isEmpty(val.parsed)) return val;
    // remove all non-digits
    parsed = val.parsed.replace(/\D/g, '');
    valid = parsed.length === 10;
    if (valid) {
      formatted = parsed.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    } else {
      formatted = parsed;
      errors.push('invalid phone number');
    }
    return {
      valid: valid,
      parsed: parsed,
      formatted: formatted,
      errors: errors
    };
  },
  ssnFormatter: function ssnFormatter(value) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var val,
        valid,
        parsed,
        formatted,
        errors = [];
    val = Formatters.stringFormatter(value, options);
    if (_.isEmpty(val.parsed)) return val;
    // remove all non-digits
    parsed = val.parsed.replace(/\D/g, '');
    valid = parsed.length === 9;
    if (valid) {
      formatted = parsed.replace(/^(\d{3})(\d{2})(\d{4})$/, "$1-$2-$3");
    } else {
      formatted = parsed;
      errors.push('invalid SSN');
    }
    return {
      valid: valid,
      parsed: parsed,
      formatted: formatted,
      errors: errors
    };
  },
  stateFormatter: function stateFormatter(value) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var val,
        valid,
        parsed,
        formatted,
        errors = [];
    val = Formatters.stringFormatter(value, options);
    if (_.isEmpty(val.parsed)) return val;
    // remove 0-9
    parsed = _.toUpper(val.parsed.replace(/\d/g, ''));
    valid = parsed.length === 2;
    if (valid) {
      formatted = parsed.replace(/^(\D{2})$/, "$1");
    } else {
      formatted = parsed;
      errors.push('invalid state');
    }
    return {
      valid: valid,
      parsed: parsed,
      formatted: formatted,
      errors: errors
    };
  },
  zipcodeFormatter: function zipcodeFormatter(value) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var val,
        valid,
        parsed,
        formatted,
        errors = [];
    val = Formatters.stringFormatter(value, options);
    if (_.isEmpty(val.parsed)) return val;
    // remove all non-digits
    parsed = val.parsed.replace(/\D/g, '');
    valid = parsed.length === 5;
    if (valid) {
      formatted = parsed.replace(/^(\d{5})$/, "$1");
    } else {
      formatted = parsed;
      errors.push('is invalid');
    }
    return {
      valid: valid,
      parsed: parsed,
      formatted: formatted,
      errors: errors
    };
  },


  // Currency formatting and validation.
  //
  // Options:
  //   * format - 'dollars' to suppress display of cents. 'cents' - default, full display.
  currencyFormatter: function currencyFormatter(value) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var val,
        numObj,
        valid,
        parsed,
        formatted,
        errors = [];
    val = Formatters.stringFormatter(value, options);
    if (_.isEmpty(val.parsed)) return val;
    options = _.merge({}, { format: 'cents' }, options);
    // remove '$', spaces and ','.
    // Using numeral, convert to a number.
    numObj = numeral(_.trim(val.parsed.replace(/[$\s,]/g, '')));
    parsed = numObj.value();
    // TODO: numeraljs does not throw errors.... we might want to think about
    // detecting our own?
    valid = true;
    if (options.format == 'dollars') formatted = numObj.format('$0,0');else formatted = numObj.format('$0,0.00');
    return {
      valid: valid,
      parsed: parsed,
      formatted: formatted,
      errors: errors
    };
  },
  dollarsFormatter: function dollarsFormatter(value) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    options['format'] = 'dollars';
    return Formatters.currencyFormatter(value, options);
  },


  // Date formatting and validation.
  //
  // Options:
  //  * format - 'full-date' for "MMM DD, YYYY". 'month-year' for "MMM YYYY"
  dateFormatter: function dateFormatter(value) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var val,
        temp,
        valid,
        parsed,
        formatted,
        errors = [];
    val = Formatters.stringFormatter(value, options);
    if (_.isEmpty(val.parsed)) return val;
    options = _.merge({}, { format: 'full-date' }, options);
    temp = this.parseDate(val.parsed);
    valid = temp.isValid();
    if (valid) {
      // store parsed value as just the date portion.
      parsed = temp.format('YYYY-MM-DD');
      if (options.format == 'month-year') formatted = temp.format(this.monthYearFormat);else formatted = temp.format(this.monthDayYearFormat);
    } else {
      errors.push('invalid date');
      formatted = value;
    }
    return {
      valid: valid,
      parsed: parsed,
      formatted: formatted,
      errors: errors
    };
  },


  // Time formatting and validation.
  //
  // Options:
  //   * format - 'full-date' for "MMM DD, YYYY". 'month-year' for "MMM YYYY"
  timeFormatter: function timeFormatter(value) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var val,
        temp,
        valid,
        parsed,
        formatted,
        errors = [];
    val = Formatters.stringFormatter(value, options);
    if (_.isEmpty(val.parsed)) return val;
    temp = moment(val.parsed, "hh:mm:ss a");
    valid = temp.isValid();
    if (valid) {
      formatted = temp.format(this.timeFormat);
      parsed = formatted;
    } else {
      errors.push('invalid time');
      formatted = value;
    }
    return {
      valid: valid,
      parsed: parsed,
      formatted: formatted,
      errors: errors
    };
  },
  ordinalFormatter: function ordinalFormatter(value) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var parsed,
        formatted,
        errors = [];
    // remove all non-digits

    var _stringFormatter = this.stringFormatter(value, options);

    var string = _stringFormatter.parsed;

    parsed = string.replace(/\D/g, '');
    // convert an empty string to a null
    if (_.isEmpty(parsed)) parsed = null;
    // if have a parsed value (not blank/empty)
    if (!_.isEmpty(parsed)) {
      formatted = this.ordinalize(parsed);
      // convert parsed value from string to integer storing the value as an
      // integer.
      parsed = parseInt(parsed);
    } else {
      formatted = parsed;
    }
    return {
      valid: true,
      parsed: parsed,
      formatted: formatted,
      errors: errors
    };
  },
  parseDate: function parseDate(date) {
    // Parse the date using supported formats. Deals with Firefox/Chrome
    // behavior differences with "new Date()" behavior. Specifically an issue
    // accepting "Dec 2014" as a date in Firefox. NOTE: This is not "strict"
    // formatting, so a "/" is also allowed as well as not full 2 digit months
    // or days, and with or without a comma.
    return moment(date, [
    // dates
    'MMDDYYYY', 'MMM YYYY', 'MMM DD YYYY', 'M-D-YYYY',
    // date times
    'YYYY-MM-DD h:mm a', 'MMM DD YYYY h:mm a', 'M-D-YYYY h:mm a', 'YYYY-MM-DD h:mm a',
    // date times with seconds
    'YYYY-MM-DD h:mm:ss a', 'MMM DD YYYY h:mm:ss a', 'M-D-YYYY h:mm:ss a', 'YYYY-MM-DD h:mm:ss a']);
  }
};

module.exports = Formatters;
});

;require.register("forms/address-us.js", function(exports, require, module) {
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

var ObsAddressUs = React.createClass({
  displayName: 'ObsAddressUs',

  propTypes: {
    object: React.PropTypes.object.isRequired,
    attr: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    onErrorChange: React.PropTypes.func,
    // errors are an object here (covers multiple fields)
    errors: React.PropTypes.object,
    label: React.PropTypes.string,
    hint: React.PropTypes.string,
    required: React.PropTypes.bool,
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
  componentDidMount: function componentDidMount() {
    if (_.isFunction(this.props.didMount)) this.props.didMount(this);
  },
  componentWillUnmount: function componentWillUnmount() {
    if (_.isFunction(this.props.willUnmount)) this.props.willUnmount(this);
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
        React.createElement(ObsText, { id: this.state.addressId,
          object: addrObject, attr: this.fields.street_1.attr, formatter: Formatters.stringFormatter,
          required: this.props.required, errors: this._getErrors(this.fields.street_1.attr),
          placeholder: "Address", onErrorChange: this._errorsChanged,
          onChange: _.bind(this._valueChanged, this), className: 'address-line-1' }),
        React.createElement(
          ObsCompoundLayout,
          { label: this.props.label, layout: "inline", className: this.props.className },
          React.createElement(
            'div',
            { className: 'flex-grow-shrink' },
            React.createElement(ObsText, { object: addrObject, attr: this.fields.city.attr, formatter: Formatters.stringFormatter,
              required: this.props.required, errors: this._getErrors(this.fields.city.attr),
              placeholder: "City", onErrorChange: this._errorsChanged,
              onChange: _.bind(this._valueChanged, this), className: 'address-city' })
          ),
          React.createElement(
            'div',
            { className: 'flex-static' },
            React.createElement(ObsText, { object: addrObject, attr: this.fields.state.attr, formatter: Formatters.stateFormatter,
              required: this.props.required, errors: this._getErrors(this.fields.state.attr),
              placeholder: "ST", onErrorChange: this._errorsChanged,
              onChange: _.bind(this._valueChanged, this), className: 'address-state state' })
          ),
          React.createElement(
            'div',
            { className: 'flex-static' },
            React.createElement(ObsText, { object: addrObject, attr: this.fields.zip.attr, formatter: Formatters.zipcodeFormatter,
              required: this.props.required, errors: this._getErrors(this.fields.zip.attr),
              placeholder: "Zip", onErrorChange: this._errorsChanged,
              onChange: _.bind(this._valueChanged, this), className: 'address-zipcode zipcode' })
          )
        )
      ),
      React.createElement(ObsError, { errors: this._errorsText() })
    );
  }
});

module.exports = ObsAddressUs;
});

;require.register("forms/checkbox.js", function(exports, require, module) {
'use strict';

var React = require('react');
var cx = require('classnames');
var _ = require('lodash');

var ObsError = require('./error');
var ObsRequiredMarker = require('./required-marker');
var ObsHint = require('./hint');

var ObsCheckbox = React.createClass({
  displayName: 'ObsCheckbox',

  propTypes: {
    value: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    label: React.PropTypes.string,
    hint: React.PropTypes.string,
    required: React.PropTypes.bool,
    className: React.PropTypes.string,
    id: React.PropTypes.string,
    errors: React.PropTypes.array, // array of strings
    didMount: React.PropTypes.func,
    willUnmount: React.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      required: false,
      errors: []
    };
  },
  getInitialState: function getInitialState() {
    return {
      checked: this.props.value
    };
  },
  componentDidMount: function componentDidMount() {
    if (_.isFunction(this.props.didMount)) this.props.didMount(this);
  },
  componentWillUnmount: function componentWillUnmount() {
    if (_.isFunction(this.props.willUnmount)) this.props.willUnmount(this);
  },
  _valueChanged: function _valueChanged(e) {
    this.setState({ checked: e.target.checked });
    if (_.isFunction(this.props.onChange)) this.props.onChange(e.target.checked);
  },
  render: function render() {
    var bootstrapClasses;
    bootstrapClasses = cx({
      "checkbox": true,
      "has-error": !_.isEmpty(this.props.errors)
    });

    return React.createElement(
      'div',
      { className: this.props.className },
      React.createElement(
        'div',
        { className: bootstrapClasses },
        React.createElement(
          'label',
          null,
          React.createElement('input', { type: 'checkbox', id: this.props.id, checked: this.state.checked, onChange: this._valueChanged }),
          this.props.label,
          React.createElement(ObsRequiredMarker, { required: this.props.required })
        ),
        React.createElement(ObsError, { errors: this.props.errors })
      ),
      React.createElement(ObsHint, { hint: this.props.hint })
    );
  }
});

module.exports = ObsCheckbox;
});

;require.register("forms/compound-layout.js", function(exports, require, module) {
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = require('react');
var cx = require('classnames');

var ObsCompoundLayout = React.createClass({
  displayName: 'ObsCompoundLayout',

  propTypes: {
    // layouts: 'inline', 'full'
    layout: React.PropTypes.string,
    className: React.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      layout: 'inline'
    };
  },
  render: function render() {
    var classes;
    classes = cx(_defineProperty({
      'compound-field': true,
      'form-group': true,
      'layout-full': this.props.layout === 'full',
      'layout-inline': this.props.layout === 'inline'
    }, this.props.className, true));

    return React.createElement(
      'div',
      { className: classes },
      React.createElement(
        'div',
        { className: 'children' },
        this.props.children
      )
    );
  }
});

module.exports = ObsCompoundLayout;
});

;require.register("forms/error.js", function(exports, require, module) {
'use strict';

var React = require('react');
var _ = require('lodash');

var ObsError = React.createClass({
  displayName: 'ObsError',

  propTypes: {
    errors: React.PropTypes.array
  },

  getDefaultProps: function getDefaultProps() {
    return {
      errors: []
    };
  },
  getErrorText: function getErrorText() {
    return this.props.errors.join(', ');
  },
  render: function render() {
    if (_.isEmpty(this.props.errors)) return React.createElement('noscript', null);
    return React.createElement(
      'div',
      { className: 'error error' },
      this.getErrorText()
    );
  }
});

module.exports = ObsError;
});

;require.register("forms/form-builder.js", function(exports, require, module) {
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');
var cx = require('classnames');
var ObsForm = require('./form');
var ObsLabel = require('./label');
var ObsError = require('./error');
var ObsTextarea = require('./textarea');
var ObsText = require('./text');
var ObsCheckbox = require('./checkbox');
var ObsCompoundLayout = require('./compound-layout');
var ObsAddressUs = require('./address-us');
var Formatters = require('../formatters/formatters');

// Expected errors format.
// errors: {
//   "person.name.first": ['Bad name']
//   "address.state": ['is required']
// }

var _getState = function _getState(parent, stateAttr) {
  return parent.state[stateAttr];
};

var _setState = function _setState(parent, stateAttr, newState) {
  parent.setState(_defineProperty({}, stateAttr, newState));
};

var FormBuilder = {

  // The FormBuilder does not maintain its own state.  Instead, you pass in a
  // reference (parent) that is maintaining state.  formStateAttr tells us where to
  // find the data in the parent's state.

  new: function _new(options) {
    var data = {
      parent: options.parent,
      formStateAttr: options.formStateAttr,
      errorStateAttr: options.errorStateAttr,
      onSubmit: options.onSubmit,
      onValueChange: options.onValueChange,
      onErrorChange: options.onErrorChange,
      onTouch: options.onTouch,
      inputs: [],
      data: function data() {
        return _getState(this.parent, this.formStateAttr);
      },
      errors: function errors() {
        return _getState(this.parent, this.errorStateAttr);
      },
      setData: function setData(data) {
        _setState(this.parent, this.formStateAttr, data);
        if (_.isFunction(this.onValueChange)) this.onValueChange(data);
      },
      setErrors: function setErrors(errors) {
        _setState(this.parent, this.errorStateAttr, errors);
        if (_.isFunction(this.onErrorChange)) this.onErrorChange();
      },

      // return if the form builder form is valid
      isValid: function isValid() {
        return _.isEmpty(this.errors());
      },

      // set the value for the attribute name.
      set: function set(attrName, value) {
        var state = this.data();
        _.set(state, attrName, value);
        this.setData(state);
      },

      // get the value for the attribute name.
      get: function get(attrName) {
        return _.get(this.data(), attrName);
      },
      onSubmit: function onSubmit(e) {
        // ask our components/inputs to report back their validation state -
        // usefull for inputs that have focus and that would not have reported
        // back validation
        var valid = _.reduce(this.inputs, function (valid, input) {
          if (!_.isEmpty(input.runValidations())) valid = false;
        }, true);

        // fire our own onSubmit callback
        if (_.isFunction(this.onSubmit)) this.onSubmit(e, valid, this);
      }
    };

    return _.extend({}, data, Components);
  }
};

var Components = {

  // alias Obs components to make using them easier
  form: ObsForm,
  compoundLayout: ObsCompoundLayout,
  label: ObsLabel,

  textareaField: function textareaField(label, attrName) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    return React.createElement(ObsTextarea, { label: label, hint: options.hint, required: options.required,
      value: this.get(attrName), rows: options.rows,
      className: options.className, id: options.id,
      onChange: _.bind(this._onChange, this, options, attrName),
      placeholder: options.placeholder, errors: this._getErrors(attrName),
      didMount: this._register, willUnmount: this._unregister });
  },
  formattedField: function formattedField(label, attrName, formatterFun) {
    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

    return React.createElement(ObsText, { label: label, hint: options.hint, required: options.required,
      object: this.data(), errors: this._getErrors(attrName), attr: attrName, formatter: formatterFun,
      className: options.className, id: options.id,
      onChange: _.bind(this._onChange, this, options),
      onErrorChange: _.bind(this._formatErrorChanged, this),
      placeholder: options.placeholder,
      didMount: this._register, willUnmount: this._unregister });
  },
  checkboxField: function checkboxField(label, attrName) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var options = this._mergeClasses(options, 'obs-checkbox');
    return React.createElement(ObsCheckbox, { label: label, hint: options.hint, required: options.required,
      value: !!this.get(attrName), errors: this._getErrors(attrName),
      className: options.className, id: options.id,
      onChange: _.bind(this._onChange, this, options, attrName),
      didMount: this._register, willUnmount: this._unregister });
  },
  textField: function textField(label, attrName) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    return this.formattedField(label, attrName, Formatters.stringFormatter, options);
  },
  phoneField: function phoneField(label, attrName) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    return this.formattedField(label, attrName, Formatters.phoneFormatter, this._mergeClasses(options, 'obs-phone'));
  },
  ssnField: function ssnField(label, attrName) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    return this.formattedField(label, attrName, Formatters.ssnFormatter, this._mergeClasses(options, 'obs-ssn'));
  },
  stateField: function stateField(label, attrName) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    return this.formattedField(label, attrName, Formatters.stateFormatter, this._mergeClasses(options, 'obs-state'));
  },
  zipcodeField: function zipcodeField(label, attrName) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    return this.formattedField(label, attrName, Formatters.zipcodeFormatter, this._mergeClasses(options, 'obs-zipcode'));
  },
  currencyField: function currencyField(label, attrName) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    return this.formattedField(label, attrName, Formatters.currencyFormatter, this._mergeClasses(options, 'obs-currency'));
  },
  dollarsField: function dollarsField(label, attrName) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    return this.formattedField(label, attrName, Formatters.dollarsFormatter, this._mergeClasses(options, 'obs-dollars'));
  },
  dateField: function dateField(label, attrName) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    // merge the requested format option in for the formatter
    var formatter = function formatter(value, opt) {
      return Formatters.dateFormatter(value, _.merge({}, opt, { format: options.format }));
    };
    return this.formattedField(label, attrName, formatter, this._mergeClasses(options, 'obs-date'));
  },
  timeField: function timeField(label, attrName) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    // merge the requested format option in for the formatter
    var formatter = function formatter(value, opt) {
      return Formatters.timeFormatter(value, _.merge({}, opt, { format: options.format }));
    };
    return this.formattedField(label, attrName, formatter, this._mergeClasses(options, 'obs-time'));
  },
  ordinalField: function ordinalField(label, attrName) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    return this.formattedField(label, attrName, Formatters.ordinalFormatter, this._mergeClasses(options, 'obs-ordinal'));
  },
  addressField: function addressField(label, attrName) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    return React.createElement(ObsAddressUs, { label: label, object: this.data(), attr: attrName, errors: this.errors(),
      required: options.required, hint: options.hint, className: options.className,
      onChange: _.bind(this._onChange, this, options),
      onErrorChange: _.bind(this._formatErrorChanged, this),
      didMount: this._register, willUnmount: this._unregister });
  },


  // private-like methods

  _mergeClasses: function _mergeClasses(options, classes) {
    options['className'] = cx(options['className'], classes);
    return options;
  },
  _onChange: function _onChange(options, attrName, value) {
    this.set(attrName, value);
    // if given an 'onChange' event in the options, fire it after setting the
    // value on the object. Pass the attrName after the value as it is
    // "optional". For complex inputs, it gives context to which part that
    // changed (like with an address).
    if (_.isFunction(options['onChange'])) options['onChange'](value, attrName);
  },
  _formatErrorChanged: function _formatErrorChanged(attrName, errors) {
    // either add or remove the errors stored for the attribute
    var storedErrors = this.errors();
    if (_.isEmpty(errors)) delete storedErrors[attrName];else storedErrors[attrName] = errors;
    this.setErrors(storedErrors);
  },
  _getErrors: function _getErrors(attrName) {
    return this.errors()[attrName];
  },
  _register: function _register(input) {
    if (!_.includes(this.inputs, input)) this.inputs.push(input);
  },
  _unregister: function _unregister(input) {
    this.inputs = _.without(this.inputs, input);
  }
};

module.exports = FormBuilder;
});

;require.register("forms/form.js", function(exports, require, module) {
"use strict";

var React = require('react');

var ObsForm = React.createClass({
  displayName: "ObsForm",

  propTypes: {
    onSubmit: React.PropTypes.func,
    builder: React.PropTypes.object
  },

  onSubmit: function onSubmit(e) {
    e.stopPropagation();
    e.preventDefault();
    if (_.isObject(this.props.builder)) {
      this.props.builder.onSubmit(e);
    } else if (_.isFunction(this.props.onSubmit)) {
      this.props.onSubmit(e);
    }
  },
  render: function render() {
    return React.createElement(
      "form",
      { className: "form", onSubmit: this.onSubmit },
      this.props.children
    );
  }
});

module.exports = ObsForm;
});

;require.register("forms/hint.js", function(exports, require, module) {
"use strict";

var React = require('react');

var ObsHint = React.createClass({
  displayName: "ObsHint",

  propTypes: {
    hint: React.PropTypes.string
  },

  render: function render() {
    if (!this.props.hint) return React.createElement("noscript", null);
    return React.createElement(
      "span",
      { className: "help-block" },
      this.props.hint
    );
  }
});

module.exports = ObsHint;
});

;require.register("forms/label.js", function(exports, require, module) {
'use strict';

var React = require('react');
var _ = require('lodash');
var ObsRequiredMarker = require('./required-marker');
var ObsHint = require('./hint');

var ObsLabel = React.createClass({
  displayName: 'ObsLabel',

  propTypes: {
    text: React.PropTypes.string,
    hint: React.PropTypes.string,
    required: React.PropTypes.bool,
    htmlFor: React.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      required: false
    };
  },
  somethingToRender: function somethingToRender() {
    return !_.isEmpty(this.props.text) || !_.isEmpty(this.props.hint);
  },
  render: function render() {
    if (!this.somethingToRender()) return React.createElement('noscript', null);
    return React.createElement(
      'label',
      { className: 'control-label', htmlFor: this.props.htmlFor },
      this.props.text,
      React.createElement(ObsRequiredMarker, { required: this.props.required }),
      React.createElement(ObsHint, { hint: this.props.hint })
    );
  }
});

module.exports = ObsLabel;
});

;require.register("forms/required-marker.js", function(exports, require, module) {
"use strict";

var React = require('react');

var ObsRequiredMarker = React.createClass({
  displayName: "ObsRequiredMarker",

  propTypes: {
    required: React.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      required: false
    };
  },
  render: function render() {
    if (!this.props.required) return React.createElement("noscript", null);
    return React.createElement(
      "span",
      { "aria-hidden": "true", className: "required_marker", title: "Required Field" },
      "*"
    );
  }
});

module.exports = ObsRequiredMarker;
});

;require.register("forms/text.js", function(exports, require, module) {
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = require('react');
var cx = require('classnames');
var _ = require('lodash');

var ObsLabel = require('./label');
var ObsError = require('./error');
var Formatters = require('../formatters/formatters');

var ObsText = React.createClass({
  displayName: 'ObsText',

  propTypes: {
    object: React.PropTypes.object.isRequired,
    errors: React.PropTypes.array,
    attr: React.PropTypes.string.isRequired,
    formatter: React.PropTypes.func,
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    label: React.PropTypes.string,
    hint: React.PropTypes.string,
    required: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    didMount: React.PropTypes.func,
    willUnmount: React.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      required: false,
      errors: [],
      id: _.uniqueId('text_'),
      formatter: Formatters.requiredFormatter
    };
  },
  getInitialState: function getInitialState() {
    var result = this.props.formatter(this.value(), { required: this.props.required });
    return _.pick(result, ['parsed', 'formatted']);
  },
  componentDidMount: function componentDidMount() {
    if (_.isFunction(this.props.didMount)) this.props.didMount(this);
  },
  componentWillUnmount: function componentWillUnmount() {
    if (_.isFunction(this.props.willUnmount)) this.props.willUnmount(this);
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    // if the props value changes out from under us (if the form is saved for
    // example and the server returns a new value), update our state with the
    // new value
    var nextValue = _.get(nextProps.object, nextProps.attr);
    if (nextValue !== this.state.parsed) var result = this.props.formatter(nextValue, { required: nextProps.required });
    this.setState(_.pick(result, ['parsed', 'formatted']));
  },
  value: function value() {
    return _.get(this.props.object, this.props.attr);
  },
  runValidations: function runValidations() {
    // If valid, display the newly formatted value. Otherwise, continue to
    // display the value the user entered.
    var result = this.props.formatter(this.state.formatted, { required: this.props.required });
    if (result.valid) this.setState({ formatted: result.formatted });
    this.updateFormatErrors(result.errors);
    return result.errors;
  },


  // forward the new errors along to the form builder
  updateFormatErrors: function updateFormatErrors(newErrors) {
    if (_.isFunction(this.props.onErrorChange)) this.props.onErrorChange(this.props.attr, newErrors);
  },
  onChange: function onChange(e) {
    // parse the newValue using the formatter
    var newValue = e.target.value;

    var _props$formatter = this.props.formatter(newValue);

    var parsed = _props$formatter.parsed;
    // update the state with the new parsed value but display what the user
    // entered unmodified

    this.setState({ parsed: parsed, formatted: newValue });
    // clear out any errors we might have
    this.updateFormatErrors(null);
    // finally, forward on the change event so we can update the form builder
    if (_.isFunction(this.props.onChange)) this.props.onChange(this.props.attr, parsed);
  },
  onBlur: function onBlur() {
    this.runValidations();
    // forward the event
    if (_.isFunction(this.props.onBlur)) this.props.onBlur();
  },
  render: function render() {
    var groupClasses = cx(_defineProperty({
      "form-group": true,
      "has-error": !_.isEmpty(this.props.errors)
    }, this.props.className, true));

    return React.createElement(
      'div',
      { className: groupClasses },
      React.createElement(ObsLabel, { text: this.props.label, hint: this.props.hint, htmlFor: this.props.id,
        required: this.props.required }),
      React.createElement('input', { id: this.props.id, className: 'form-control', type: 'text', value: this.state.formatted,
        placeholder: this.props.placeholder,
        onChange: this.onChange, onBlur: this.onBlur }),
      React.createElement(ObsError, { errors: this.props.errors })
    );
  }
});

module.exports = ObsText;
});

;require.register("forms/textarea.js", function(exports, require, module) {
'use strict';

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
    errors: React.PropTypes.array, // array of strings
    didMount: React.PropTypes.func,
    willUnmount: React.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      required: false,
      rows: 3
    };
  },
  componentDidMount: function componentDidMount() {
    if (_.isFunction(this.props.didMount)) this.props.didMount(this);
  },
  componentWillUnmount: function componentWillUnmount() {
    if (_.isFunction(this.props.willUnmount)) this.props.willUnmount(this);
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
});

;require.register("obs_utils.js", function(exports, require, module) {
'use strict';

window.OBSUtils = {
  Forms: {
    FormBuilder: require('./forms/form-builder'),
    AddressUS: require('./forms/address-us'),
    CompoundLayout: require('./forms/compound-layout'),
    Error: require('./forms/error'),
    Form: require('./forms/form'),
    FormattedText: require('./forms/text'),
    Hint: require('./forms/hint'),
    Label: require('./forms/label'),
    RequiredMarker: require('./forms/required-marker'),
    Text: require('./forms/text'),
    Textarea: require('./forms/textarea')
  },
  Formatters: require("./formatters/formatters")
};
});

;require('obs_utils');
//# sourceMappingURL=obs_utils.js.map