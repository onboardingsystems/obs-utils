import React             from 'react';
import _                 from 'lodash';
import ObsRequiredMarker from './required-marker';
import ObsHint           from './hint';
import PropTypes from 'prop-types';


class ObsLabel extends React.Component {
  somethingToRender() {
    return !_.isEmpty(this.props.text) || !_.isEmpty(this.props.hint)
  }

  render() {
    if (!this.somethingToRender())
      return <noscript />
    return (
      <label className="control-label" htmlFor={this.props.htmlFor}>
        {this.props.text}
        <ObsRequiredMarker required={this.props.required} />
        <ObsHint hint={this.props.hint} />
      </label>
    )
  }

}

ObsLabel.propTypes = {
  text:       PropTypes.string,
  hint:       PropTypes.string,
  required:   PropTypes.bool,
  htmlFor:    PropTypes.string
},

ObsLabel.getDefaultProps = {
  required: false
}

module.exports = ObsLabel;
