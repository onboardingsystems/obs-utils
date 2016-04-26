jest.unmock('../../app/forms/text')

import _ from 'lodash'
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import OBSText from '../../app/forms/text';

describe('OBSText', ()=> {

  it('does not blow up', ()=> {
    const comp = TestUtils.renderIntoDocument(
      <OBSText object={{a: 'hi'}} attr="a"/>
    )
    const node = ReactDOM.findDOMNode(comp)

    expect(node.textContent).toEqual('')
  })

})
