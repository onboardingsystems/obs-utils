const _       = require('lodash')
const moment  = require('moment')
const numeral = require('numeral')

const Formatters = {

  addressLines(addressObj) {
    if (_.isEmpty(_.omitBy(addressObj, _.isEmpty)))
      return []
    var line1 = addressObj.street_1
    var line2 = null
    var line3 = `${addressObj.city}, ${addressObj.state} ${addressObj.zip}`
    return _.compact(_.concat([], line1, line2, line3))
  },

  addressOneLine(addressObj) {
    if (_.isEmpty(_.omitBy(addressObj, _.isEmpty)))
      return ''
    return this.addressLines(addressObj).join(', ')
  },

  currencyDisplay(value, format='dollars') {
    var numObj
    numObj = numeral(value)
    if (format === 'dollars')
      return numObj.format('$0,0')
    else
      return numObj.format('$0,0.00')
  },

  ordinalize(value) {
    var ordinal, last_2
    value = (value || "").toString()
    if (_.isEmpty(value))
      return ''
    // check what digit the number ends with for choosing the correct text
    // ending
    switch (value.charAt(value.length - 1)) {
      case '1':
        ordinal = 'st'
        break;
      case '2':
        ordinal = 'nd'
        break;
      case '3':
        ordinal = 'rd'
        break;
      default:
        ordinal = 'th'
    }
    // address some exceptions when looking at larger portion
    last_2 = value.slice(-2)
    if (last_2 == '11' || last_2 == '12' || last_2 == '13')
      ordinal = 'th'

    return value + ordinal
  },

  // ########
  //
  timeFormat:         'h:mm a',
  // Standard Date Formatter (ex: Jun 3, 2014) - uses locale settings
  dateFormat:         'll',
  dollarsFormat:      '$0,0',
  dollarsCentsFormat: '$0,0.00',
  monthYearFormat:    'MMM YYYY',
  monthDayYearFormat: 'MMM D, YYYY',
  // Default detailed date/time display format
  dateTimeDetailedFormat: 'MMM DD, YYYY  h:mm:ss a',


  // Relative language description of the date/time (ex: "3 days ago", "seconds ago")
  timeAgoDisplay(value) {
    if (_.isEmpty(value))
      return null
    return this.parseDate(value).fromNow()
  },


  // Standard Date and Time Formatter (ex: Jun 3, 2014 3:05:53 p)
  datetimeDisplay(value) {
    if (_.isEmpty(value))
      return null
    return this.parseDate(value).format(this.dateTimeDetailedFormat)
  },


  requiredFormatter(value, options={}) {
    var options = _.merge({}, {required: false}, options)
    var errors = []

    // react inputs don't like null values - otherwise they are considered
    // uncontrolled inputs and we want controlled inputs.  So all formatters
    // must at least return an empty string.
    if (_.isNil(value))
      value = ""

    if (options.required && _.isEmpty(value))
      errors.push('is required')
    return {
      valid: errors.length === 0,
      value: value,
      errors
    }
  },


  stringFormatter(value, options={}) {
    var options = _.merge({}, {required: false}, options)
    var parsed, formatted, errors = []

    if (_.isNumber(value))
      value = value.toString()
    if (_.isEmpty(value))
      value = ""
    parsed = _.trim(value.toString())
    if (options.required && _.isEmpty(parsed))
      errors.push('is required')
    return {
      valid: errors.length === 0,
      parsed,
      formatted: parsed,
      errors
    }
  },

  phoneFormatter(value, options={}) {
    var val, valid, parsed, formatted, errors = []
    val = Formatters.stringFormatter(value, options)
    if (_.isEmpty(val.parsed))
      return val
    // remove all non-digits
    parsed = val.parsed.replace(/\D/g, '')
    valid = parsed.length === 10
    if (valid) {
      formatted = parsed.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
    } else {
      formatted = parsed
      errors.push('invalid phone number')
    }
    return {
      valid,
      parsed,
      formatted,
      errors
    }
  },

  emailFormatter(value, options={}) {
    var val, emailRegex, valid, errors = []
    val = Formatters.stringFormatter(value, options)
    if (_.isEmpty(val.parsed))
      return val
    var {formatted: formatted, parsed: parsed} = val
    // check that it matches our regex for a email
    emailRegex = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]+$/
    if (valid = emailRegex.test(formatted))
      parsed = formatted
    else
      errors.push('invalid email')
    return {
      valid,
      parsed,
      formatted,
      errors
    }
  },

  ssnFormatter(value, options={}) {
    var val, valid, parsed, formatted, errors = []
    val = Formatters.stringFormatter(value, options)
    if (_.isEmpty(val.parsed))
      return val
    // remove all non-digits
    parsed = val.parsed.replace(/\D/g, '')
    valid = parsed.length === 9
    if (valid) {
      formatted = parsed.replace(/^(\d{3})(\d{2})(\d{4})$/, "$1-$2-$3")
    } else {
      formatted = parsed
      errors.push('invalid SSN')
    }
    return {
      valid,
      parsed,
      formatted,
      errors
    }
  },

  stateFormatter(value, options={}) {
    var val, valid, parsed, formatted, errors = []
    val = Formatters.stringFormatter(value, options)
    if (_.isEmpty(val.parsed))
      return val
    // remove 0-9
    parsed = _.toUpper(val.parsed.replace(/\d/g, ''))
    valid = parsed.length === 2
    if (valid) {
      formatted = parsed.replace(/^(\D{2})$/, "$1")
    } else {
      formatted = parsed
      errors.push('invalid state')
    }
    return {
      valid,
      parsed,
      formatted,
      errors
    }
  },

  zipcodeFormatter(value, options={}) {
    var val, valid, parsed, formatted, errors = []
    val = Formatters.stringFormatter(value, options)
    if (_.isEmpty(val.parsed))
      return val
    // remove all non-digits
    parsed = val.parsed.replace(/\D/g, '')
    valid = parsed.length === 5
    if (valid) {
      formatted = parsed.replace(/^(\d{5})$/, "$1")
    } else {
      formatted = parsed
      errors.push('is invalid')
    }
    return {
      valid,
      parsed,
      formatted,
      errors
    }
  },

  // Currency formatting and validation.
  //
  // Options:
  //   * format - 'dollars' to suppress display of cents. 'cents' - default, full display.
  currencyFormatter(value, options={}) {
    var val, numObj, valid, parsed, formatted, errors = []
    val = Formatters.stringFormatter(value, options)
    if (_.isEmpty(val.parsed))
      return val
    options = _.merge({}, {format: 'cents'}, options)
    // remove '$', spaces and ','.
    // Using numeral, convert to a number.
    numObj = numeral(_.trim(val.parsed.replace(/[$\s,]/g, '')))
    parsed = numObj.value()
    // TODO: numeraljs does not throw errors.... we might want to think about
    // detecting our own?
    valid = true
    if (options.format == 'dollars')
      formatted = numObj.format('$0,0')
    else
      formatted = numObj.format('$0,0.00')
    return {
      valid,
      parsed,
      formatted,
      errors
    }
  },

  dollarsFormatter(value, options={}) {
    options['format'] = 'dollars'
    return Formatters.currencyFormatter(value, options)
  },

  // Date formatting and validation.
  //
  // Options:
  //  * format - 'full-date' for "MMM DD, YYYY". 'month-year' for "MMM YYYY"
  dateFormatter(value, options={}) {
    var val, temp, valid, parsed, formatted, errors = []
    val = Formatters.stringFormatter(value, options)
    if (_.isEmpty(val.parsed))
      return val
    options = _.merge({}, {format: 'full-date'}, options)
    temp = this.parseDate(val.parsed)
    valid = temp.isValid()
    if (valid) {
      // store parsed value as just the date portion.
      parsed = temp.format('YYYY-MM-DD')
      if (options.format == 'month-year')
        formatted = temp.format(this.monthYearFormat)
      else
        formatted = temp.format(this.monthDayYearFormat)
    } else {
      errors.push('invalid date')
      formatted = value
    }
    return {
      valid,
      parsed,
      formatted,
      errors
    }
  },

  // Time formatting and validation.
  //
  // Options:
  //   * format - 'full-date' for "MMM DD, YYYY". 'month-year' for "MMM YYYY"
  timeFormatter(value, options={}) {
    var val, temp, valid, parsed, formatted, errors = []
    val = Formatters.stringFormatter(value, options)
    if (_.isEmpty(val.parsed))
      return val
    temp = moment(val.parsed, "hh:mm:ss a")
    valid = temp.isValid()
    if (valid) {
      formatted = temp.format(this.timeFormat)
      parsed    = formatted
    } else {
      errors.push('invalid time')
      formatted = value
    }
    return {
      valid,
      parsed,
      formatted,
      errors
    }
  },

  ordinalFormatter(value, options={}) {
    var parsed, formatted, errors = []
    // remove all non-digits
    var {parsed: string} = Formatters.stringFormatter(value, options)
    parsed = string.replace(/\D/g, '')
    // convert an empty string to a null
    if (_.isEmpty(parsed))
      parsed = null
    // if have a parsed value (not blank/empty)
    if (!_.isEmpty(parsed)) {
      formatted = Formatters.ordinalize(parsed)
      // convert parsed value from string to integer storing the value as an
      // integer.
      parsed = parseInt(parsed)
    } else {
      formatted = parsed
    }
    return {
      valid: true,
      parsed,
      formatted,
      errors
    }
  },

  parseDate(date) {
    // Parse the date using supported formats. Deals with Firefox/Chrome
    // behavior differences with "new Date()" behavior. Specifically an issue
    // accepting "Dec 2014" as a date in Firefox. NOTE: This is not "strict"
    // formatting, so a "/" is also allowed as well as not full 2 digit months
    // or days, and with or without a comma.
    return moment(date, [
      // dates
      'MMDDYYYY',
      'MMM YYYY',
      'MMM DD YYYY',
      'M-D-YYYY',
      // date times
      'YYYY-MM-DD h:mm a',
      'MMM DD YYYY h:mm a',
      'M-D-YYYY h:mm a',
      'YYYY-MM-DD h:mm a',
      // date times with seconds
      'YYYY-MM-DD h:mm:ss a',
      'MMM DD YYYY h:mm:ss a',
      'M-D-YYYY h:mm:ss a',
      'YYYY-MM-DD h:mm:ss a'
    ])
  }
}

module.exports = Formatters
