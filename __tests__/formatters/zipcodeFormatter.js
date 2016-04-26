jest.unmock('../../app/formatters/formatters')

import _ from 'lodash'
import formatters from '../../app/formatters/formatters'
import moment     from 'moment'


describe('zipcodeFormatter', () => {

  it("formats strings", ()=> {
    expect(formatters.zipcodeFormatter("12345"))
      .toEqual({
        errors: [],
        formatted: "12345",
        parsed: "12345",
        valid: true
      })
  })

  it("handles errors", ()=> {
    expect(formatters.zipcodeFormatter("1234"))
      .toEqual({
        errors: ['is invalid'],
        formatted: "1234",
        parsed: null,
        valid: false
      })
  })
})
