jest.unmock('../../app/forms/address-us')

import _ from 'lodash'
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import OBSAddressUS from '../../app/forms/address-us';

describe('OBSAddressUS', ()=> {

  it('does not blow up', ()=> {
    const comp = TestUtils.renderIntoDocument(
      <OBSAddressUS object={{a: "a"}} attr="a" />
    )
    const node = ReactDOM.findDOMNode(comp)

    expect(node.textContent).toEqual('')
  })

})
