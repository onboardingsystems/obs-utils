// jest.unmock('../../app/forms/textarea')

import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactUtils from 'react-addons-test-utils';
import {shallow, render, mount} from 'enzyme';
import OBSTextarea from '../../app/forms/textarea';

describe('OBSTextarea', ()=> {

  it('does not blow up', ()=> {
    const comp = shallow(
      <OBSTextarea value="bob"/>
    )
    expect(comp.find('textarea').props().value).toEqual('bob')
  }),

  it('sets the default defaultValue to an empty string', ()=> {
    const comp = ReactUtils.renderIntoDocument(
      <OBSTextarea value={null} />
    )
    let node = $(ReactDOM.findDOMNode(comp))
    expect(comp.props.defaultValue).toEqual('')
    expect(node.find('textarea').val()).toEqual('')
  }),

  it('ignores defaultValue when value is present', ()=> {
    const comp = ReactUtils.renderIntoDocument(
      <OBSTextarea value="bob" defaultValue="default"/>
    )
    let node = $(ReactDOM.findDOMNode(comp))
    expect(node.find('textarea').val()).toEqual('bob')
  }),

  it('ignores defaultValue when value is empty string', ()=> {
    const comp = ReactUtils.renderIntoDocument(
      <OBSTextarea value="" defaultValue="default"/>
    )
    let node = $(ReactDOM.findDOMNode(comp))
    expect(node.find('textarea').val()).toEqual('')
  }),

  it('uses defaultValue when value is null', ()=> {
    const comp = ReactUtils.renderIntoDocument(
      <OBSTextarea value={null} defaultValue="default"/>
    )
    let node = $(ReactDOM.findDOMNode(comp))
    expect(node.find('textarea').val()).toEqual('default')
  })

})
