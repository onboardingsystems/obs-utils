jest.unmock('../../app/formatters/formatters')

import _ from 'lodash'
import formatters from '../../app/formatters/formatters'


describe('emailFormatter', () => {

  it("accepts valid emails", ()=> {
    expect(formatters.emailFormatter("bob@example.com"))
      .toEqual({
        errors: [],
        formatted: "bob@example.com",
        parsed: "bob@example.com",
        valid: true
      })
  })

  it("trims whitespace", ()=> {
    expect(formatters.emailFormatter(" bob@example.com "))
      .toEqual({
        errors: [],
        formatted: "bob@example.com",
        parsed: "bob@example.com",
        valid: true
      })
  })

  it("catches invalid emails", ()=> {
    expect(formatters.emailFormatter("bob@example. com "))
      .toEqual({
        errors: ['invalid email'],
        formatted: "bob@example. com",
        parsed: null,
        valid: false
      })
  })


})
