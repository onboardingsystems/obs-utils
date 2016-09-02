module.exports = {
  Actions: {
    FloorPlanActions:  require("./actions/floor-plan-actions"),
    ProfileActions:    require("./actions/profile-actions"),
    PropertyActions:   require("./actions/property-actions")
  },
  Api: {
    ProfileApi:        require("./api/profile-api"),
    PropertyApi:       require("./api/property-api")
  },
  Constants: {
    ActionTypes:       require("./constants/action-types"),
    KeyCodes:          require("./constants/key-codes"),
    PayloadSources:    require("./constants/payload-sources")
  },
  Forms: {
    FormBuilder:       require('./forms/form-builder'),
    AddressUS:         require('./forms/address-us'),
    CompoundLayout:    require('./forms/compound-layout'),
    Error:             require('./forms/error'),
    Form:              require('./forms/form'),
    FormattedText:     require('./forms/text'),
    Hint:              require('./forms/hint'),
    Label:             require('./forms/label'),
    RequiredMarker:    require('./forms/required-marker'),
    Text:              require('./forms/text'),
    Textarea:          require('./forms/textarea')
  },
  Formatters:          require("./formatters/formatters"),
  LoadingEllipsis:     require("./loading/ellipsis"),
  LoadingOverlay:      require("./loading/overlay"),
  LoggedInAs:          require("./logged-in-as"),
  Modal:               require("./modal"),
  OBSDispatcher:       require("./obs-dispatcher"),
  PrimaryNav:          require("./primary-nav"),
  Stores: {
    FloorPlansStore:   require("./stores/floor-plans-store"),
    ProfileStore:      require("./stores/profile-store"),
    PropertiesStore:   require("./stores/properties-store")
  }
}
