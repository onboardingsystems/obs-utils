'use strict';

var Dispatcher = require('../obs-dispatcher');
var ActionTypes = require('../constants/action-types');

var PropertyAPIActions = {
  receiveRawProperties: function receiveRawProperties(data) {
    return Dispatcher.handleApiAction({
      type: ActionTypes.RECEIVE_RAW_PROPERTIES,
      data: {
        properties: data.properties
      }
    });
  }
};

module.exports = PropertyAPIActions;