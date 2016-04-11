jest.unmock('../../lib/forms/form-builder')

import _ from 'lodash'
import OBSFormBuilder from '../../lib/forms/form-builder';

describe('OBSFormBuilder', ()=> {

  it('does not blow up', ()=> {
    var formBuilder = OBSFormBuilder.new()
    expect(_.isObject(formBuilder)).toBe(true)
    expect(_.isFunction(formBuilder.form)).toBe(true)
    expect(_.isFunction(formBuilder.phoneField)).toBe(true)
    expect(_.isFunction(formBuilder._onChange)).toBe(true)
  })

})
