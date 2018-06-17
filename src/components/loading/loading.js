import React from 'react';
import spinner from './loading.svg'

export const Loading = (props) => {
    return (
        <React.Fragment>
            <div className="row justify-content-center">
                <img src={spinner} alt="loading" />

            </div>
            <div className="row justify-content-center">
                <small className="text-muted"> {props.message} </small>
            </div>
        </React.Fragment>
    )
}