import React from 'react';
import cx    from 'classnames';
import _     from 'lodash';
import PropTypes from 'prop-types';

import Formatters from '../formatters/formatters';

import ObsCompoundLayout from './compound-layout';
import ObsText           from './text';
import ObsLabel          from './label';
import ObsHint           from './hint';
import ObsError          from './error';

class ObsAddressUs extends React.Component {
  constructor(props) {
    super(props);

    this.fields = {
      street_1: {name: 'Address', attr: 'street_1'},
      city:     {name: 'City',    attr: 'city'},
      state:    {name: 'State',   attr: 'state'},
      zip:      {name: 'Zip',     attr: 'zip'}
    };

    this.inputs = [];

    this.state = {
      id: props.id ||  _.uniqueId('address_'),
    }

    this._address_attrs = this._address_attrs.bind(this);
    this._addressErrors = this._addressErrors.bind(this);
    this._fullAttrName = this._fullAttrName.bind(this);
    this.errorsWithLabelNames = this.errorsWithLabelNames.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.runValidations = this.runValidations.bind(this);
    this.register = this.register.bind(this);
    this.unregister = this.unregister.bind(this);
    this.classesForAttr = this.classesForAttr.bind(this);
  }

  componentDidMount() {
    if (_.isFunction(this.props.didMount))
      this.props.didMount(this)
  }

  componentWillUnmount() {
    if (_.isFunction(this.props.willUnmount))
      this.props.willUnmount(this)
  }

  // returns a list of fully qualified address attributes (such as address.city
  // and address.zip)
  _address_attrs() {
    var list = []
    _.forOwn(this.fields, (field, value)=> {
      list.push(this._fullAttrName(field.attr))
    })
    return list
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
  _addressErrors() {
    var addressErrors, result = {}
    addressErrors = _.pick(this.props.errors, this._address_attrs())
    _.forOwn(this.fields, (value, field)=> {
      var errors = addressErrors[this._fullAttrName(value.attr)]
      if (!_.isEmpty(errors))
        result[value.attr] = errors
    })
    return result
  }

  // converts the partial field names into fully qualified names
  _fullAttrName(attr) {
    return `${this.props.attr}.${attr}`
  }

  errorsWithLabelNames() {
    return _.reduce(this._addressErrors(), (acc, errors, attr)=> {
      _.forEach(errors, (error)=> {
        acc.push(`${this.fields[attr].name} ${error}`)
      })
      return acc
    }, [])
  }

  onChange(attr, value) {
    // Fire onChange event for the full attribute name
    if (_.isFunction(this.props.onChange))
      this.props.onChange(this._fullAttrName(attr), value)
  }

  onBlur(attr, results) {
    // since the input is already returning the results of the formatter, we
    // don't need to call the formetter here.  We only need to convert the
    // attribute name to a fully qualified name
    if (_.isFunction(this.props.onBlur))
      this.props.onBlur(this._fullAttrName(attr), results)
  }

  // run through validations on each input
  runValidations() {
    var errors = _.reduce(this.inputs, (errors, input)=> {
      return _.concat(errors, input.runValidations())
    }, [])
    return errors
  }

  register(input) {
    this.inputs = _.concat(this.inputs, input)
  }

  unregister(input) {
    this.inputs = _.without(this.inputs, input)
  }

  classesForAttr(attr, classes="") {
    return cx({
      [classes]: _.isString(classes),
      "has-error": !_.isEmpty(this._addressErrors()[attr])
    })
  }

  render() {
    var valueFor = (attr)=> { return _.get((this.props.value || {}), attr) }
    var classes = cx({
      'address-us': true,
      'form-group': true,
      'has-child-error': !_.isEmpty(this.errorsWithLabelNames()),
      [ this.props.className ]: _.isString(this.props.className)
    })

    return (
      <div className={classes}>
        <ObsLabel text={this.props.label} required={this.props.required} htmlFor={this.state.id} />
        <ObsHint  hint={this.props.hint} />
        <ObsCompoundLayout layout={"full"}>
          <ObsText id={this.state.id}
            value={valueFor(this.fields.street_1.attr)} errors={[]}
            required={this.props.required} formatter={Formatters.stringFormatter}
            placeholder={"Address"}
            className={this.classesForAttr(this.fields.street_1.attr, "address-line-1")}
            onChange={_.bind(this.onChange, this, this.fields.street_1.attr)}
            onBlur={_.bind(this.onBlur, this, this.fields.street_1.attr)}
            didMount={this.register} willUnmount={this.unregister}
            autoFocus={this.props.autoFocus} customValidator={this.props.streetCustomValidator}/>

          <ObsCompoundLayout layout={"inline"}>
            <div className="flex-grow-shrink">
              <ObsText
                value={valueFor(this.fields.city.attr)} errors={[]}
                required={this.props.required} formatter={Formatters.stringFormatter}
                placeholder={"City"}
                className={this.classesForAttr(this.fields.city.attr, "address-city")}
                onChange={_.bind(this.onChange, this, this.fields.city.attr)}
                onBlur={_.bind(this.onBlur, this, this.fields.city.attr)}
                didMount={this.register} willUnmount={this.unregister} customValidator={this.props.cityCustomValidator}/>
            </div>
            <div className="flex-static">
              <ObsText
                value={valueFor(this.fields.state.attr)} errors={[]}
                required={this.props.required} formatter={Formatters.stateFormatter}
                placeholder={"ST"}
                className={this.classesForAttr(this.fields.state.attr, "address-state state")}
                onChange={_.bind(this.onChange, this, this.fields.state.attr)}
                onBlur={_.bind(this.onBlur, this, this.fields.state.attr)}
                didMount={this.register} willUnmount={this.unregister} customValidator={this.props.stateCustomValidator}/>
            </div>
            <div className="flex-static">
              <ObsText
                value={valueFor(this.fields.zip.attr)} errors={[]}
                required={this.props.required} formatter={Formatters.zipcodeFormatter}
                placeholder={"Zip"}
                className={this.classesForAttr(this.fields.zip.attr, "address-zipcode zipcode")}
                onChange={_.bind(this.onChange, this, this.fields.zip.attr)}
                onBlur={_.bind(this.onBlur, this, this.fields.zip.attr)}
                didMount={this.register} willUnmount={this.unregister} customValidator={this.props.zipCustomValidator}/>
            </div>
          </ObsCompoundLayout>
        </ObsCompoundLayout>
        <ObsError errors={this.errorsWithLabelNames()} />
      </div>
    )
  }
}

ObsAddressUs.defaultProps = {
  label: "Address",
  required: false,
  autoFocus: false,
  errors: {},
};

ObsAddressUs.propTypes = {
  value:        PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  errors:       PropTypes.object,
  attr:         PropTypes.string.isRequired,
  onChange:     PropTypes.func,
  onBlur:       PropTypes.func,
  label:        PropTypes.string,
  hint:         PropTypes.string,
  required:     PropTypes.bool,
  id:           PropTypes.string,
  className:    PropTypes.string,
  autoFocus:    PropTypes.bool,
  didMount:     PropTypes.func,
  willUnmount:  PropTypes.func,
  streetCustomValidator: PropTypes.func,
  cityCustomValidator:   PropTypes.func,
  stateCustomValidator:  PropTypes.func,
  zipCustomValidator:    PropTypes.func
};

module.exports = ObsAddressUs;
