import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userLogged } from '../../js/actions';

const mapStateToProps = state => {
    return { userLogged: state.userInfo.userFullyLogged };
};

const mapDispatchToProps = dispatch => {
    return {
      login: isSignedIn => dispatch(userLogged(isSignedIn)),
    };
  };

class ConnectedMenu extends Component {

    render() {

        const items = this.props.userLogged ?
            <React.Fragment>
                <Link className="nav-item nav-link" to="/capture">Input</Link>

                <Link className="nav-item nav-link" to="/list">List</Link>

                <Link className="nav-item nav-link" to="/logout">Logout</Link>
            </React.Fragment>
            : <React.Fragment>
                <Link className="nav-item nav-link" to="/login">Login</Link>
                <Link className="nav-item nav-link" to="/privacy">Privacy</Link>
                <a className="nav-item nav-link" href="https://github.com/rafaelnferreira/easy-expenses-frontend" target="_blank" rel="noopener noreferrer">GitHub</a>
            </React.Fragment>;

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <Link className="navbar-brand" to="/">Easy Expenses</Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        {items}
                    </div>
                </div>
            </nav>
        )
    }
}

const Menu = connect(mapStateToProps, mapDispatchToProps)(ConnectedMenu);
export default Menu;