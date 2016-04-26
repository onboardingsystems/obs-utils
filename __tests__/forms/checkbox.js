jest.unmock('../../app/forms/checkbox')

import _ from 'lodash'
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import OBSCheckbox from '../../app/forms/checkbox';

describe('OBSCheckbox', ()=> {

  it('does not blow up', ()=> {
    const comp = TestUtils.renderIntoDocument(
      <OBSCheckbox />
    )
    const node = ReactDOM.findDOMNode(comp)

    expect(node.textContent).toEqual('')
  })

})
