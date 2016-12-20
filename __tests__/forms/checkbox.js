// jest.unmock('../../app/forms/checkbox')

import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactUtils from 'react-addons-test-utils';
import {shallow, render, mount} from 'enzyme';
import OBSCheckbox from '../../app/forms/checkbox';

describe('OBSCheckbox', ()=> {

  it('does not blow up', ()=> {
    const comp = ReactUtils.renderIntoDocument(
      <OBSCheckbox value={true}/>
    )
    let node = $(ReactDOM.findDOMNode(comp))
    expect(node.find('input').is(":checked")).toEqual(true)
  }),

  it('sets the default defaultValue to false', ()=> {
    const comp = ReactUtils.renderIntoDocument(
      <OBSCheckbox value={null} />
    )
    let node = $(ReactDOM.findDOMNode(comp))
    expect(comp.props.defaultValue).toEqual(false)
    expect(node.find('input').is(":checked")).toEqual(false)
  }),

  it('ignores defaultValue when value is false', ()=> {
    const comp = ReactUtils.renderIntoDocument(
      <OBSCheckbox value={false} defaultValue={true}/>
    )
    let node = $(ReactDOM.findDOMNode(comp))
    expect(node.find('input').is(":checked")).toEqual(false)
  }),

  it('ignores defaultValue when value is true', ()=> {
    const comp = ReactUtils.renderIntoDocument(
      <OBSCheckbox value={true} defaultValue={false}/>
    )
    let node = $(ReactDOM.findDOMNode(comp))
    expect(node.find('input').is(":checked")).toEqual(true)
  }),

  it('uses defaultValue when value is null', ()=> {
    const comp = ReactUtils.renderIntoDocument(
      <OBSCheckbox value={null} defaultValue={true}/>
    )
    let node = $(ReactDOM.findDOMNode(comp))
    expect(node.find('input').is(":checked")).toEqual(true)
  })


})
