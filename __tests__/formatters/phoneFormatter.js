jest.unmock('../../app/formatters/formatters')

import _ from 'lodash'
import formatters from '../../app/formatters/formatters'
import moment     from 'moment'


describe('phoneFormatter', () => {

  it("formats strings", ()=> {
    expect(formatters.phoneFormatter("1112223333"))
      .toEqual({
        errors: [],
        formatted: "(111) 222-3333",
        parsed: "1112223333",
        valid: true
      })
  })

  it("handles errors", ()=> {
    expect(formatters.phoneFormatter("111222333"))
      .toEqual({
        errors: ['invalid phone number'],
        formatted: "111222333",
        parsed: null,
        valid: false
      })
  })
})
