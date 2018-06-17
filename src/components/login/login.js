import React from 'react';
import { withRouter } from 'react-router-dom';
import { userLogged } from '../../js/actions';
import { connect } from "react-redux";
import { Loading } from '../loading/loading';

const mapStateToProps = state => {
    return {
        userInfo: state.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        login: isSignedIn => dispatch(userLogged(isSignedIn)),
    };
};

class ConnectedLogin extends React.Component {

    componentDidMount() {

        const signInHandler = ((isSignedIn) => {
            this.props.login(isSignedIn);
        });

        window.authInited.then(() => {
            window.gapi.signin2.render('g-signin2', {
                'width': 250,
                'height': 50,
                'longtitle': true,
                'theme': 'dark',
            });

            const auth = window.gapi.auth2.getAuthInstance();
            signInHandler(auth.isSignedIn.get());

            // Listen for sign-in state changes.
            auth.isSignedIn.listen(signInHandler);
        });
    }

    componentDidUpdate() {
        if (this.props.userInfo.userFullyLogged) {
            this.props.history.push('/capture');
        }
    }

    render() {
        const error = this.props.userInfo.failToLoad ? (<div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Oppss!</h4>
            <p>Something wrong has happened: Unable to sign in you at this time, please try again shortly by refreshing the page. </p>
        </div>) : null;

        const loginContent = this.props.userInfo.loading ? (
            <Loading message="Logging you in..." />)
            : (
                <div className="container">
                    <div className="row justify-content-center">
                        <div id="g-signin2"></div>
                    </div>
                </div>
            );

        return (
            <React.Fragment>
                {loginContent}

                {error}
            </React.Fragment>
        );

    };
}

const ConnectedLoginWithRouter = withRouter(ConnectedLogin);
export const Login = connect(mapStateToProps, mapDispatchToProps)(ConnectedLoginWithRouter);