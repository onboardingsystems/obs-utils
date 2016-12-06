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
    var parsed,
        formatted,
        errors = [];

    // react inputs don't like null values - otherwise they are considered
    // uncontrolled inputs and we want controlled inputs.  So all formatters
    // must at least return an empty string.
    if (_.isNil(value)) {
      formatted = "";
    } else {
      formatted = value;
    }

    if (options.required && _.isEmpty(value.toString().trim())) {
      parsed = null;
      errors.push('is required');
    } else {
      parsed = formatted;
    }
    return {
      valid: errors.length === 0,
      parsed: parsed,
      formatted: formatted,
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
    formatted = parsed = _.trim(value.toString());
    if (options.required && _.isEmpty(parsed)) {
      parsed = null;
      errors.push('is required');
    }
    return {
      valid: errors.length === 0,
      parsed: parsed,
      formatted: formatted,
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
      parsed = null;
      errors.push('invalid phone number');
    }
    return {
      valid: valid,
      parsed: parsed,
      formatted: formatted,
      errors: errors
    };
  },
  emailFormatter: function emailFormatter(value) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var val,
        emailRegex,
        valid,
        errors = [];
    val = Formatters.stringFormatter(value, options);
    if (_.isEmpty(val.parsed)) return val;
    var _val = val;
    var formatted = _val.formatted;
    var parsed = _val.parsed;
    // check that it matches our regex for a email

    emailRegex = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]+$/;
    if (valid = emailRegex.test(formatted)) {
      parsed = formatted;
    } else {
      parsed = null;
      errors.push('invalid email');
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
      parsed = null;
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
    // TODO: compare against a list of known states?
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
      parsed = null;
      errors.push('is invalid');
    }
    return {
      valid: valid,
      parsed: parsed,
      formatted: formatted,
      errors: errors
    };
  },
  numberFormatter: function numberFormatter(value) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var val,
        numObj,
        valid,
        parsed,
        errors = [];
    val = Formatters.stringFormatter(value, options);
    if (_.isEmpty(val.parsed)) return val;
    numObj = numeral(_.trim(val.parsed.replace(/[$\s,]/g, '')));
    parsed = numObj.value();
    // TODO: numeraljs does not throw errors.... we might want to think about
    // detecting our own?
    valid = true;
    var formatted = numObj.format('0,0');
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
    if (!val.valid) return val;
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
      parsed = null;
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
    if (!val.valid) return val;
    temp = moment(val.parsed, "hh:mm:ss a");
    valid = temp.isValid();
    if (valid) {
      formatted = temp.format(this.timeFormat);
      parsed = formatted;
    } else {
      errors.push('invalid time');
      formatted = value;
      parsed = null;
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

    var val,
        parsed,
        formatted,
        errors = [];
    // remove all non-digits
    var val = Formatters.stringFormatter(value, options);
    if (!val.valid) {
      return val;
    }
    formatted = val.parsed.replace(/\D/g, '');
    // if have a parsed value (not blank/empty)
    if (!_.isEmpty(formatted)) {
      parsed = parseInt(formatted);
      formatted = Formatters.ordinalize(formatted);
    } else {
      errors.push('is invalid');
      formatted = val.parsed;
      parsed = null;
    }
    return {
      valid: errors.length === 0,
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
    'MMDDYYYY', 'MMM YYYY', 'MMM DD YYYY', 'M-D-YYYY', 'YYYY-M-D',
    // date times
    'YYYY-MM-DD h:mm a', 'MMM DD YYYY h:mm a', 'M-D-YYYY h:mm a', 'YYYY-MM-DD h:mm a',
    // date times with seconds
    'YYYY-MM-DD h:mm:ss a', 'MMM DD YYYY h:mm:ss a', 'M-D-YYYY h:mm:ss a', 'YYYY-MM-DD h:mm:ss a']);
  }
};

module.exports = Formatters;