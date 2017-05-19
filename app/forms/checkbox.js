import React from 'react';
import cx    from 'classnames';
import _     from 'lodash';
import PropTypes from 'prop-types';

import ObsError          from './error';
import ObsRequiredMarker from './required-marker';
import ObsHint           from './hint';

class ObsCheckbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: props.value
    };

    this._valueChanged = this._valueChanged.bind(this);
    this.runValidations = this.runValidations.bind(this);
    this.value = this.value.bind(this);
  }

  componentDidMount() {
    // register this component with the formBuilder to aid with form validation
    // before submission (so that fields with focus can still be validated
    // instead of having to wait for a blur even to validate)
    if (_.isFunction(this.props.didMount))
      this.props.didMount(this)

    // nothing left to do if there isn't an onChange to call
    if (!_.isFunction(this.props.onChange))
      return

    // If props.value isn't a boolean value, fall back to the defaultValue and
    // submit it back to the formBuilder so we can be rendered again with a
    // valid value in our props.
    //
    // A defaultValue that isn't a boolean will result in an infinate loop. So
    // check defaultValue before submitting a new value for props.value.
    if (!_.isBoolean(this.props.value) && _.isBoolean(this.props.defaultValue)) {
      this.props.onChange({
        formatted: this.props.defaultValue,
        parsed:    this.props.defaultValue
      })
    }
  }

  componentWillUnmount() {
    if (_.isFunction(this.props.willUnmount))
      this.props.willUnmount(this)
  }

  _valueChanged(e) {
    var value = e.target.checked
    this.setState({checked: value})
    if (_.isFunction(this.props.onChange))
      this.props.onChange(value)
    if (_.isFunction(this.props.onBlur))
      this.props.onBlur({valid: true, parsed: value, formatted: value, errors: []})
  }

  runValidations() {}

  // having a value of null can be bad for our controlled inputs, even if for a
  // little while.  So since our defaultValue doesn't kick in right away we
  // still need something here to help prevent bad values from being rendered.
  value() {
    if (_.isBoolean(this.props.value)) {
      return this.props.value
    } else {
      return false
    }
  }

  render() {
    var bootstrapClasses = cx({
      "checkbox": true,
      "has-error":  !_.isEmpty(this.props.errors)
    });

    return (
      <div className={this.props.className}>
        <div className={bootstrapClasses}>
          <label>
            <input type="checkbox" id={this.props.id} checked={this.value()} onChange={this._valueChanged} />
            {this.props.label}
            <ObsRequiredMarker required={this.props.required} />
          </label>
          <ObsError errors={this.props.errors} />
        </div>
        <ObsHint hint={this.props.hint} />
      </div>
    )
  }
}

ObsCheckbox.defaultProps = {
  defaultValue: false,
  required: false,
  errors:   []
};

ObsCheckbox.propTypes = {
  value:        PropTypes.bool,
  defaultValue: PropTypes.bool,
  onChange:     PropTypes.func,
  onBlur:       PropTypes.func,
  label:        PropTypes.string,
  hint:         PropTypes.string,
  required:     PropTypes.bool,
  className:    PropTypes.string,
  id:           PropTypes.string,
  errors:       PropTypes.array,   // array of strings
  didMount:     PropTypes.func,
  willUnmount:  PropTypes.func
};


module.exports = ObsCheckbox;
