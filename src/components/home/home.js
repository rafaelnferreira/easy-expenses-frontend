import React from 'react';
import { Link } from "react-router-dom";

export const Home = (props) => {
    return (
        <div className="container">
            <div className="row">
                <div className="jumbotron">
                    <h1 className="display-5">Easy expenses</h1>
                    <p className="lead">An old school way to control your expenses: using spreadsheets, but in a smarter way.</p>
                    <hr className="my-4" />
                    <p>How it works:.</p>
                    <ul>
                        <li>You sign in with your Google Account;</li>
                        <li>You use this application to capture your daily records;</li>
                        <li>You go to your Google Drive and do whatever you want with your data later, aggregation, pivot, charts etc..</li>
                    </ul>
                    <p>And that is it!</p>
                    <p className="lead">
                        <Link to="/login" className="btn btn-primary btn-lg" role="button">Try now</Link>
                    </p>
                </div>
            </div>
        </div>

    )
}