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
    value:        React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
    errors:       React.PropTypes.object,
    attr:         React.PropTypes.string.isRequired,
    onChange:     React.PropTypes.func,
    onBlur:       React.PropTypes.func,
    label:        React.PropTypes.string,
    hint:         React.PropTypes.string,
    required:     React.PropTypes.bool,
    id:           React.PropTypes.string,
    className:    React.PropTypes.string,
    autoFocus:    React.PropTypes.bool,
    didMount:     React.PropTypes.func,
    willUnmount:  React.PropTypes.func
  },

  fields: {
    street_1: {name: 'Address', attr: 'street_1'},
    city:     {name: 'City',    attr: 'city'},
    state:    {name: 'State',   attr: 'state'},
    zip:      {name: 'Zip',     attr: 'zip'}
  },
  inputs: [],

  getDefaultProps() {
    return {
      label: "Address",
      required: false,
      autoFocus: false,
      errors: {},
    }
  },

  getInitialState() {
    return {
      id: this.props.id ||  _.uniqueId('address_'),
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

  // returns a list of fully qualified address attributes (such as address.city
  // and address.zip)
  _address_attrs() {
    var list = []
    _.forOwn(this.fields, (field, value)=> {
      list.push(this._fullAttrName(field.attr))
    })
    return list
  },

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
  },

  // converts the partial field names into fully qualified names
  _fullAttrName(attr) {
    return `${this.props.attr}.${attr}`
  },

  errorsWithLabelNames() {
    return _.reduce(this._addressErrors(), (acc, errors, attr)=> {
      _.forEach(errors, (error)=> {
        acc.push(`${this.fields[attr].name} ${error}`)
      })
      return acc
    }, [])
  },

  onChange(attr, value) {
    // Fire onChange event for the full attribute name
    if (_.isFunction(this.props.onChange))
      this.props.onChange(this._fullAttrName(attr), value)
  },

  onBlur(attr, results) {
    // since the input is already returning the results of the formatter, we
    // don't need to call the formetter here.  We only need to convert the
    // attribute name to a fully qualified name
    if (_.isFunction(this.props.onBlur))
      this.props.onBlur(this._fullAttrName(attr), results)
  },

  // run through validations on each input
  runValidations() {
    var errors = _.reduce(this.inputs, (errors, input)=> {
      return _.concat(errors, input.runValidations())
    }, [])
    return errors
  },

  register(input) {
    this.inputs = _.concat(this.inputs, input)
  },

  unregister(input) {
    this.inputs = _.without(this.inputs, input)
  },

  classesForAttr(attr, classes="") {
    return cx({
      [classes]: _.isString(classes),
      "has-error": !_.isEmpty(this._addressErrors()[attr])
    })
  },

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
            autoFocus={this.props.autoFocus} />

          <ObsCompoundLayout layout={"inline"}>
            <div className="flex-grow-shrink">
              <ObsText
                value={valueFor(this.fields.city.attr)} errors={[]}
                required={this.props.required} formatter={Formatters.stringFormatter}
                placeholder={"City"}
                className={this.classesForAttr(this.fields.city.attr, "address-city")}
                onChange={_.bind(this.onChange, this, this.fields.city.attr)}
                onBlur={_.bind(this.onBlur, this, this.fields.city.attr)}
                didMount={this.register} willUnmount={this.unregister} />
            </div>
            <div className="flex-static">
              <ObsText
                value={valueFor(this.fields.state.attr)} errors={[]}
                required={this.props.required} formatter={Formatters.stateFormatter}
                placeholder={"ST"}
                className={this.classesForAttr(this.fields.state.attr, "address-state state")}
                onChange={_.bind(this.onChange, this, this.fields.state.attr)}
                onBlur={_.bind(this.onBlur, this, this.fields.state.attr)}
                didMount={this.register} willUnmount={this.unregister} />
            </div>
            <div className="flex-static">
              <ObsText
                value={valueFor(this.fields.zip.attr)} errors={[]}
                required={this.props.required} formatter={Formatters.zipcodeFormatter}
                placeholder={"Zip"}
                className={this.classesForAttr(this.fields.zip.attr, "address-zipcode zipcode")}
                onChange={_.bind(this.onChange, this, this.fields.zip.attr)}
                onBlur={_.bind(this.onBlur, this, this.fields.zip.attr)}
                didMount={this.register} willUnmount={this.unregister} />
            </div>
          </ObsCompoundLayout>
        </ObsCompoundLayout>
        <ObsError errors={this.errorsWithLabelNames()} />
      </div>
    )
  }
})

module.exports = ObsAddressUs
