jest.unmock('../../app/forms/compound-layout')

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import ObsCompoundLayout from '../../app/forms/compound-layout';

describe('ObsCompoundLayout', ()=> {

  it('does not blow up', ()=> {
    const comp = TestUtils.renderIntoDocument(
      <ObsCompoundLayout />
    )
    const node = ReactDOM.findDOMNode(comp)

    expect(node.textContent).toEqual('')
  })

})
