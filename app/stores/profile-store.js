var CHANGE_EVENT = 'change';
var Dispatcher = require('../obs-dispatcher');
var ActionTypes = require('../constants/action-types');
var EventEmitter = require('events').EventEmitter;
var _profile = {};

var ProfileStore = _.extend({}, EventEmitter.prototype, {
  emitChange: function() {
    return this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    return this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    return this.removeListener(CHANGE_EVENT, callback);
  },

  getProfile: function() {
    return _profile;
  },

  dispatchToken: Dispatcher.register(function(payload) {
    var action = payload.action;
    switch (action.type) {
      case ActionTypes.RECEIVE_RAW_PROFILE:
        _profile = action.data.profile;
        break;
      default:
        return true;
    }

    ProfileStore.emitChange();

    return true;
  })
});

module.exports = ProfileStore;
