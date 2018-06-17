import React, { Component } from 'react';

import { submitKey, clear, clearNotification, save } from "../../js/actions/index";

import { connect } from "react-redux";
import Display from '../display/display'
import CalcButton from '../calc-button/calc-button';
import CalcDatePicker from '../date-picker/date-picker';
import CategorySelector from '../category-selector/category-selector';
import NotesInput from '../notes-input/notes-input';
import CEButton from '../ce-button/ce-button';
import SaveButton from '../save-button/save-button';

import './capture-expenses.css';

const mapStateToProps = state => {
  return {
    saved: state.saved,
    typing: state.typing
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitKey: key => dispatch(submitKey(key)),
    clear: () => dispatch(clear()),
    clearNotification: () => dispatch(clearNotification()),
    save: () => dispatch(save()),
  };
};

const NUM_KEYS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

class ConnectedCaptureExpense extends Component {

  componentWillMount() {
    document.addEventListener("keydown", this._onKeyPressed.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this._onKeyPressed.bind(this));
    this.props.clearNotification();
  }

  _onKeyPressed(e) {
    if (!this.props.typing && NUM_KEYS.indexOf(e.key) > -1) {
      this.props.submitKey(Number(e.key));
    } else if (!this.props.typing && (e.key === 'Delete' || e.key === 'Backspace')) {
      this.props.clear();
    } else if (e.key === 'Enter') {
      //this.props.save();
    }
  }

  genKeys(arr) {
    return arr.map(v =>
      <div className="col-4 col-lg-2" key={v}>
        <CalcButton numValue={v} />
      </div>
    )
  }

  render() {

    const saveAlert = this.props.saved ? (
      <div className="save-message" onClick={e => this.props.clearNotification()} key="alertDiv">
        <div className="layer"> </div>
        <div className="alert alert-success alert-dismissable fade show save-snack" role="alert">
          Saved entry!
          <button type="button" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    ) : null;

    const containerClasses = saveAlert ? "container saved-state" : "container";

    return (

      <div>

        {saveAlert}

        <div className={containerClasses} tabIndex="0">

          <form onSubmit={(e) => e.preventDefault()}>


            <div className="row justify-content-center">
              <CalcDatePicker />
            </div>

            <div className="row justify-content-center">
              <CategorySelector />
            </div>

            <div className="row justify-content-center">
              <NotesInput />
            </div>

            <div className="row justify-content-center">
              <div className="col-12 col-lg-6">
                <Display></Display>
              </div>
            </div>

            <div className="row justify-content-center" style={{ paddingTop: '0px' }}>
              {this.genKeys([7, 8, 9])}
            </div>

            <div className="row justify-content-center">
              {this.genKeys([4, 5, 6])}
            </div>

            <div className="row justify-content-center">
              {this.genKeys([1, 2, 3])}
            </div>

            <div className="row justify-content-center">
              <div className="col-8 col-lg-4">
                <CalcButton numValue={0} />
              </div>
              
              <div className="col-4 col-lg-2">
                <CEButton clear={this.props.clear} />
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-12 col-lg-6">
                <SaveButton />
              </div>
            </div>

          </form>

          <p>&nbsp;</p>

        </div>

      </div>


    );
  }
}

const CaptureEpense = connect(mapStateToProps, mapDispatchToProps)(ConnectedCaptureExpense);

export default CaptureEpense;
