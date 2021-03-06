'use strict';

module.exports = {
  Buttons: {
    ConfirmButton: require('./buttons/confirm-button'),
    HoldButton: require('./buttons/hold-button')
  },
  Forms: {
    FormBuilder: require('./forms/form-builder'),
    AddressUS: require('./forms/address-us'),
    CompoundLayout: require('./forms/compound-layout'),
    Error: require('./forms/error'),
    Form: require('./forms/form'),
    FormattedText: require('./forms/text'),
    Hint: require('./forms/hint'),
    Label: require('./forms/label'),
    RequiredMarker: require('./forms/required-marker'),
    Text: require('./forms/text'),
    Textarea: require('./forms/textarea'),
    RadioGroup: require('./forms/radio-group')
  },
  Formatters: require("./formatters/formatters"),
  LoadingEllipsis: require("./loading/ellipsis"),
  LoadingOverlay: require("./loading/overlay")
};