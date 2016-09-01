'use strict';

var ApiActions = require('../actions/profile-actions');

var ProfileApi = {
  getProfile: function getProfile() {
    var promise = apiV2({
      method: 'get',
      url: "/api/v2/profile"
    });
    return promise.then(function (response) {
      return ApiActions.receiveRawProfile(response.data.profile);
    }).catch(function (response) {
      return console.error(response.stack);
    });
  }
};

module.exports = ProfileApi;