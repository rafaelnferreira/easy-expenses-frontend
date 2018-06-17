import React, { Component } from 'react';
import './ce-button.css'

export default class CEButton extends Component {

    submitClear(e) {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        this.props.clear();
    }

    render() {
        return <button type="button" className="btn CE-Button-button" onClick={e => this.submitClear(e)}>CE</button>
    }
}