'use strict';

var Dispatcher = require('../obs-dispatcher');
var ActionTypes = require('../constants/action-types');

var FloorPlanAPIActions = {
  receiveRawFloorPlans: function receiveRawFloorPlans(data) {
    return Dispatcher.handleApiAction({
      type: ActionTypes.RECEIVE_RAW_FLOOR_PLANS,
      data: {
        floor_plans: data.floor_plans
      }
    });
  }
};

module.exports = FloorPlanAPIActions;