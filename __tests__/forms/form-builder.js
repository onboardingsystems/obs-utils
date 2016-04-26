jest.unmock('../../app/forms/form-builder')
jest.unmock('../../app/forms/text')

import _ from 'lodash'
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import OBSFormBuilder from '../../app/forms/form-builder';
import OBSText from '../../app/forms/text';

describe('OBSFormBuilder', ()=> {

  it('does not blow up', ()=> {
    const parent = TestUtils.renderIntoDocument(<OBSText />)
    var formBuilder = OBSFormBuilder.new({
      parent: parent,
      formDataAttr: 'a',
      errorDataAttr: 'b',
      parsedDataAttr: 'c'
    })
    expect(_.isObject(formBuilder)).toBe(true)
    expect(_.isFunction(formBuilder.form)).toBe(true)
    expect(formBuilder.formDataAttr).toEqual('a')
    expect(formBuilder.errorDataAttr).toEqual('b')
    expect(formBuilder.parsedDataAttr).toEqual('c')
  })

  it('has defaults', ()=> {
    const parent = TestUtils.renderIntoDocument(<OBSText />)
    var formBuilder = OBSFormBuilder.new({
      parent: parent
    })
    expect(_.isObject(formBuilder)).toBe(true)
    expect(formBuilder.formDataAttr).toEqual('formData')
    expect(formBuilder.errorDataAttr).toEqual('errorData')
    expect(formBuilder.parsedDataAttr).toEqual('parsedData')
  })

})
