jest.unmock('../../app/forms/textarea')

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import OBSTextarea from '../../app/forms/textarea';

describe('OBSTextarea', ()=> {

  it('does not blow up', ()=> {
    const comp = TestUtils.renderIntoDocument(
      <OBSTextarea object={{a: 'test'}} attr="a" />
    )
    const node = ReactDOM.findDOMNode(comp)

    expect(node.textContent).toEqual('')
  })

})
