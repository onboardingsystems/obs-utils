const React = require('react')
const cx    = require('classnames')
const _     = require('lodash')

const Formatters = require('../formatters/formatters')

const ObsCompoundLayout = require('./compound-layout')
const ObsText           = require('./text')
const ObsLabel          = require('./label')
const ObsHint           = require('./hint')
const ObsError          = require('./error')

const Name = React.createClass({
  propTypes: {
    value:         React.PropTypes.object,
    attr:          React.PropTypes.string,
    firstNameAttr: React.PropTypes.string,
    lastNameAttr:  React.PropTypes.string,
    onChange:      React.PropTypes.func,
    onBlur:        React.PropTypes.func,
    label:         React.PropTypes.string,
    hint:          React.PropTypes.string,
    required:      React.PropTypes.bool,
    id:            React.PropTypes.string,
    className:     React.PropTypes.string,
    didMount:      React.PropTypes.func,
    willUnmount:   React.PropTypes.func
  },

  getDefaultProps() {
    return {
      label: "Name",
      firstNameAttr: "first",
      lastNameAttr: "last",
      required: false,
      errors: {},
      id: _.uniqueId('name_'),
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
  _name_attrs() {
    return [
      this._fullAttrName(this.props.firstNameAttr),
      this._fullAttrName(this.props.lastNameAttr)
    ]
  },

  // turn fully-qualified errors structure into one that is relative to the fields
  // this component renders
  // {
  //   "person.name.first": ["is required"]
  // }
  //
  // Convert to format:
  //
  // {
  //   "first": ["is required"]
  // }
  _nameErrors() {
    var errors = this.props.errors
    return _.reduce([this.props.firstNameAttr, this.props.lastNameAttr], (acc, attr)=> {
      var attrErrors = _.get(errors, this._fullAttrName(attr))
      if (!_.isEmpty(attrErrors))
        acc[attr] = attrErrors
      return acc
    }, {})
  },

  // converts the partial field names into fully qualified names
  _fullAttrName(attr) {
    return `${this.props.attr}.${attr}`
  },

  errorsWithLabelNames() {
    return _.reduce(this._nameErrors(), (acc, errors, attr)=> {
      var name
      if (attr === this.props.firstNameAttr)
        name = "First name"
      else
        name = "Last name"
      _.forEach(errors, (error)=> {
        acc.push(`${name} ${error}`)
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

  render() {
    var valueFor = (attr)=> { return _.get((this.props.value || {}), attr) }
    var classesFor = (attr, classes="")=> {
      return cx({
        [classes]: _.isString(classes),
        "has-error": !_.isEmpty(this._nameErrors()[attr])
      })
    }
    var classes = cx({
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
        <ObsCompoundLayout layout="inline">
          <div className="flex-grow-shrink">
            <ObsText id={this.props.id}
              value={valueFor(this.props.firstNameAttr)} errors={[]}
              required={this.props.required} formatter={Formatters.stringFormatter}
              placeholder={"First"}
              className={classesFor(this.props.firstNameAttr, "name-first")}
              onChange={_.bind(this.onChange, this, this.props.firstNameAttr)}
              onBlur={_.bind(this.onBlur, this, this.props.firstNameAttr)} />
          </div>
          <div className="flex-grow-shrink">
            <ObsText
              value={valueFor(this.props.lastNameAttr)} errors={[]}
              required={this.props.required} formatter={Formatters.stringFormatter}
              placeholder={"Last"}
              className={classesFor(this.props.lastNameAttr, "name-last")}
              onChange={_.bind(this.onChange, this, this.props.lastNameAttr)}
              onBlur={_.bind(this.onBlur, this, this.props.lastNameAttr)} />
          </div>
        </ObsCompoundLayout>
        <ObsError errors={this.errorsWithLabelNames()} />
      </div>
    )
  }
})

module.exports = Name
