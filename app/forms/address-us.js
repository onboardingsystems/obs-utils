const React = require('react')
const cx    = require('classnames')
const _     = require('lodash')

const Formatters = require('../formatters/formatters')

const ObsCompoundLayout = require('./compound-layout')
const ObsText           = require('./text')
const ObsLabel          = require('./label')
const ObsHint           = require('./hint')
const ObsError          = require('./error')

const ObsAddressUs = React.createClass({
  propTypes: {
    object:       React.PropTypes.object.isRequired,
    attr:         React.PropTypes.string.isRequired,
    onChange:     React.PropTypes.func,
    onErrorChange:React.PropTypes.func,
    // errors are an object here (covers multiple fields)
    errors:       React.PropTypes.object,
    label:        React.PropTypes.string,
    hint:         React.PropTypes.string,
    required:     React.PropTypes.bool,
    className:    React.PropTypes.string,
    didMount:     React.PropTypes.func,
    willUnmount:   React.PropTypes.func
  },

  fields: {
    street_1: {name: 'Address', attr: 'street_1'},
    city:     {name: 'City',    attr: 'city'},
    state:    {name: 'State',   attr: 'state'},
    zip:      {name: 'Zip',     attr: 'zip'}
  },

  getDefaultProps() {
    return {
      label: "Address"
    }
  },

  getInitialState() {
    return {
      addressId: _.uniqueId('address1_'),
      errors: this._addressErrors(this.props.errors)
    }
  },

  componentDidMount() {
    if (_.isFunction(this.props.didMount))
      this.props.didMount(this)
  },

  componentWillUnmount() {
    if (_.isFunction(this.props.willUnmount))
      this.props.willUnmount(this)
  },

  componentWillReceiveProps(nextProps) {
    this.setState({errors: this._addressErrors(nextProps.errors)})
  },

  _address_attrs() {
    var list = []
    _.forOwn(this.fields, (field, value)=> {
      list.push(this._fullAttrName(value.attr))
    })
    return list
  },

  _addressErrors(errors) {
    var fullAttrErrors, result = {}
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
    fullAttrErrors = _.pick(errors, this._address_attrs())
    // loop through all the defined fields and look for any fully qualified
    // errors for it. If found, add then to the result object with the local
    // attr path.
    _.forOwn(this.fields, (value, field)=> {
      var errors
      errors = fullAttrErrors[this._fullAttrName(value.attr)]
      if (!_.isEmpty(errors))
        result[value.attr] = errors
    })
    return result
  },

  _getErrors(attr) {
    return this.state.errors[attr]
  },

  _anyChildErrors() {
    return !_.isEmpty(this.state.errors)
  },

  _fullAttrName(attr) {
    return `${this.props.attr}.${attr}`
  },

  _errorsText() {
    var list = []
    _.forEach(this.state.errors, (errors, field)=> {
      _.forEach(errors, (error)=> {
        list.push(`${this.fields[field].name} ${error}`)
      })
    })
    return list
  },

  _valueChanged(attr, newVal) {
    // Fire onChange event for the full attribute name and the updated value.
    if (_.isFunction(this.props.onChange))
      this.props.onChange(this._fullAttrName(attr), newVal)
  },

  _errorsChanged(attr, errors) {
    var newErrors
    // update the errors state. start with existing, remove resolved errors and
    // add new ones.
    newErrors = this.state.errors
    if (_.isEmpty(errors))
      delete newErrors[attr]
    else
      newErrors[attr] = errors
    this.setState({errors: newErrors})
    // if have onErrorChange event, convert errors back to global version and
    // fire update
    if (_.isFunction(this.props.onErrorChange))
      this.props.onErrorChange(this._fullAttrName(attr), errors)
  },

  render() {
    var addrObject, classes
    addrObject = _.get(this.props.object, this.props.attr) || {}

    classes = cx({
      'address-us': true,
      'address-us': true,
      'form-group': true,
      'has-child-error': this._anyChildErrors(),
      [ this.props.className ]: true
    })

    return (
      <div className={classes}>
        <ObsLabel text={this.props.label} required={this.props.required} htmlFor={this.state.addressId} />
        <ObsHint  hint={this.props.hint} />
        <ObsCompoundLayout label={this.props.label} layout={"full"} className={this.props.className}>
          <ObsText id={this.state.addressId}
            object={addrObject} attr={this.fields.street_1.attr} formatter={Formatters.stringFormatter}
            required={this.props.required} errors={this._getErrors(this.fields.street_1.attr)}
            placeholder={"Address"} onErrorChange={this._errorsChanged}
            onChange={_.bind(this._valueChanged, this)} className="address-line-1" />

          <ObsCompoundLayout label={this.props.label} layout={"inline"} className={this.props.className}>
            <div className="flex-grow-shrink">
              <ObsText object={addrObject} attr={this.fields.city.attr} formatter={Formatters.stringFormatter}
                required={this.props.required} errors={this._getErrors(this.fields.city.attr)}
                placeholder={"City"} onErrorChange={this._errorsChanged}
                onChange={_.bind(this._valueChanged, this)} className="address-city" />
            </div>
            <div className="flex-static">
              <ObsText object={addrObject} attr={this.fields.state.attr} formatter={Formatters.stateFormatter}
                required={this.props.required} errors={this._getErrors(this.fields.state.attr)}
                placeholder={"ST"} onErrorChange={this._errorsChanged}
                onChange={_.bind(this._valueChanged, this)} className="address-state state" />
            </div>
            <div className="flex-static">
              <ObsText object={addrObject} attr={this.fields.zip.attr} formatter={Formatters.zipcodeFormatter}
                required={this.props.required} errors={this._getErrors(this.fields.zip.attr)}
                placeholder={"Zip"} onErrorChange={this._errorsChanged}
                onChange={_.bind(this._valueChanged, this)} className="address-zipcode zipcode" />
            </div>
          </ObsCompoundLayout>
        </ObsCompoundLayout>
        <ObsError errors={this._errorsText()} />
      </div>
    )
  }
})

module.exports = ObsAddressUs
