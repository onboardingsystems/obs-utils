jest.unmock('../../lib/forms/obs-textarea')

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import OBSTextarea from '../../lib/forms/obs-textarea';

describe('OBSTextarea', ()=> {

  it('does not blow up', ()=> {
    const comp = TestUtils.renderIntoDocument(
      <OBSTextarea />
    )
    const node = ReactDOM.findDOMNode(comp)

    expect(node.textContent).toEqual('')
  })

})
