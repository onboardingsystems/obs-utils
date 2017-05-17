import React from 'react';
import PropTypes from 'prop-types';

function TextField(props) {
  return props.form.textField(props.label, props.name, props.options);
}

TextField.propTypes = {
  form: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.object
}

module.exports = TextField;