// Forms
const FormBuilder         = require('./forms/form-builder')
// import FormBuilder     from './forms/form-builder'
// import AddressUS       from './forms/address-us'
// import CompoundLayout  from './forms/compound-layout'
// import Error           from './forms/error'
// import Form            from './forms/form'
// import FormattedText   from './forms/formatted-text'
// import Hint            from './forms/hint'
// import Label           from './forms/label'
// import RequiredMarker  from './forms/required-marker'
// import Text            from './forms/text'
// import Textarea        from './forms/textarea'
// export { FormBuilder, AddressUS, CompoundLayout, Error, Form, FormattedText, Hint, Label, RequiredMarker, Text, Textarea }
//
// // Formatters
// import Formatters from './formatters/formatters'
// export { Formatters }

// const stuff = {
//   FormBuilder: require('./forms/form-builder'),
//   Form: require('./forms/form')
// }

module.exports = {
  success: true,
  Forms: {
    // AddressUS:       require('./forms/address-us'),
    // CompoundLayout:  require('./forms/compound-layout'),
    Error:           require('./forms/error')//,
    // Form:            require('./forms/form'),
    // FormattedText:   require('./forms/formatted-text'),
    // Hint:            require('./forms/hint'),
    // Label:           require('./forms/label'),
    // RequiredMarker:  require('./forms/required-marker'),
    // Text:            require('./forms/text'),
    // Textarea:        require('./forms/textarea')
  }//,
  // Formatters: require("./formatters/formatters")
}
