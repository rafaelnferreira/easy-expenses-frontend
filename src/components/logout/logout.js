import React, { Component } from 'react';
import { connect } from "react-redux";
import { userLogged } from '../../js/actions';

const mapDispatchToProps = dispatch => {
    return {
      login: isSignedIn => dispatch(userLogged(isSignedIn)),
    };
  };

  const mapStateToProps = state => {
    return {
        userInfo: state.userInfo
    };
};

class ConnectedLogout extends Component {

    handleLogout() {
        window.authInited.then(() => {
            window.gapi.auth2.getAuthInstance().signOut();
            this.props.login(false);
        });
    }

    componentDidMount(){
        this.handleLogout();
    }

    componentDidUpdate() {
        if (!this.props.userInfo.userFullyLogged) {
            this.props.history.push('/home');
        }
    }

    render(){
        return <div/>
    }
}

export const Logout = connect(mapStateToProps, mapDispatchToProps)(ConnectedLogout);
