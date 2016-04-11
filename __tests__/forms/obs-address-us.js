jest.unmock('../../lib/forms/obs-address-us')

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import OBSAddressUS from '../../lib/forms/obs-address-us';

describe('OBSAddressUS', ()=> {

  it('does not blow up', ()=> {
    const comp = TestUtils.renderIntoDocument(
      <OBSAddressUS object={{a: "a"}} attr="a" />
    )
    const node = ReactDOM.findDOMNode(comp)

    expect(node.textContent).toEqual('')
  })

})
