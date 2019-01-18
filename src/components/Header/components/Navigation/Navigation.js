import React from 'react';
import './Navigation.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../../../actions/authentication';
import { withRouter } from 'react-router-dom';

import { Link } from 'react-router-dom';

class Navigation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    this.props.logoutUser(this.props.history);
  }

  render() {
    const {isAuthenticated} = this.props.auth;

    const profileButtons = () => {
      if(isAuthenticated) {
        return (
          <ul className="dropdown">
            <li><button className="button-link" onClick={this.onLogout}>Sign Out</button></li>
          </ul>
        );
      }
      else {
        return (
          <ul className="dropdown">
            <li><Link to="/signin" className="button-link">Sign In</Link></li>
            <li><Link to="/signup" className="button-link">Sign Up</Link></li>
          </ul>
        );
      }
    }
    return (
      <nav role="navigation">
        <ul>
          <li><Link to="/" className="button-link">About</Link>
            <ul className="dropdown">
              <li><Link to="/" className="button-link">Our team</Link></li>
              <li><Link to="/" className="button-link">Contact</Link></li>
              <li><Link to="/" className="button-link">Water us</Link></li>
            </ul>
          </li>
          <li><Link to="/" className="button-link">Buy us plants</Link>
            <ul className="dropdown">
              <li><Link to="/" className="button-link">Thanks!</Link></li>
            </ul>
          </li>
          <li><Link to="/" className="button-link">Profile</Link>
            {profileButtons()}
          </li>
        </ul>
      </nav>
    );
  }
};

Navigation.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Navigation));
