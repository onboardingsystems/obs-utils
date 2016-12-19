jest.unmock('../../app/forms/address-us')

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import OBSAddressUS from '../../app/forms/address-us';

describe('OBSAddressUS', ()=> {

  it('does not blow up', ()=> {
    const comp = TestUtils.renderIntoDocument(
      <OBSAddressUS attr="a" />
    )
    const node = ReactDOM.findDOMNode(comp)

    expect(node.textContent).toEqual('Address')
  })

})
