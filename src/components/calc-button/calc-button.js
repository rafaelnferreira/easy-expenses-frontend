import React, { Component } from 'react';
import { submitKey } from "../../js/actions/index";
import { connect } from "react-redux";
import './calc-button.css'

const mapDispatchToProps = dispatch => {
  return {
    submitKey: key => dispatch(submitKey(key))
  };
};

class ConnectedCalcButton extends Component {

    submitKey(e) {
        if(e && e.preventDefault) {
          e.preventDefault();
        }
        this.props.submitKey(this.props.numValue);
      }

    render() {
        return (
          <button type="button" className="btn calc" onClick={e => this.submitKey(e)}>
            {this.props.numValue}
          </button>
        )
      }

}

const CalcButton = connect(null, mapDispatchToProps)(ConnectedCalcButton);
export default CalcButton;