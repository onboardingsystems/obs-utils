jest.unmock('../../app/forms/name')

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Name from '../../app/forms/name';

describe('Name', ()=> {

  it('does not blow up', ()=> {
    const comp = TestUtils.renderIntoDocument(
      <Name value={{first_name: "a", last_name: "b"}} firstNameAttr="first_name" lastNameAttr="last_name" />
    )
    const node = ReactDOM.findDOMNode(comp)

    expect(node.textContent).toEqual('')
  })

})
