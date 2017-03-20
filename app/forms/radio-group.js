const React    = require('react')
const ReactDOM = require('react-dom')
const cx       = require('classnames')
const _        = require('lodash')
import $ from 'jquery';

const ObsLabel   = require('./label')
const ObsError   = require('./error')

const ObsRadioGroup = React.createClass({
  propTypes: {
    value:            React.PropTypes.string,
    defaultValue:     React.PropTypes.string,
    options:          React.PropTypes.array,
    errors:           React.PropTypes.array,
    id:               React.PropTypes.string,
    className:        React.PropTypes.string,
    autoFocus:        React.PropTypes.bool,
    label:            React.PropTypes.string,
    hint:             React.PropTypes.string,
    required:         React.PropTypes.bool,
    customValidator:  React.PropTypes.func,
    onChange:         React.PropTypes.func,
    onBlur:           React.PropTypes.func,
    didMount:         React.PropTypes.func,
    willUnmount:      React.PropTypes.func
  },

  getDefaultProps() {
    return {
      defaultValue: "",
      required: false,
      autoFocus: false,
      options: [],
      errors:   []
    }
  },

  getInitialState() {
    return {
      id: this.props.id || _.uniqueId('radio_group_'),
    }
  },

  componentDidMount() {
    // register this component with the formBuilder to aid with form validation
    // before submission (so that fields with focus can still be validated
    // instead of having to wait for a blur even to validate)
    if (_.isFunction(this.props.didMount))
      this.props.didMount(this)

    // nothing left to do if there isn't an onChange to call
    if (!_.isFunction(this.props.onChange))
      return

    // If props.value is nil (undefined or null), fall back to
    // props.defaultValue and submit the formatted and parsed defaultValue back
    // to the formBuilder so we can be rendered again with a valid value in our
    // props.
    //
    // A defaultValue that responds to _.isNil will result in an infinate loop.
    // So check that the defaultValue will not respond to isNil before
    // submitting a new value for props.value.
    if (_.isNil(this.props.value) && !_.isNil(this.props.defaultValue)) {
      var {valid: valid, parsed: parsed, formatted: formatted} = this.formatAndValidate(this.props.defaultValue)
      if(valid) {
        this.props.onChange({formatted, parsed})
      }
    } else {
      var {valid: valid, formatted: formatted} = this.formatAndValidate(this.props.value)
      if(valid) {
        this.props.onChange({formatted})
      }
    }
  },

  componentWillUnmount() {
    if (_.isFunction(this.props.willUnmount))
      this.props.willUnmount(this)
  },

  componentWillReceiveProps(newProps) {
    var currentValue = $(`#${this.state.id} input:checked`).val();

    if (newProps.value !== currentValue && _.isFunction(this.props.onChange)) {
      var result = this.formatAndValidate(newProps.value)
      if (result.valid)
        this.props.onChange(result.formatted)
    }
  },

  runValidations() {
    this.onBlur()
  },

  onChange(e) {
    if (_.isFunction(this.props.onChange))
      this.props.onChange(this.formatAndValidate(e.target.value))
  },

  onBlur() {
    if(_.isFunction(this.props.onBlur)) {
      this.props.onBlur(this.formatAndValidate(this.props.value))
    }
  },

  formatAndValidate(value) {
    var formatted, parsed, errors = []

    // rewrite "blank" values as null
    if (_.isNil(value))
      value = null;
    if (_.isEmpty(value))
      value = null;

    // both formatted and parsed values are the same.  This is by design to
    // simplify things.  Otherwise, the value props would have to be able to
    // accept the formatted or parsed value as valid input.
    formatted = value;
    parsed = value;

    // check for required
    if (this.props.required && _.isNull(parsed)) {
      errors.push('is required');
    }

    // check for inclusion in the list of options, but only if there wasn't a
    // requirement error first
    if (_.isEmpty(errors)) {
      var allowedValues = _.map(this.props.options, "value")
      if (!_.includes(allowedValues, value)) {
        errors.push('invalid value');
        parsed = null;
      }
    }

    return {
      valid: errors.length === 0,
      parsed,
      formatted,
      errors
    }
  },

  render() {
    var groupClasses = cx({
      "form-group": true,
      "has-error":  !_.isEmpty(this.props.errors),
      [ this.props.className ]: _.isString(this.props.className)
    })

    var options = _.map(this.props.options, (option, i) => {
      // give the radio input an id of "id[value]".  So if the id was
      // "some_radio_group" and the value was "red" the resulting id will be
      // "some_radio_group[red]"
      var id = `${this.state.id}[${option.value}]`;
      return (
        <div className="radio" key={i}>
          <label>
            <input type="radio" id={id} value={option.value} checked={option.value === this.props.value} onChange={this.onChange} onBlur={this.onBlur} autoFocus={this.props.autoFocus} />
            {option.name}
          </label>
        </div>
      )
    })

    return (
      <div className={groupClasses} id={this.state.id}>
        <ObsLabel text={this.props.label} hint={this.props.hint} htmlFor={this.state.id} required={this.props.required} />
        {options}
        <ObsError errors={this.props.errors} />
      </div>
    )
  }
})

module.exports = ObsRadioGroup
