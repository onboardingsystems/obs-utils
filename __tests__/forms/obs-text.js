jest.unmock('../../lib/forms/obs-text')

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import OBSText from '../../lib/forms/obs-text';

describe('OBSText', ()=> {

  it('does not blow up', ()=> {
    const comp = TestUtils.renderIntoDocument(
      <OBSText />
    )
    const node = ReactDOM.findDOMNode(comp)

    expect(node.textContent).toEqual('')
  })

})
