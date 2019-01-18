import React from 'react';
import './Home.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import Plants from '../Plants/Plants';

class Home extends React.Component {
  render() {
    const {isAuthenticated} = this.props.auth;
    return (
      <div className="home-container">
        { isAuthenticated ? (
          <Plants/>
          ) : (
          <div className="signed-out-container">
            <h2>You're not logged in!</h2>
            <h3>You can't view any of the good stuff unless you're one of us.</h3>
            <div className="button-container">
              <Link to="/signin" className="button-link">Sign In</Link>
              <Link to="/signup" className="button-link">Sign Up</Link>
            </div>
          </div>
          )
        }
      </div>
    );
  }
};

Home.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Home);
