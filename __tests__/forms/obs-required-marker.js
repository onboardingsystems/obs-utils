jest.unmock('../../lib/forms/obs-required-marker')

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import OBSRequiredMarker from '../../lib/forms/obs-required-marker';

describe('OBSRequiredMarker', ()=> {

  it('hides if not required', ()=> {
    const marker = TestUtils.renderIntoDocument(
      <OBSRequiredMarker required={false} />
    )
    const markerNode = ReactDOM.findDOMNode(marker)

    expect(markerNode.textContent).toEqual('')
  })

  it('shown if required', ()=> {
    const marker = TestUtils.renderIntoDocument(
      <OBSRequiredMarker required={true} />
    )
    const markerNode = ReactDOM.findDOMNode(marker)

    expect(markerNode.textContent).toEqual('*')
  })
})
