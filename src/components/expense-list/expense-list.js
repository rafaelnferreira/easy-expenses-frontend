import React, { Component } from 'react';
import { fetchLastEntries } from "../../js/actions/index";
import { connect } from "react-redux";
import { ExpenseItem } from './expense-item';
import { Loading } from '../loading/loading';

const mapDispatchToProps = dispatch => {
    return {
        fetchLastEntries: () => dispatch(fetchLastEntries())
    };
};

const mapStateToProps = state => {
    return {
        entries: state.lastEntries.entries,
        loading: state.lastEntries.loading,
        failToLoad: state.lastEntries.failToLoad,
    };
};

class ConnectedExpenseList extends Component {

    componentWillMount() {
        this.props.fetchLastEntries();
    }

    render() {
        let renderBody;

        if (this.props.loading)
            renderBody = (
                <Loading message="Loading last 10 entries..." />
            );

        else if (this.props.failToLoad)
            renderBody = (
                <div className="alert alert-danger" role="alert">
                    <h4 className="alert-heading">Oppss!</h4>
                    <p>Something wrong has happened: the server might be broken or you are just offline. </p>
                </div>
            );
        else {
            const items = this.props.entries.map((e, i) =>
                <ExpenseItem key={i} entry={e} />
            );

            renderBody = (
                <div className="list-group">

                    <div className="list-group-item list-group-item-action active">
                        Displaying last 10 created items
                    </div>

                    {items}
                </div>
            );
        }

        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-6">
                        {renderBody}
                    </div>
                </div>
            </div>
        )
    }

}

const ExpenseList = connect(mapStateToProps, mapDispatchToProps)(ConnectedExpenseList);
export default ExpenseList;