module.exports = {
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
  Formatters: require("./formatters/formatters")
}
