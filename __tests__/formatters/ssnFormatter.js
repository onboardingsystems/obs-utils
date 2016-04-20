jest.unmock('../../app/formatters/formatters')

import formatters from '../../app/formatters/formatters'
import moment     from 'moment'


describe('ssnFormatter', () => {

  it("formats strings", ()=> {
    expect(formatters.ssnFormatter("111223333"))
      .toEqual({
        errors: [],
        formatted: "111-22-3333",
        parsed: "111223333",
        valid: true
      })
  })

  it("handles errors", ()=> {
    expect(formatters.ssnFormatter("11122333"))
      .toEqual({
        errors: ['invalid SSN'],
        formatted: "11122333",
        parsed: null,
        valid: false
      })
  })
})
