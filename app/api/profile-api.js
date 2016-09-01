var ApiActions = require('../actions/profile-actions');

var ProfileApi = {
  getProfile() {
    var promise = apiV2({
      method: 'get',
      url: "/api/v2/profile"
    });
    return promise.then((response) => {
      return ApiActions.receiveRawProfile(response.data.profile);
    }).catch((response) => {
      return console.error(response.stack);
    });
  }
};

module.exports = ProfileApi;
