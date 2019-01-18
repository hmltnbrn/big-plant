import React from 'react';
import './Header.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authentication';
import { withRouter } from 'react-router-dom';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      drawer: false
    };
    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    this.props.logoutUser(this.props.history);
  }

  render() {
    return (
      <header>
        <div className="header-container">
          <Link to="/">
            <img src={"/images/logo-small.png"} alt="logo"/>
          </Link>
          <h1>Big Plant</h1>
          <div>
            {this.props.windowWidth < 800 ?
              <i className="material-icons drawer-opener" onClick={() => this.setState({drawer: true})}>menu</i>
              : <Navigation/>
            }
          </div>
        </div>
        <SwipeableDrawer
          anchor="right"
          open={this.state.drawer}
          onClose={() => this.setState({drawer: false})}
          onOpen={() => this.setState({drawer: true})}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={() => this.setState({drawer: false})}
            onKeyDown={() => this.setState({drawer: false})}
          >
            {!this.props.auth.isAuthenticated ? (
              <div className="links-container">
                <NavLink exact to="/" className="drawer-link" activeClassName="active">Our Team</NavLink>
                <NavLink exact to="/" className="drawer-link" activeClassName="active">Contact</NavLink>
                <NavLink exact to="/" className="drawer-link" activeClassName="active">Water Us</NavLink>
                <NavLink exact to="/" className="drawer-link" activeClassName="active">Thanks!</NavLink>
                <NavLink exact to="/signin" className="drawer-link" activeClassName="active">Sign In</NavLink>
                <NavLink exact to="/signup" className="drawer-link" activeClassName="active">Sign Up</NavLink>
              </div>
              ) : (
                <div className="links-container">
                  <NavLink exact to="/" className="drawer-link" activeClassName="active">Our Team</NavLink>
                  <NavLink exact to="/" className="drawer-link" activeClassName="active">Contact</NavLink>
                  <NavLink exact to="/" className="drawer-link" activeClassName="active">Water Us</NavLink>
                  <NavLink exact to="/" className="drawer-link" activeClassName="active">Thanks!</NavLink>
                  <div className="drawer-link sign-out-button" onClick={this.onLogout}>Sign Out</div>
                </div>
              )
            }
          </div>
        </SwipeableDrawer>
      </header>
    );
  }
};

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Header));

