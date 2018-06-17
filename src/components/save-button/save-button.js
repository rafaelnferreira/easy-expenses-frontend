import React, { Component } from 'react';
import { save } from "../../js/actions/index";
import { connect } from "react-redux";
import './save-button.css'

const mapDispatchToProps = dispatch => {
  return {
    save: () => dispatch(save())
  };
};

class ConnectedSaveButton extends Component {

    submitKey(e) {
        if(e && e.preventDefault) {
          e.preventDefault();
        }
        this.props.save();
      }

    render() {
        return (
          <button type="button" className="save btn btn-primary" onClick={e => this.submitKey(e)}>
            Save
          </button>
        )
      }

}

const SaveButton = connect(null, mapDispatchToProps)(ConnectedSaveButton);
export default SaveButton;