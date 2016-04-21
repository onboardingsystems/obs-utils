const React    = require('react')
const ReactDOM = require('react-dom')
const OBSUtils = require('obs_utils')
const _        = require('lodash')

const App = React.createClass({

  form: null,

  getInitialState() {
    return {
      data: {
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
      <div>
        Hello from react

        <f.form builder={f}>
          {f.textField('First Name', 'first_name', {required: true})}
          {f.textField('Last Name', 'last_name', {required: true})}
          {f.addressField('Address', 'address', {required: true})}
          {f.dateField('DOB', 'dob', {required: true})}
          {f.textField('Last 4 of SSN', 'ssn_last_4', {required: true})}
        </f.form>

        <p>{_.get(this.state.data, 'first_name')} {_.get(this.state.data, 'last_name')}</p>
        <p>
          {_.get(this.state.data, 'address.street')}
          <br />
          {_.get(this.state.data, 'address.city')} {_.get(this.state.data, 'address.state')}, {_.get(this.state.data, 'address.zip')}
        </p>
      </div>
    )
  }

})

// Render the app
ReactDOM.render(<App />, document.getElementById("test_app"))

  //
  //
  //
  // render() {
  //
  //
  //   return (
  //     <div id="form">
  //       <pre>
  //         {stuff}
  //       </pre>
  //


  //       <div className="button-bar">
  //         <button id="back_btn" onClick={this.props.prevStep}>Back</button>
  //       </div>
  //     </div>
