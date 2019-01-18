import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { signUpUser } from '../../actions/authentication';
import './SignUp.css';

import Input from '../Local/Input/Input';
import { ErrorAlert } from '../Alerts/Error/Error'

class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      email: "",
      error: "",
      usernameError: "",
      passwordError: "",
      firstNameError: "",
      lastNameError: "",
      emailError: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.auth.isAuthenticated) {
      this.props.history.push('/')
    }
    if(nextProps.error) {
      this.setState({
        error: nextProps.error
      });
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,63})+$/;
    let passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}/;
    let validEmail = true;
    let validPassword = true;

    !this.state.username ? this.setState({usernameError: "Required field"}) : this.setState({usernameError: false});
    !this.state.firstName ? this.setState({firstNameError: "Required field"}) : this.setState({firstNameError: false});
    !this.state.lastName ? this.setState({lastNameError: "Required field"}) : this.setState({lastNameError: false});

    if (!this.state.email) {
      this.setState({emailError: "Required field"})
      validEmail = false;
    }
    else if(!emailRegex.test(this.state.email)) {
      this.setState({emailError: "Not a valid email"});
      validEmail = false;
    }
    else {
      this.setState({emailError: false});
      validEmail = true;
    }
    if (!this.state.password) {
      this.setState({passwordError: "Required field"})
      validPassword = false;
    }
    else if(!passwordRegex.test(this.state.password)) {
      this.setState({passwordError: "Not a valid password"});
      validPassword = false;
    }
    else if(this.state.password !== this.state.confirmPassword) {
      this.setState({passwordError: "Passwords do not match"});
      validPassword = false;
    }
    else {
      this.setState({passwordError: false});
      validPassword = true;
    }

    if (this.state.username && validEmail === true && validPassword && this.state.firstName && this.state.lastName) {
      this.signUp();
    }
  }

  signUp() {
    const user = {
      username: this.state.username,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email
    };
    this.props.signUpUser(user, this.props.history);
  }

  render() {

    return (
      <div className="sign-up-container">
        <div className="sign-up-form">
          <h1>Sign Up</h1>
          <ErrorAlert message={this.state.error}/>
          <form onSubmit={this.handleSubmit} noValidate>
            <Input
              type="text"
              name="username"
              placeholder="Username"
              value={this.state.username}
              errorText={this.state.usernameError}
              onChange={this.handleInputChange}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              errorText={this.state.passwordError}
              onChange={this.handleInputChange}
            />
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={this.state.confirmPassword}
              errorText={this.state.passwordError}
              onChange={this.handleInputChange}
            />
            <Input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={this.state.firstName}
              errorText={this.state.firstNameError}
              onChange={this.handleInputChange}
            />
            <Input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={this.state.lastName}
              errorText={this.state.lastNameError}
              onChange={this.handleInputChange}
            />
            <Input
              type="text"
              name="email"
              placeholder="Email"
              value={this.state.email}
              errorText={this.state.emailError}
              onChange={this.handleInputChange}
            />
            <div className="button-container">
              <button type="submit" className="button-link">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

SignUp.propTypes = {
  signUpUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps,{ signUpUser })(withRouter(SignUp));
