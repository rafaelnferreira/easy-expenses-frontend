import React from 'react';

export const ExpenseItem = (props) => {
    return (
        <div className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{props.entry.category}</h5>
                <small className="text-muted">{props.entry.date}</small>
            </div>
            <p className="mb-1">{props.entry.amount}</p>
            <small className="text-muted">{props.entry.description}</small>
        </div>
    )
}