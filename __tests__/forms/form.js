jest.unmock('../../app/forms/form')

import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import OBSForm from '../../app/forms/form';

describe('OBSForm', ()=> {

  it('does not blow up', ()=> {
    const comp = TestUtils.renderIntoDocument(
      <OBSForm />
    )
    const node = ReactDOM.findDOMNode(comp)

    expect(node.textContent).toEqual('')
  })

})
