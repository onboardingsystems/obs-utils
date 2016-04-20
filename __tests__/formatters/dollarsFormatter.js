jest.unmock('../../app/formatters/formatters')

import formatters from '../../app/formatters/formatters'
import moment     from 'moment'


describe('dollarsFormatter', () => {

  it("formats dollars", ()=> {
    expect(formatters.dollarsFormatter("$5.14"))
      .toEqual({
        errors: [],
        formatted: "$5",
        parsed: 5.14,
        valid: true
      })
  })

  it("(doesn't) handle errors", ()=> {
    expect(formatters.dollarsFormatter("abc"))
      .toEqual({
        errors: [],
        formatted: "$0",
        parsed: 0,
        valid: true
      })
  })
})
