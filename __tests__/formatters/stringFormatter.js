jest.unmock('../../app/formatters/formatters')

import formatters from '../../app/formatters/formatters'
import moment     from 'moment'

describe('stringFormatter', () => {

  it("trims white space", ()=> {
    expect(formatters.stringFormatter(" hi "))
      .toEqual({
        errors: [],
        formatted: 'hi',
        parsed: 'hi',
        valid: true
      })
  })

  it("returns an error if required", ()=> {
    expect(formatters.stringFormatter("", {required: true}))
      .toEqual({
        errors: ['is required'],
        formatted: '',
        parsed: null,
        valid: false
      })
  })
})
