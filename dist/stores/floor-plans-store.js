'use strict';

var CHANGE_EVENT = 'change';
var Dispatcher = require('../obs-dispatcher');
var ActionTypes = require('../constants/action-types');
var EventEmitter = require('events').EventEmitter;
var _floor_plans = {};

var _add = function _add(data) {
  var results = [];
  for (var i = 0; i < data.length; i++) {
    results.push(_floor_plans[data[i].id.toString()] = data[i]);
  }
  return results;
};

var _get = function _get(id) {
  if (_.isNull(id) || _.isUndefined(id)) {
    return null;
  }
  return _floor_plans[id.toString()];
};

var FloorPlansStore = _.extend({}, EventEmitter.prototype, {
  emitChange: function emitChange() {
    return this.emit(CHANGE_EVENT);
  },

  addChangeListener: function addChangeListener(callback) {
    return this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function removeChangeListener(callback) {
    return this.removeListener(CHANGE_EVENT, callback);
  },

  get: function get(id) {
    return _get(id);
  },

  dispatchToken: Dispatcher.register(function (payload) {
    var action = payload.action;
    switch (action.type) {
      case ActionTypes.RECEIVE_RAW_FLOOR_PLANS:
        _add(action.data.floor_plans);
        break;
      default:
        return true;
    }

    FloorPlansStore.emitChange();

    return true;
  })
});

module.exports = FloorPlansStore;