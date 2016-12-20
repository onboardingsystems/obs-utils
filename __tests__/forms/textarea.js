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
  })
  
})
