jest.unmock('../../app/buttons/confirm-button');
jest.useFakeTimers();

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import ConfirmButton from '../../app/buttons/confirm-button';

describe('ConfirmButton', ()=> {
  it('sets default labels', () => {
    const comp = TestUtils.renderIntoDocument(
      <ConfirmButton/>
    );
    const node = ReactDOM.findDOMNode(comp);

    expect(node.textContent).toEqual('Delete');

    TestUtils.Simulate.click(node);
    expect(node.textContent).toEqual('Are you sure?');
  });

  it('ignores default labels', () => {
    var message = "Click again if you want to make a bad choice";
    var label = "Custom Label";

    const comp = TestUtils.renderIntoDocument(
      <ConfirmButton label={label} message={message}/>
    );
    const node = ReactDOM.findDOMNode(comp);

    expect(node.textContent).toEqual(label);

    TestUtils.Simulate.click(node);
    expect(node.textContent).toEqual(message);
  });

  it('should call functions', () => {
    var onConfirmFunc = jest.genMockFunction();
    var onActionFunc = jest.genMockFunction();
    const comp = TestUtils.renderIntoDocument(
      <ConfirmButton onConfirm={onConfirmFunc} onAction={onActionFunc}/>
    );
    const node = ReactDOM.findDOMNode(comp);

    // Test callback function on first click
    TestUtils.Simulate.click(node);
    expect(onConfirmFunc).toBeCalled()

    // Test callback function on confirm clicked
    TestUtils.Simulate.click(node);
    expect(onActionFunc).toBeCalled()
  });

  it('should reset after waiting', () => {
    const comp = TestUtils.renderIntoDocument(
      <ConfirmButton wait={500}/>
    );
    const node = ReactDOM.findDOMNode(comp);

    TestUtils.Simulate.click(node);
    expect(comp.state.confirm).toEqual(true);
    expect(setTimeout.mock.calls.length).toBe(0);

    // Should still be true because mouseOut hasn't fired
    jest.runAllTimers();
    expect(comp.state.confirm).toEqual(true);
    expect(setTimeout.mock.calls.length).toBe(0);

    // Should add a timeout call
    comp._onMouseOut();
    expect(setTimeout.mock.calls.length).toBe(1);
    expect(setTimeout.mock.calls[0][1]).toBe(500);

    // Should not close confirm if I'm quick about it
    comp._onMouseOver();
    jest.runAllTimers();
    expect(comp.state.confirm).toEqual(true);

    comp._onMouseOut();
    jest.runAllTimers();
    expect(comp.state.confirm).toEqual(false);
  });
})