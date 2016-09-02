module.exports = {
  Actions: {
    ProfileActions:  require("./actions/profile-actions")
  },
  Api: {
    ProfileApi:      require("./api/profile-api")
  },
  Constants: {
    ActionTypes:     require("./constants/action-types"),
    KeyCodes:        require("./constants/key-codes"),
    PayloadSources:  require("./constants/payload-sources")
  },
  Forms: {
    FormBuilder:     require('./forms/form-builder'),
    AddressUS:       require('./forms/address-us'),
    CompoundLayout:  require('./forms/compound-layout'),
    Error:           require('./forms/error'),
    Form:            require('./forms/form'),
    FormattedText:   require('./forms/text'),
    Hint:            require('./forms/hint'),
    Label:           require('./forms/label'),
    RequiredMarker:  require('./forms/required-marker'),
    Text:            require('./forms/text'),
    Textarea:        require('./forms/textarea')
  },
  Formatters:        require("./formatters/formatters"),
  LoadingEllipsis:   require("./loading/ellipsis"),
  LoadingOverlay:    require("./loading/overlay"),
  LoggedInAs:        require("./logged-in-as"),
  Modal:             require("./modal"),
  OBSDispatcher:     require("./obs-dispatcher"),
  PrimaryNav:        require("./primary-nav"),
  Stores: {
    ProfileStore:    require("./stores/profile-store"),
    PropertiesStore: require("./stores/properties-store")
  }
}
