jest.unmock('../../app/forms/hint')

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import OBSHint from '../../app/forms/hint';

describe('OBSHint', ()=> {

  it('displays text passed in', ()=> {
    const marker = TestUtils.renderIntoDocument(
      <OBSHint hint="Stuff" />
    )
    const markerNode = ReactDOM.findDOMNode(marker)

    expect(markerNode.textContent).toEqual('Stuff')
  })
  
})
