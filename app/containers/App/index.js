/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginPage from 'containers/LoginPage';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { setCurrentUser } from './actions';
import './App.css';

class MainApp extends Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const user = localStorage.getItem('currentUser') || null;
    if (user) this.props.setCurrentUser(JSON.parse(user));
  }

  render() {
    const nickname = this.props.currentUser.nickname || false;
    return (
      <div>
        <h1 className="userStat">{ nickname && nickname }</h1>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

MainApp.propTypes = {
  currentUser: PropTypes.object,
  setCurrentUser: PropTypes.func,
};

const mapStateToProps = state => ({
  currentUser: state.get('global').get('currentUser'),
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainApp);
