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
  }),

  it('has a default autoFocus value', ()=> {
    let comp = TestUtils.renderIntoDocument(<OBSAddressUS value="bob" attr="foo"/>)
    expect(comp.props.autoFocus).toEqual(false)
  }),

  it('sets autoFocus', ()=> {
    let comp = TestUtils.renderIntoDocument(<OBSAddressUS value="bob" attr="foo" autoFocus={true}/>)
    expect(comp.props.autoFocus).toEqual(true)
  })

})
