import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Plant from './components/Plant/Plant';
import NotFound from './components/NotFound/NotFound';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth
    };
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.setState({windowWidth: window.innerWidth});
  }

  render() {
    return (
      <div className="app-components">
        <Header windowWidth={this.state.windowWidth}/>
        <main>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/signin" component={SignIn}/>
            <Route path="/signup" component={SignUp}/>
            <Route path="/plants/:id" component={Plant}/>
            <Route component={NotFound}/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
