// jest.unmock('../../app/forms/text')

import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactUtils from 'react-addons-test-utils';
import {shallow, render, mount} from 'enzyme';
import OBSText from '../../app/forms/text';

describe('OBSText', ()=> {

  it('does not blow up', ()=> {
    const comp = shallow(
      <OBSText value="bob"/>
    )
    expect(comp.find('input').props().value).toEqual('bob')
  }),

  it('supports the input type option', ()=> {
    const comp = shallow(
      <OBSText value="bob" type="password"/>
    )
    expect(comp.find('input').props().type).toEqual('password')
  }),

  it('sets the default defaultValue to an empty string', ()=> {
    const comp = ReactUtils.renderIntoDocument(
      <OBSText value={null} />
    )
    let node = $(ReactDOM.findDOMNode(comp))
    expect(comp.props.defaultValue).toEqual('')
    expect(node.find('input').val()).toEqual('')
  }),

  it('ignores defaultValue when value is present', ()=> {
    const comp = ReactUtils.renderIntoDocument(
      <OBSText value="bob" defaultValue="default"/>
    )
    let node = $(ReactDOM.findDOMNode(comp))
    expect(node.find('input').val()).toEqual('bob')
  }),

  it('ignores defaultValue when value is empty string', ()=> {
    const comp = ReactUtils.renderIntoDocument(
      <OBSText value="" defaultValue="default"/>
    )
    let node = $(ReactDOM.findDOMNode(comp))
    expect(node.find('input').val()).toEqual('')
  }),

  it('uses defaultValue when value is null', ()=> {
    const comp = ReactUtils.renderIntoDocument(
      <OBSText value={null} defaultValue="default"/>
    )
    let node = $(ReactDOM.findDOMNode(comp))
    expect(node.find('input').val()).toEqual('default')
  })

})
