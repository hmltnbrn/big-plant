import React from 'react';
import './SignIn.css';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signInUser } from '../../actions/authentication';

import Input from '../Local/Input/Input';
import { ErrorAlert } from '../Alerts/Error/Error'

class SignIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: ""
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
    const user = {
      username: this.state.username,
      password: this.state.password,
    }
    this.props.signInUser(user, this.props.history);
  }

  render() {

    return (
      <div className="sign-in-container">
        <div className="sign-in-form">
          <h1>Sign In</h1>
          <ErrorAlert message={this.state.error}/>
          <form onSubmit={this.handleSubmit} noValidate>
            <Input
              type="text"
              name="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleInputChange}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
            <div className="button-container">
              <button type="submit" className="button-link">Sign In</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

SignIn.propTypes = {
  signInUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps, { signInUser })(withRouter(SignIn));
