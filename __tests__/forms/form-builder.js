jest.unmock('../../app/forms/form-builder')
jest.unmock('../../app/forms/text')

import _ from 'lodash'
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import OBSFormBuilder from '../../app/forms/form-builder';
import OBSText from '../../app/forms/text';

describe('OBSFormBuilder', ()=> {

  it('does not blow up', ()=> {
    const parent = TestUtils.renderIntoDocument(<OBSText />)
    var formBuilder = OBSFormBuilder.new({
      parent: parent,
      formDataAttr: 'a',
      errorDataAttr: 'b',
      parsedDataAttr: 'c'
    })
    expect(_.isObject(formBuilder)).toBe(true)
    expect(_.isFunction(formBuilder.form)).toBe(true)
    expect(formBuilder.formDataAttr).toEqual('a')
    expect(formBuilder.errorDataAttr).toEqual('b')
    expect(formBuilder.parsedDataAttr).toEqual('c')
  })

  it('has defaults', ()=> {
    const parent = TestUtils.renderIntoDocument(<OBSText />)
    var formBuilder = OBSFormBuilder.new({
      parent: parent
    })
    expect(_.isObject(formBuilder)).toBe(true)
    expect(formBuilder.formDataAttr).toEqual('formData')
    expect(formBuilder.errorDataAttr).toEqual('errorData')
    expect(formBuilder.parsedDataAttr).toEqual('parsedData')
  })

})

describe('defaultValue', ()=>{

  it('textField passes defaultValue to the text component', ()=> {
    const parent = TestUtils.renderIntoDocument(<OBSText/>)
    var formBuilder = OBSFormBuilder.new({
      parent: parent
    })
    let comp = TestUtils.renderIntoDocument(formBuilder.textField('Name', 'name', {defaultValue: 'bob'}))

    expect(comp.props.defaultValue).toEqual('bob')
  }),

  it('checkboxField passes defaultValue to the input component', ()=> {
    const parent = TestUtils.renderIntoDocument(<OBSText/>)
    var formBuilder = OBSFormBuilder.new({
      parent: parent
    })
    let comp = TestUtils.renderIntoDocument(formBuilder.checkboxField('Name', 'name', {defaultValue: true}))

    expect(comp.props.defaultValue).toEqual(true)
  }),

  it('numberField passes defaultValue to the text component', ()=> {
    const parent = TestUtils.renderIntoDocument(<OBSText/>)
    var formBuilder = OBSFormBuilder.new({
      parent: parent
    })
    let comp = TestUtils.renderIntoDocument(formBuilder.numberField('Name', 'name', {defaultValue: 1}))

    expect(comp.props.defaultValue).toEqual(1)
  }),

  it('phoneField passes defaultValue to the text component', ()=> {
    const parent = TestUtils.renderIntoDocument(<OBSText/>)
    var formBuilder = OBSFormBuilder.new({
      parent: parent
    })
    let comp = TestUtils.renderIntoDocument(formBuilder.phoneField('Name', 'name', {defaultValue: 1234567890}))

    expect(comp.props.defaultValue).toEqual(1234567890)
  }),

  it('emailField passes defaultValue to the text component', ()=> {
    const parent = TestUtils.renderIntoDocument(<OBSText/>)
    var formBuilder = OBSFormBuilder.new({
      parent: parent
    })
    let comp = TestUtils.renderIntoDocument(formBuilder.emailField('Name', 'name', {defaultValue: 'test@example.com'}))

    expect(comp.props.defaultValue).toEqual('test@example.com')
  }),

  it('ssnField passes defaultValue to the text component', ()=> {
    const parent = TestUtils.renderIntoDocument(<OBSText/>)
    var formBuilder = OBSFormBuilder.new({
      parent: parent
    })
    let comp = TestUtils.renderIntoDocument(formBuilder.ssnField('Name', 'name', {defaultValue: 111223333}))

    expect(comp.props.defaultValue).toEqual(111223333)
  }),

  it('stateField passes defaultValue to the text component', ()=> {
    const parent = TestUtils.renderIntoDocument(<OBSText/>)
    var formBuilder = OBSFormBuilder.new({
      parent: parent
    })
    let comp = TestUtils.renderIntoDocument(formBuilder.stateField('Name', 'name', {defaultValue: 'NY'}))

    expect(comp.props.defaultValue).toEqual('NY')
  }),

  it('zipcodeField passes defaultValue to the text component', ()=> {
    const parent = TestUtils.renderIntoDocument(<OBSText/>)
    var formBuilder = OBSFormBuilder.new({
      parent: parent
    })
    let comp = TestUtils.renderIntoDocument(formBuilder.zipcodeField('Name', 'name', {defaultValue: 12345}))

    expect(comp.props.defaultValue).toEqual(12345)
  }),

  it('currencyField passes defaultValue to the text component', ()=> {
    const parent = TestUtils.renderIntoDocument(<OBSText/>)
    var formBuilder = OBSFormBuilder.new({
      parent: parent
    })
    let comp = TestUtils.renderIntoDocument(formBuilder.currencyField('Name', 'name', {defaultValue: 1.23}))

    expect(comp.props.defaultValue).toEqual(1.23)
  }),

  it('dollarsField passes defaultValue to the text component', ()=> {
    const parent = TestUtils.renderIntoDocument(<OBSText/>)
    var formBuilder = OBSFormBuilder.new({
      parent: parent
    })
    let comp = TestUtils.renderIntoDocument(formBuilder.dollarsField('Name', 'name', {defaultValue: 1}))

    expect(comp.props.defaultValue).toEqual(1)
  }),

  it('dateField passes defaultValue to the text component', ()=> {
    const parent = TestUtils.renderIntoDocument(<OBSText/>)
    var formBuilder = OBSFormBuilder.new({
      parent: parent
    })
    let comp = TestUtils.renderIntoDocument(formBuilder.dateField('Name', 'name', {defaultValue: "Jan 1, 1970"}))

    expect(comp.props.defaultValue).toEqual("Jan 1, 1970")
  }),

  it('timeField passes defaultValue to the text component', ()=> {
    const parent = TestUtils.renderIntoDocument(<OBSText/>)
    var formBuilder = OBSFormBuilder.new({
      parent: parent
    })
    let comp = TestUtils.renderIntoDocument(formBuilder.timeField('Name', 'name', {defaultValue: '1:00 PM'}))

    expect(comp.props.defaultValue).toEqual('1:00 PM')
  }),

  it('ordinalField passes defaultValue to the text component', ()=> {
    const parent = TestUtils.renderIntoDocument(<OBSText/>)
    var formBuilder = OBSFormBuilder.new({
      parent: parent
    })
    let comp = TestUtils.renderIntoDocument(formBuilder.ordinalField('Name', 'name', {defaultValue: '1st'}))

    expect(comp.props.defaultValue).toEqual('1st')
  }),

  it('textarea passes defaultValue to the textarea component', ()=> {
    const parent = TestUtils.renderIntoDocument(<OBSText/>)
    var formBuilder = OBSFormBuilder.new({
      parent: parent
    })
    let comp = TestUtils.renderIntoDocument(formBuilder.textarea('Name', 'name', {defaultValue: "test"}))

    expect(comp.props.defaultValue).toEqual("test")
  })

})
