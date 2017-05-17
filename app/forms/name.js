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

class Name extends React.Component {
  constructor(props) {
    super(props);

    this.inputs = [];
    this.state = {
      id: props.id ||  _.uniqueId('name_'),
    };

    this._nameErrors = this._nameErrors.bind(this);
    this.errorsWithLabelNames = this.errorsWithLabelNames.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.runValidations = this.runValidations.bind(this);
    this.register = this.register.bind(this);
    this.unregister = this.unregister.bind(this);
  }

  componentDidMount() {
    if (_.isFunction(this.props.didMount))
      this.props.didMount(this)
  }

  componentWillUnmount() {
    if (_.isFunction(this.props.willUnmount))
      this.props.willUnmount(this)
  }

  // takes the errors passed in and selects out only errors for this component
  _nameErrors() {
    return _.pick(this.props.errors, [this.props.firstNameAttr, this.props.lastNameAttr])
  }

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
  }

  onChange(attr, value) {
    // Fire onChange event for the full attribute name
    if (_.isFunction(this.props.onChange))
      this.props.onChange(attr, value)
  }

  onBlur(attr, results) {
    // since the input is already returning the results of the formatter, we
    // don't need to call the formetter here.  We only need to convert the
    // attribute name to a fully qualified name
    if (_.isFunction(this.props.onBlur))
      this.props.onBlur(attr, results)
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

  render() {
    var valueFor = (attr)=> { return _.get((this.props.value || {}), attr) }
    var classesFor = (attr, classes="")=> {
      return cx({
        [classes]: _.isString(classes),
        "has-error": !_.isEmpty(this._nameErrors()[attr])
      })
    }
    var classes = cx({
      'form-group': true,
      'has-child-error': !_.isEmpty(this.errorsWithLabelNames()),
      [ this.props.className ]: _.isString(this.props.className)
    })

    return (
      <div className={classes}>
        <ObsLabel text={this.props.label} required={this.props.required} htmlFor={this.state.id} />
        <ObsHint  hint={this.props.hint} />
        <ObsCompoundLayout layout="inline">
          <div className="flex-grow-shrink">
            <ObsText id={this.state.id}
              value={valueFor(this.props.firstNameAttr)} errors={[]}
              required={this.props.required} formatter={Formatters.stringFormatter}
              placeholder={"First"}
              className={classesFor(this.props.firstNameAttr, "name-first")}
              onChange={_.bind(this.onChange, this, this.props.firstNameAttr)}
              onBlur={_.bind(this.onBlur, this, this.props.firstNameAttr)}
              didMount={this.register} willUnmount={this.unregister}
              autoFocus={this.props.autoFocus}
              customValidator={this.props.firstNameCustomValidator} />
          </div>
          <div className="flex-grow-shrink">
            <ObsText
              value={valueFor(this.props.lastNameAttr)} errors={[]}
              required={this.props.required} formatter={Formatters.stringFormatter}
              placeholder={"Last"}
              className={classesFor(this.props.lastNameAttr, "name-last")}
              onChange={_.bind(this.onChange, this, this.props.lastNameAttr)}
              onBlur={_.bind(this.onBlur, this, this.props.lastNameAttr)}
              didMount={this.register} willUnmount={this.unregister}
              customValidator={this.props.lastNameCustomValidator} />
          </div>
        </ObsCompoundLayout>
        <ObsError errors={this.errorsWithLabelNames()} />
      </div>
    )
  }
}

Name.propTypes = {
  value:         PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  firstNameAttr: PropTypes.string,
  lastNameAttr:  PropTypes.string,
  onChange:      PropTypes.func,
  onBlur:        PropTypes.func,
  label:         PropTypes.string,
  hint:          PropTypes.string,
  required:      PropTypes.bool,
  id:            PropTypes.string,
  className:     PropTypes.string,
  autoFocus:     PropTypes.bool,
  didMount:      PropTypes.func,
  willUnmount:   PropTypes.func,
  firstNameCustomValidator: PropTypes.func,
  lastNameCustomValidator:  PropTypes.func
}


Name.defaultProps = {
  label: "Name",
  firstNameAttr: "first_name",
  lastNameAttr: "last_name",
  required: false,
  autoFocus: false,
  errors: {},
};


module.exports = Name;
