import DatePicker from 'react-datepicker';
import React, { Component } from 'react';
import { connect } from "react-redux";
import 'react-datepicker/dist/react-datepicker.css';
import {submitDate} from '../../js/actions'
import './date-picker.css'

const mapStateToProps = state => {
  return { date: state.date };
};

const mapDispatchToProps = dispatch => {
    return {
      submitDate: date => dispatch(submitDate(date)),
    };
  };

class ConnectedDatePicker extends Component{

    dateChange(e){
        this.props.submitDate(e);
    }

    render(){
        return (
        <div className="col-12 col-lg-6">
            <label className="control-label" htmlFor="picker">Date</label>
            <DatePicker id="picker" className="form-control" readOnly={true} selected={this.props.date} onChange={e => this.dateChange(e)} />
        </div>
        )
        
    }
}

const CalcDatePicker = connect(mapStateToProps, mapDispatchToProps)(ConnectedDatePicker);
export default CalcDatePicker;