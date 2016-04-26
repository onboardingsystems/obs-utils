jest.unmock('../../app/forms/error')

import _ from 'lodash'
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import OBSError from '../../app/forms/error';

describe('OBSError', ()=> {

  it('hides if no errors', ()=> {
    const comp = TestUtils.renderIntoDocument(
      <OBSError />
    )
    const node = ReactDOM.findDOMNode(comp)

    expect(node.textContent).toEqual('')
  })

  it('displays errors', ()=> {
    const comp = TestUtils.renderIntoDocument(
      <OBSError errors={['1', '2']} />
    )
    const node = ReactDOM.findDOMNode(comp)

    expect(node.textContent).toEqual('1, 2')
  })
})
