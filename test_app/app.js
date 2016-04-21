const React    = require('react')
const ReactDOM = require('react-dom')
const OBSUtils = require('obs_utils')
const _        = require('lodash')

const App = React.createClass({

  form: null,

  getInitialState() {
    return {
      formData: {
        first_name: 'Bob'
      }
    }
  },

  componentWillMount() {
    this.form = OBSUtils.Forms.FormBuilder.new({
      parent: this,
      onSubmit: this.onSubmit
    })
  },

  onSubmit(e, valid, builder) {
    console.log('form submitted!')
  },

  // custom validator for the last 4 of the SSN.  Just checks that the number is
  // 4 digits.
  lastFourValidator(value) {
    if (/^[0-9]{4}$/.test(value))
      return []
    else
      return ['must be 4 digits']
  },

  render() {
    var f = this.form

    return (
      <div className="row">
        <div className="col-xs-12">
          <h1>Test Form</h1>
          <hr />
        </div>
        <div className="col-xs-6">
          <f.form builder={f}>
            {f.textField('First Name', 'first_name', {required: true})}
            {f.textField('Last Name', 'last_name', {required: true})}
            {f.addressField('Address', 'address', {required: true})}
            {f.dateField('DOB', 'dob', {required: true})}
            {f.textField('Last 4 of SSN', 'ssn_last_4', {required: true, customValidator: this.lastFourValidator})}
          </f.form>
        </div>
        <div className="col-xs-6">
          <p>{_.get(this.state.formData, 'first_name')} {_.get(this.state.formData, 'last_name')}</p>
          <p>
            {_.get(this.state.formData, 'address.street_1')}
            <br />
            {_.get(this.state.formData, 'address.city')} {_.get(this.state.formData, 'address.state')}, {_.get(this.state.formData, 'address.zip')}
          </p>
        </div>
      </div>
    )
  }

})

// Render the app
ReactDOM.render(<App />, document.getElementById("test_app"))
