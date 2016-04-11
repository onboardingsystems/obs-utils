jest.unmock('../../app/forms/formatted-text')
jest.unmock('../../app/forms/text')
jest.unmock('../../app/formatters/formatters')

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import OBSFormattedText from '../../app/forms/formatted-text';
import Formatters from '../../app/formatters/formatters';

describe('OBSFormattedText', ()=> {

  it('does not blow up', ()=> {
    const comp = TestUtils.renderIntoDocument(
      <OBSFormattedText object={{a: 'foo'}} attr="a" formatter={Formatters.stringFormatter} />
    )
    const node = ReactDOM.findDOMNode(comp)

    expect(node.textContent).toEqual('')
  })

})
