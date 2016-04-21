jest.unmock('../../app/formatters/formatters')

import formatters from '../../app/formatters/formatters'
import moment     from 'moment'


describe('timeFormatter', () => {

  it("formats times", ()=> {
    expect(formatters.timeFormatter("5"))
      .toEqual({
        errors: [],
        formatted: "5:00 am",
        parsed: "5:00 am",
        valid: true
      })
  })

  it("does not handles errors", ()=> {
    expect(formatters.timeFormatter("abc"))
      .toEqual({
        errors: [],
        formatted: "12:00 am",
        parsed: "12:00 am",
        valid: true
      })
  })
})
