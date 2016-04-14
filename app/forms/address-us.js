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
    id:           React.PropTypes.string,
    className:    React.PropTypes.string,
    didMount:     React.PropTypes.func,
    willUnmount:  React.PropTypes.func
  },

  fields: {
    street_1: {name: 'Address', attr: 'street_1'},
    city:     {name: 'City',    attr: 'city'},
    state:    {name: 'State',   attr: 'state'},
    zip:      {name: 'Zip',     attr: 'zip'}
  },

  getDefaultProps() {
    return {
      label: "Address",
      required: false,
      errors: [],
      id: _.uniqueId('address1_'),
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

  _address_attrs() {
    var list = []
    _.forOwn(this.fields, (field, value)=> {
      list.push(this._fullAttrName(field.attr))
    })
    return list
  },

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
  _addressErrors() {
    var addressErrors, result = {}
    addressErrors = _.pick(this.props.errors, this._address_attrs())
    _.forOwn(this.fields, (value, field)=> {
      var errors = addressErrors[this._fullAttrName(value.attr)]
      if (!_.isEmpty(errors))
        result[value.attr] = errors
    })
    return result
  },

  _fullAttrName(attr) {
    return `${this.props.attr}.${attr}`
  },

  _valueChanged(attr, newVal) {
    // Fire onChange event for the full attribute name and the updated value.
    if (_.isFunction(this.props.onChange))
      this.props.onChange(this._fullAttrName(attr), newVal)
  },

  _errorsChanged(attr, errors) {
    // if have onErrorChange event, convert errors back to global version and
    // fire update
    if (_.isFunction(this.props.onErrorChange))
      this.props.onErrorChange(this._fullAttrName(attr), errors)
  },

  errorsWithLabelNames() {
    return _.reduce(this._addressErrors(), (acc, errors, attr)=> {
      _.forEach(errors, (error)=> {
        acc.push(`${this.fields[attr].name} ${error}`)
      })
      return acc
    }, [])
  },

  classesForAttr(attr, classes="") {
    return cx({
      [classes]: _.isString(classes),
      "has-error": !_.isEmpty(this._addressErrors()[attr])
    })
  },

  render() {
    var addrObject, classes
    addrObject = _.get(this.props.object, this.props.attr) || {}

    classes = cx({
      'address-us': true,
      'address-us': true,
      'form-group': true,
      'has-child-error': !_.isEmpty(this.errorsWithLabelNames()),
      [ this.props.className ]: _.isString(this.props.className)
    })

    return (
      <div className={classes}>
        <ObsLabel text={this.props.label} required={this.props.required} htmlFor={this.props.id} />
        <ObsHint  hint={this.props.hint} />
        <ObsCompoundLayout label={this.props.label} layout={"full"} className={this.props.className}>
          <ObsText id={this.props.id}
            object={addrObject} attr={this.fields.street_1.attr} formatter={Formatters.stringFormatter}
            required={this.props.required} errors={[]}
            placeholder={"Address"} onErrorChange={this._errorsChanged}
            onChange={_.bind(this._valueChanged, this)} className={this.classesForAttr(this.fields.street_1.attr, "address-line-1")} />

          <ObsCompoundLayout label={this.props.label} layout={"inline"} className={this.props.className}>
            <div className="flex-grow-shrink">
              <ObsText object={addrObject} attr={this.fields.city.attr} formatter={Formatters.stringFormatter}
                required={this.props.required} errors={[]}
                placeholder={"City"} onErrorChange={this._errorsChanged}
                onChange={_.bind(this._valueChanged, this)} className={this.classesForAttr(this.fields.city.attr, "address-city")} />
            </div>
            <div className="flex-static">
              <ObsText object={addrObject} attr={this.fields.state.attr} formatter={Formatters.stateFormatter}
                required={this.props.required} errors={[]}
                placeholder={"ST"} onErrorChange={this._errorsChanged}
                onChange={_.bind(this._valueChanged, this)} className={this.classesForAttr(this.fields.state.attr, "address-state state")} />
            </div>
            <div className="flex-static">
              <ObsText object={addrObject} attr={this.fields.zip.attr} formatter={Formatters.zipcodeFormatter}
                required={this.props.required} errors={[]}
                placeholder={"Zip"} onErrorChange={this._errorsChanged}
                onChange={_.bind(this._valueChanged, this)} className={this.classesForAttr(this.fields.zip.attr, "address-zipcode zipcode")} />
            </div>
          </ObsCompoundLayout>
        </ObsCompoundLayout>
        <ObsError errors={this.errorsWithLabelNames()} />
      </div>
    )
  }
})

module.exports = ObsAddressUs
