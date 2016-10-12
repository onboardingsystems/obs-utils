const React    = require('react')
const ReactDOM = require('react-dom')
const OBSUtils = require('obs_utils')
const _        = require('lodash')
const LoadingEllipsis = require('loading/ellipsis')
const ConfirmButton = require('buttons/confirm-button')
const HoldButton = require('buttons/hold-button')

const App = React.createClass({

  form: null,

  getInitialState() {
    return {
      confirmMode: null,
      holdOn: false,
      holdDone: false,
      formData: {
        first_name: 'Bob',
        phone: '1112223333',
        sensitive: 'secret'
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
    if (valid) {
      alert('form valid and submitted!')
    }
    else {
      alert('form submitted but not valid. :(')
    }
  },

  // custom validator for the last 4 of the SSN.  Just checks that the number is
  // 4 digits.
  lastFourValidator(value) {
    if (/^[0-9]{4}$/.test(value))
      return []
    else
      return ['must be 4 digits']
  },

  handleConfirmLoading() {
    this.setState({confirmMode: "loading"});
  },

  handleConfirm() {
    this.setState({confirmMode: "confirm"});
  },

  handleConfirmTimeout() {
    this.setState({confirmMode: null});
  },

  handleHoldStart() {
    this.setState({holdOn: true});
  },

  handleHoldStop() {
    this.setState({holdOn: false});
  },

  handleHoldAction() {
    this.setState({holdOn: false, holdDone: true});
  },

  handleHoldAction() {
    this.setState({holdDone: true});
  },

  submitForm() {
    this.setState({formData: {
      first_name: 'Bobby',
      phone: '8015039733'
    }})
  },

  renderConfirmBtn() {
    var confirmText = "Delete";
    if(this.state.confirmMode == "loading") {
      return(<LoadingEllipsis>Loading</LoadingEllipsis>);
    } else if(this.state.confirmMode == "confirm") {
      return(
        <ConfirmButton onAction={this.handleConfirmLoading} onConfirm={this.handleConfirm} onTimeout={this.handleConfirmTimeout}>
          <div className="btn btn-danger">Are you sure?</div>
        </ConfirmButton>
      );
    } else {
      return(
        <ConfirmButton onAction={this.handleConfirmLoading} onConfirm={this.handleConfirm} onTimeout={this.handleConfirmTimeout}>
          <div className="btn btn-primary">Delete</div>
        </ConfirmButton>
      );
    }
  },

  render() {
    var f = this.form
    var holdClasses = "btn btn-primary";
    if(this.state.holdOn) {
      holdClasses = "btn btn-default";
    }
    if(this.state.holdDone) {
      holdClasses = "btn btn-default disabled";
    }

    return (
      <div>
        <div className="row">
          <div className="col-xs-12">
            <h1>Test Form</h1>
            <hr />
          </div>
          <div className="col-xs-6">
            <f.form builder={f} className="obs-form">
              {f.nameField('Name', {required: true})}
              {f.emailField('Email', 'email', {required: true})}
              {f.phoneField('Phone', 'phone')}
              {f.addressField('Address', 'address', {required: true})}
              {f.dateField('DOB', 'dob', {required: true})}
              {f.timeField('Lunch Hour', 'lunch_hour')}
              {f.textField('Last 4 of SSN', 'ssn_last_4', {required: true, customValidator: this.lastFourValidator})}
              {f.ssnField('SSN', 'ssn', {required: true})}
              {f.textField('Sensitive', 'sensitive', {type: "password"})}
              {f.currencyField('Bounty on your head', 'person_bounty')}
              {f.dollarsField('Monthly Income', 'monthly_income')}
              {f.ordinalField('Favorite Day of Month', 'favorite_day_month')}
              {f.checkboxField('Is Important', 'is_important')}
              {f.textarea('How do you feel?', 'feelings')}

              <input className="btn btn-success" type="submit" value="Actual Submit"/>
            </f.form>
            <button className="btn btn-default" onClick={this.submitForm}>Fake externally modified state</button>
          </div>
          <div className="col-xs-6">
            <p>{_.get(this.state.formData, 'name.first')} {_.get(this.state.formData, 'name.last')}</p>
            <p>
              {_.get(this.state.formData, 'address.street_1')}
              <br />
              {_.get(this.state.formData, 'address.city')} {_.get(this.state.formData, 'address.state')}, {_.get(this.state.formData, 'address.zip')}
            </p>
          </div>
        </div>

        <div className="row">
          <LoadingEllipsis>Testing Loading Ellipsis</LoadingEllipsis>
        </div>
        <div className="row">
          {this.renderConfirmBtn()}
        </div>
        <br/>
	<HoldButton transitionColor="#7f8c8d"/>
        <br/>
        <br/>
	<HoldButton classes={holdClasses} onStart={this.handleHoldStart} onStop={this.handleHoldStop} onAction={this.handleHoldAction}/>
        <br/>
        <br/>
	<HoldButton doneColor="#c0392b" doneIcon="times-circle-o"/>
        <br/>
        <br/>
	<HoldButton doneColor="#c0392b" doneIcon="trash"/>
        <br/>
        <br/>
        <br/>
        <br/>
      </div>
    )
  }

})

// Render the app
ReactDOM.render(<App />, document.getElementById("test_app"))
