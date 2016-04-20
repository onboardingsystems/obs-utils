jest.unmock('../../app/forms/form-builder')

import _ from 'lodash'
import OBSFormBuilder from '../../app/forms/form-builder';

describe('OBSFormBuilder', ()=> {

  it('does not blow up', ()=> {
    var formBuilder = OBSFormBuilder.new({
      parent: {},
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
    var formBuilder = OBSFormBuilder.new({
      parent: {}
    })
    expect(_.isObject(formBuilder)).toBe(true)
    expect(formBuilder.formDataAttr).toEqual('formData')
    expect(formBuilder.errorDataAttr).toEqual('errorData')
    expect(formBuilder.parsedDataAttr).toEqual('parsedData')
  })

})
