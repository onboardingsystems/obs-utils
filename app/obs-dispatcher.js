var PayloadSources = require('./constants/obs-constants.js').PayloadSources;
var Dispatcher = require('flux').Dispatcher;

var OBSDispatcher = _.extend(new Dispatcher(), {
  // @param {object} action The details of the action, including the action's
  // type and additional data coming from the server.
  handleApiAction: function(action) {
    var payload = {
      source: PayloadSources.SERVER_ACTION,
      action: action
    };
    return this.dispatch(payload);
  },

  // @param {object} action The details of the action, including the action's
  // type and additional data coming from the view.
  handleViewAction: function(action) {
    var payload = {
      source: PayloadSources.VIEW_ACTION,
      action: action
    };
    return this.dispatch(payload);
  }
});

module.exports = OBSDispatcher;
