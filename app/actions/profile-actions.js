var Dispatcher = require('../obs-dispatcher');
var ActionTypes = require('../constants/action-types');
var ProfileApi = require('../api/profile-api');

var ProfileActions = {
  getProfile: function() {
    return ProfileApi.getProfile();
  },

  receiveRawProfile: (profile) => {
    Dispatcher.handleApiAction({
      type: ActionTypes.RECEIVE_RAW_PROFILE,
      data: {
        profile: profile
      }
    });

    return Dispatcher.handleApiAction({
      type: ActionTypes.RECEIVE_RAW_CLIENTS,
      data: {
        clients: [profile.client]
      }
    });
  }
};

module.exports = ProfileActions;
