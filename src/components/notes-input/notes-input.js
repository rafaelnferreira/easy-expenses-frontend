import React, { Component } from 'react';
import { connect } from "react-redux";
import { submitNotes, typingComments } from '../../js/actions';
import './notes-input.css';

const mapStateToProps = state => {
    return { notes: state.notes };
};

const mapDispatchToProps = dispatch => {
    return {
        submitNotes: notes => dispatch(submitNotes(notes)),
        typingComments: isTyping => dispatch(typingComments(isTyping)),
    };
};

class ConnectedNotesInput extends Component {

    typeHappens(e) {
        const code = (e.keyCode ? e.keyCode : e.which);
        if ((code === 13) || (code === 10)) {
            e.currentTarget.blur(); // this is to disable the GO action in the Adroind devices.
            e.preventDefault(); // this is to prevent triggering the next button
            return false;
        }
    }

    textChange(e) {
        this.props.submitNotes(e.target.value);
    }

    render() {
        return (
            <div className="col-12 col-lg-6">
                <label htmlFor="notes">Notes</label>
                <input type="text" className="form-control" value={this.props.notes}
                    id="notes"
                    onKeyPress={e => this.typeHappens(e)}
                    onChange={e => this.textChange(e)}
                    onFocus={e => this.props.typingComments(true)}
                    onBlur={e => this.props.typingComments(false)} />
            </div>
        )
    }
}

const NotesInput = connect(mapStateToProps, mapDispatchToProps)(ConnectedNotesInput);
export default NotesInput;