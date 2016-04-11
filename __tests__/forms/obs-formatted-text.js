jest.unmock('../../lib/forms/obs-formatted-text')
jest.unmock('../../lib/forms/obs-text')
jest.unmock('../../lib/forms/obs-formatters')

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import OBSFormattedText from '../../lib/forms/obs-formatted-text';
import Formatters from '../../lib/forms/obs-formatters';

describe('OBSFormattedText', ()=> {

  it('does not blow up', ()=> {
    const comp = TestUtils.renderIntoDocument(
      <OBSFormattedText object={{a: 'foo'}} attr="a" formatter={Formatters.stringFormatter} />
    )
    const node = ReactDOM.findDOMNode(comp)

    expect(node.textContent).toEqual('')
  })

})
