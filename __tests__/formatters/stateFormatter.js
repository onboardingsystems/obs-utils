jest.unmock('../../app/formatters/formatters')

import formatters from '../../app/formatters/formatters'
import moment     from 'moment'


describe('stateFormatter', () => {

  it("formats strings", ()=> {
    expect(formatters.stateFormatter("ca"))
      .toEqual({
        errors: [],
        formatted: "CA",
        parsed: "CA",
        valid: true
      })

  })

})
