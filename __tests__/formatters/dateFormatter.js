jest.unmock('../../app/formatters/formatters')

import _ from 'lodash'
import formatters from '../../app/formatters/formatters'
import moment     from 'moment'


describe('dateFormatter', () => {

  it("formats dates", ()=> {
    expect(formatters.dateFormatter("5-5-14"))
      .toEqual({
        errors: [],
        formatted: "May 5, 2014",
        parsed: "2014-05-05",
        valid: true
      })
  })

  it("does not handle errors", ()=> {
    expect(formatters.dateFormatter("abc").valid)
      .toEqual(true)
  })
})
