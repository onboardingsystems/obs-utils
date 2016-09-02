'use strict';

var CHANGE_EVENT = 'change';
var Dispatcher = require('../obs-dispatcher');
var ActionTypes = require('../constants/action-types');
var EventEmitter = require('events').EventEmitter;
var _properties = {};

var _add = function _add(data) {
  var results = [];
  for (var i = 0; i < data.length; i++) {
    results.push(_properties[data[i].id.toString()] = _.omit(data[i], 'floor_plans'));
  }
  return results;
};

var _get = function _get(id) {
  return _properties[id.toString()];
};

var PropertiesStore = _.extend({}, EventEmitter.prototype, {
  emitChange: function emitChange() {
    return this.emit(CHANGE_EVENT);
  },

  addChangeListener: function addChangeListener(callback) {
    return this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function removeChangeListener(callback) {
    return this.removeListener(CHANGE_EVENT, callback);
  },

  // get all properties sorted alphabetically by name (case insensitive)
  getAll: function getAll() {
    var values = _.filter(_.values(_properties), {
      active: true
    });
    return _.sortBy(values, function (p) {
      return p.name.toLowerCase();
    });
  },

  get: function get(id) {
    return _get(id);
  },

  dispatchToken: Dispatcher.register(function (payload) {
    var action = payload.action;
    switch (action.type) {
      case ActionTypes.RECEIVE_RAW_PROPERTIES:
        _add(action.data.properties);
        break;
      default:
        return true;
    }

    PropertiesStore.emitChange();

    return true;
  })
});

module.exports = PropertiesStore;