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
  })

})
