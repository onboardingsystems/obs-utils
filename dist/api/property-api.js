'use strict';

var axios = require("axios");
var Actions = require('../actions/property-actions.js');
var FloorPlanActions = require('../actions/floor-plan-actions.js');

var PropertyAPI = {
  getProperty: function getProperty(propertyId) {
    var promise = apiV2({
      method: 'get',
      url: "/api/v2/properties/" + propertyId
    });
    return promise.then(function (response) {
      var floor_plans = response.data.property.floor_plans;
      FloorPlanActions.receiveRawFloorPlans({
        floor_plans: floor_plans
      });
      var property = _.omit(response.data.property, 'floor_plans');
      return Actions.receiveRawProperties({
        properties: [property]
      });
    }).catch(function (error) {
      return console.error(error);
    });
  },

  // loads a list of available lease forms (join records) for the selected
  // property. Since this record contains minimal data, as soon as we receive
  // the records, turn around an perform a get so we can also have their
  // agreements to build a combined template/agreement list.
  getLeaseForms: function getLeaseForms(propertyID, libraryID, callBack) {
    var promise = apiV2({
      method: "get",
      url: "/api/v2/properties/" + propertyID + "/lease_forms"
    });
    promise.then(function (response) {
      var promises = response.data.lease_forms.map(function (join) {
        return apiV2({
          method: "get",
          url: "/api/v2/libraries/" + libraryID + "/lease_forms/" + join.id
        }).then(function (response) {
          return _.filter(response.data.templates, { kind: "lease_agreement" }).map(function (a) {
            return {
              template_id: response.data.lease_form.id,
              template_name: response.data.lease_form.name,
              agreement_id: a.id,
              agreement_name: a.name,
              agreements: join.agreements,
              addenda: join.addenda
            };
          });
        });
      });
      axios.all(promises).then(function (results) {
        callBack(_.flatten(results));
      });
    }).catch(function (error) {
      console.error(error);
    });
  }
};

module.exports = PropertyAPI;