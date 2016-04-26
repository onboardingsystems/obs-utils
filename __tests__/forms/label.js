jest.unmock('../../app/forms/label')
jest.unmock('../../app/forms/required-marker')
jest.unmock('../../app/forms/hint')

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import OBSLabel from '../../app/forms/label';

describe('OBSLabel', ()=> {

  it('hides if not being used', ()=> {
    const label = TestUtils.renderIntoDocument(
      <OBSLabel text="" hint="" />
    )
    const labelNode = ReactDOM.findDOMNode(label)

    expect(labelNode.textContent).toEqual('')
  })

  it('displays label text', ()=> {
    const label = TestUtils.renderIntoDocument(
      <OBSLabel text="test" hint="" />
    )
    const labelNode = ReactDOM.findDOMNode(label)

    expect(labelNode.textContent).toEqual('test')
  })

  it('displays required label', ()=> {
    const label = TestUtils.renderIntoDocument(
      <OBSLabel text="test" hint="" required={true} />
    )
    const labelNode = ReactDOM.findDOMNode(label)

    expect(labelNode.textContent).toEqual('test*')
  })

  it('displays hint text', ()=> {
    const label = TestUtils.renderIntoDocument(
      <OBSLabel text="" hint="hint" />
    )
    const labelNode = ReactDOM.findDOMNode(label)

    expect(labelNode.textContent).toEqual('hint')
  })
})
