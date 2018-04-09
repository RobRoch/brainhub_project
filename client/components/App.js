import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';

var querystring = require('querystring');

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      date: '',
      msg: '',
      isValid: false
    }
    this.onClick = this.onClick.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.insertNewRegistry = this.insertNewRegistry.bind(this);
  }

  onClick(e) {
    this.insertNewRegistry(this);
  }

  validate(f, l, e, d) {
    var nameReg = /^[a-z ,.'-]+$/i;
    var emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var dateReg = /^(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))$/;
    var msg = '';
    !nameReg.test(f)  ? msg += "First name not valid. " : '';
    !nameReg.test(l)  ? msg += "Last name not valid. " : '';
    !emailReg.test(e) ? msg += "Email address not valid. " : '';
    !dateReg.test(d)  ? msg += "Date not valid. " : '';
    if (msg) {
      this.state.msg = msg;
      return false;
    } else {
      this.state.isValid = true;
      return true;
    }
  }


  insertNewRegistry(e) {
    if (!this.validate(e.state.firstName, e.state.lastName, e.state.email, e.state.date)) {
      console.log("Failed to validate fields. " + e.state.msg);
      ReactDOM.render(e.state.msg, document.getElementById('validation'));
    } else {
      axios.post('/insert',
        querystring.stringify({
          fName: e.state.firstName,
          lName: e.state.lastName,
          email: e.state.email,
          date: e.state.date
        }), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(function (response) {
          console.log("Registered in db.");
          e.setState({
            messageFromServer: response.data
          });
        });
    }
  }

  handleTextChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }

  render() {
    return (
      <div id="login-box">
        <div className="center">
          <h1>Sign up Brainhub</h1>
    
          <input type="text" id="firstName" name="firstName"  value={this.state.firstName} onChange={this.handleTextChange} placeholder="First Name"/>
          <input type="text" id="lastName" name="lastName" value={this.state.lastName} onChange={this.handleTextChange} placeholder="Last Name" />
          <input type="text" id="email" name="email" value={this.state.email} onChange={this.handleTextChange} placeholder="E-mail" />
          <input type="date" id="date" name="date" value={this.state.date} onChange={this.handleTextChange} />
          
          <input type="submit" name="signup_submit" value="Register" onClick={this.onClick}/>
          <h2 id='validation'></h2>
        </div>
      </div>
    );
  }
}