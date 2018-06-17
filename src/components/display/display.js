import React from "react";
import { connect } from "react-redux";
import './display.css'

const mapStateToProps = state => {
  return { amount: state.amount };
};

const ConnectedDisplay = ({ amount }) => (
    <div>
        <p className="Display-text lead">{amount}</p>
    </div>
);

const Display = connect(mapStateToProps)(ConnectedDisplay);
export default Display;