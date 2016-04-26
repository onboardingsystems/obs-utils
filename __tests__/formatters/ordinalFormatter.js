jest.unmock('../../app/formatters/formatters')

import formatters from '../../app/formatters/formatters'
import moment     from 'moment'


describe('ordinalFormatter', () => {

  it("formats numbers", () => {
    expect(formatters.ordinalFormatter(0))
      .toEqual({
        errors: [],
        formatted: '0th',
        parsed: 0,
        valid: true
      })
    expect(formatters.ordinalFormatter(1))
      .toEqual({
        errors: [],
        formatted: '1st',
        parsed: 1,
        valid: true
      })
    expect(formatters.ordinalFormatter(2))
      .toEqual({
        errors: [],
        formatted: '2nd',
        parsed: 2,
        valid: true
      })
    expect(formatters.ordinalFormatter(3))
      .toEqual({
        errors: [],
        formatted: '3rd',
        parsed: 3,
        valid: true
      })
    expect(formatters.ordinalFormatter(4))
      .toEqual({
        errors: [],
        formatted: '4th',
        parsed: 4,
        valid: true
      })
    expect(formatters.ordinalFormatter(11))
      .toEqual({
        errors: [],
        formatted: '11th',
        parsed: 11,
        valid: true
      })
    expect(formatters.ordinalFormatter(101))
      .toEqual({
        errors: [],
        formatted: '101st',
        parsed: 101,
        valid: true
      })
  })

  it("formats strings", () => {
    expect(formatters.ordinalFormatter('0'))
      .toEqual({
        errors: [],
        formatted: '0th',
        parsed: 0,
        valid: true
      })
  })


  it("formats ordinals", () => {
    expect(formatters.ordinalFormatter('101st'))
      .toEqual({
        errors: [],
        formatted: '101st',
        parsed: 101,
        valid: true
      })
  })

  it("compains about invalid ordinals", () => {
    expect(formatters.ordinalFormatter('abc'))
      .toEqual({
        errors: ['is invalid'],
        formatted: 'abc',
        parsed: null,
        valid: false
      })
  })

  it("corrects incorrect ordinals", () => {
    expect(formatters.ordinalFormatter('1nd'))
      .toEqual({
        errors: [],
        formatted: '1st',
        parsed: 1,
        valid: true
      })
  })
})
