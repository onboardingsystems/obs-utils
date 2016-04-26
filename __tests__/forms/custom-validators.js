jest.unmock('../../app/forms/text')
jest.unmock('../../app/formatters/formatters')

import _ from 'lodash'
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Formatters from '../../app/formatters/formatters'
import Text from '../../app/forms/text';

describe('Custom Validators', ()=> {

  it('uses custom validators', ()=> {
    var lengthValidator, results = {}, onBlur, comp

    // define a custom validator
    lengthValidator = function(value) {
      var errors = []
      if (value.length < 4)
        errors = _.concat(errors, 'custom!')
      return errors
    }

    // define a onBlur callback to receive the output from the component and
    // store it so we can compare and test it
    onBlur = function(value) {
      results = value
    }

    // test that the component still uses the formatter and that it passes
    // validation
    comp = TestUtils.renderIntoDocument(
      <Text
        value=" abcd "
        onBlur={onBlur}
        customValidator={lengthValidator}
        formatter={Formatters.stringFormatter} />
    )
    comp.runValidations()
    expect(results).toEqual({
      errors: [],
      formatted: 'abcd',
      parsed: 'abcd',
      valid: true
    })

    // test when the value is valid to the formatter but invalid to the
    // customValidator
    comp = TestUtils.renderIntoDocument(
      <Text
        value=" abc "
        onBlur={onBlur}
        customValidator={lengthValidator}
        formatter={Formatters.stringFormatter}
        required={true} />
    )
    comp.runValidations()
    expect(results).toEqual({
      errors: ['custom!'],
      formatted: 'abc',
      parsed: null,
      valid: false
    })

    // test when the input is invalid to both the formatter and customValidator
    comp = TestUtils.renderIntoDocument(
      <Text
        value="          "
        onBlur={onBlur}
        customValidator={lengthValidator}
        formatter={Formatters.stringFormatter}
        required={true} />
    )
    comp.runValidations()
    expect(results).toEqual({
      errors: ['is required', 'custom!'],
      formatted: '',
      parsed: null,
      valid: false
    })
  })

  it('works without custom validators', ()=> {
    var results = {}, onBlur, comp

    // define a onBlur callback to receive the output from the component and
    // store it so we can compare and test it
    onBlur = function(value) {
      results = value
    }

    // test that the component still uses the formatter and that it passes
    // validation
    comp = TestUtils.renderIntoDocument(
      <Text
        value=" abcd "
        onBlur={onBlur}
        formatter={Formatters.stringFormatter} />
    )
    comp.runValidations()
    expect(results).toEqual({
      errors: [],
      formatted: 'abcd',
      parsed: 'abcd',
      valid: true
    })

    // test when the input is invalid to both the formatter and customValidator
    comp = TestUtils.renderIntoDocument(
      <Text
        value=""
        onBlur={onBlur}
        formatter={Formatters.stringFormatter}
        required={true} />
    )
    comp.runValidations()
    expect(results).toEqual({
      errors: ['is required'],
      formatted: '',
      parsed: null,
      valid: false
    })
  })

})
