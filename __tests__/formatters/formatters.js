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


describe('requiredFormatter', () => {

  it("does not change the value", ()=> {
    expect(formatters.requiredFormatter(" hi "))
      .toEqual({
        errors: [],
        formatted: ' hi ',
        parsed: ' hi ',
        valid: true
      })
  })

  it("returns an error if required", ()=> {
    expect(formatters.requiredFormatter("", {required: true}))
      .toEqual({
        errors: ['is required'],
        formatted: '',
        parsed: '',
        valid: false
      })

    // not the string formatter, it doesn't trim
    expect(formatters.requiredFormatter(" ", {required: true}))
      .toEqual({
        errors: [],
        formatted: ' ',
        parsed: ' ',
        valid: true
      })
  })
})


describe('stringFormatter', () => {

  it("trims white space", ()=> {
    expect(formatters.stringFormatter(" hi "))
      .toEqual({
        errors: [],
        formatted: 'hi',
        parsed: 'hi',
        valid: true
      })
  })

  it("returns an error if required", ()=> {
    expect(formatters.stringFormatter("", {required: true}))
      .toEqual({
        errors: ['is required'],
        formatted: '',
        parsed: '',
        valid: false
      })
  })
})


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
})


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
})


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


describe('zipcodeFormatter', () => {

  it("formats strings", ()=> {
    expect(formatters.zipcodeFormatter("12345"))
      .toEqual({
        errors: [],
        formatted: "12345",
        parsed: "12345",
        valid: true
      })
  })
})


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
})


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
})


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
})


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
})


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
})
