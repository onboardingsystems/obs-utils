// jest.unmock('../../app/forms/text')

import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {shallow, render, mount} from 'enzyme';
import OBSRadioGroup from '../../app/forms/radio-group';

describe('OBSRadioGroup', ()=> {

  it('does not blow up', ()=> {
    const comp = shallow(
      <OBSRadioGroup value="bob"/>
    )
    expect(comp.find('input').props().value).toEqual('bob')
  }),

  it('has a default autoFocus value', ()=> {
    let comp = TestUtils.renderIntoDocument(<OBSRadioGroup value="bob"/>)
    expect(comp.props.autoFocus).toEqual(false)
  }),

  it('sets autoFocus', ()=> {
    let comp = TestUtils.renderIntoDocument(<OBSRadioGroup value="bob" autoFocus={true}/>)
    expect(comp.props.autoFocus).toEqual(true)
  })

})
