import React from 'react';
import cx    from 'classnames';
import PropTypes from 'prop-types';

class ObsForm extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.stopPropagation()
    e.preventDefault()
    if (_.isObject(this.props.builder)) {
      this.props.builder.onSubmit(e)
    } else if (_.isFunction(this.props.onSubmit)) {
      this.props.onSubmit(e)
    }
  }

  render() {
    var classes
    classes = cx({
      'form': true,
      [ this.props.className ]: _.isString(this.props.className)
    })

    return (
      <form className={classes} onSubmit={this.onSubmit}>
        <input type="submit" style={{display: 'none'}}/>
        {this.props.children}
      </form>
    )
  }
}

ObsForm.propTypes = {
  onSubmit:   PropTypes.func,
  builder:    PropTypes.object,
  className:  PropTypes.string
}


module.exports = ObsForm;
