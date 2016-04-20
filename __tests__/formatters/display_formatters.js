jest.unmock('../../app/formatters/formatters')

import formatters from '../../app/formatters/formatters'
import moment     from 'moment'


describe('addresses', () => {
  const validAddressObj = {
    street_1: '123 Main',
    city: 'Oak',
    state: 'CA',
    zip: 12345
  }

  it('addressLines', () => {
    expect(formatters.addressLines(validAddressObj))
      .toEqual([
        '123 Main',
        'Oak, CA 12345'
      ])
  })

  it('addressOneLine', () => {
    expect(formatters.addressOneLine(validAddressObj))
      .toEqual("123 Main, Oak, CA 12345")
  })
})


describe("currencyDisplay", ()=> {
  it("formats dollars", ()=> {
    expect(formatters.currencyDisplay(1000.15))
      .toEqual("$1,000")
  })

  it("formats cents", ()=> {
    expect(formatters.currencyDisplay(1000.15, {format: 'cents'}))
      .toEqual("$1,000.15")
  })
})

describe("timeAgoDisplay", ()=> {
  it("accepts dates", ()=> {
    var date = moment().subtract(5, 'days')
    expect(formatters.timeAgoDisplay(date))
      .toEqual("5 days ago")
  })
})


describe("datetimeDisplay", ()=> {
  it("formats strings", ()=> {
    expect(formatters.datetimeDisplay("10-10-2014 5:00 pm"))
      .toEqual("Oct 10, 2014  5:00:00 pm")
  })
})
