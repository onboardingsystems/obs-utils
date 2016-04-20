jest.unmock('../../app/formatters/formatters')

import formatters from '../../app/formatters/formatters'
import moment     from 'moment'


describe('currencyFormatter', () => {

  it("formats cents", ()=> {
    expect(formatters.currencyFormatter("$5.14"))
      .toEqual({
        errors: [],
        formatted: "$5.14",
        parsed: 5.14,
        valid: true
      })
  })

  it("(doesn't) handle errors", ()=> {
    expect(formatters.currencyFormatter("abc"))
      .toEqual({
        errors: [],
        formatted: "$0.00",
        parsed: 0,
        valid: true
      })
  })
})
