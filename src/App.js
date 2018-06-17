import React, { Component } from 'react';
import './App.css';
import { connect } from "react-redux";
import Menu from './components/menu/menu'
import CaptureEpense from './components/capture-expense/capture-expense';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import ExpenseList from './components/expense-list/expense-list';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Privacy } from './components/privacy/privacy';
import { Logout } from './components/logout/logout';
import { userLogged } from './js/actions';

const mapStateToProps = state => {
  return { 
    userLogged: state.userInfo.userFullyLogged 
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: isSignedIn => dispatch(userLogged(isSignedIn)),
  };
};

class ConnectedApp extends Component {

  componentDidMount() {
    // Client ID and API key from the Developer Console
    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

    // Array of API discovery doc URLs for APIs used by the quickstart
    const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

    // Authorization scopes required by the API; multiple scopes can be
    // included, separated by spaces.
    const SCOPES = "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.file";

    const login = this.props.login.bind(this);

    window.gapiPromise.then(() => {
      window.gapi.load('client:auth2', function () {
        window.gapi.client.init({
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES
        }).then(() => {
          window.onAuthInit();
          const auth = window.gapi.auth2.getAuthInstance();
          login(auth.isSignedIn.get());
        });
      });
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Menu />
          <Route exact path="/" render={() => (
            <Redirect to="/home" />
          )} />

          <Route exact path="/capture" render={() => (
            !this.props.userLogged ? (
              <Redirect to="/login" />
            ) : (
                <CaptureEpense />
              )
          )} />

          <Route path="/list" render={() => (
            !this.props.userLogged ? (
              <Redirect to="/login" />
            ) : (
                <ExpenseList />
              )
          )} />

          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/logout" component={Logout} />
        </div>
      </Router>
    );
  }
}

const App = connect(mapStateToProps, mapDispatchToProps)(ConnectedApp);

export default App;
