// jest.unmock('../../app/forms/text')

import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {shallow, render, mount} from 'enzyme';
import OBSText from '../../app/forms/text';

describe('OBSText', ()=> {

  it('does not blow up', ()=> {
    const comp = shallow(
      <OBSText value="bob"/>
    )
    expect(comp.find('input').props().value).toEqual('bob')
  }),

  it('has a default autoFocus value', ()=> {
    let comp = TestUtils.renderIntoDocument(<OBSText value="bob"/>)
    expect(comp.props.autoFocus).toEqual(false)
  }),

  it('sets autoFocus', ()=> {
    let comp = TestUtils.renderIntoDocument(<OBSText value="bob" autoFocus={true}/>)
    expect(comp.props.autoFocus).toEqual(true)
  }),

  it('supports the input type option', ()=> {
    const comp = shallow(
      <OBSText value="bob" type="password"/>
    )
    expect(comp.find('input').props().type).toEqual('password')
  })

})
