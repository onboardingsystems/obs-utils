jest.unmock('../../app/formatters/formatters')

import formatters from '../../app/formatters/formatters'
import moment     from 'moment'


describe('requiredFormatter', () => {

  it("does not change the value", ()=> {
    expect(formatters.requiredFormatter(" hi "))
      .toEqual({
        errors: [],
        formatted: ' hi ',
        parsed: ' hi ',
        valid: true
      })
  })

  it("returns an error if required", ()=> {
    expect(formatters.requiredFormatter("", {required: true}))
      .toEqual({
        errors: ['is required'],
        formatted: '',
        parsed: null,
        valid: false
      })

    // empty strings are still considered blank from a validation perspective
    expect(formatters.requiredFormatter(" ", {required: true}))
      .toEqual({
        errors: ['is required'],
        formatted: ' ',
        parsed: null,
        valid: false
      })

  })

})
