import React, { Component } from 'react';
import { selectCategory, fetchCategories } from "../../js/actions/index";
import { connect } from "react-redux";
import './category-selector.css'

const mapDispatchToProps = dispatch => {
    return {
        selectCategory: category => dispatch(selectCategory(category)),
        fetchCategories: () => dispatch(fetchCategories()),
    };
};

const mapStateToProps = state => {
    return {
        categories: state.categories,
        category: state.category
    };
};

class ConnectedCategorySelector extends Component {

    componentDidMount() {
        this.props.fetchCategories();
    }

    handleChange(event) {
        this.props.selectCategory(event.target.value);
    }

    render() {
        return (
            <div className="col-12 col-lg-6">
                <label htmlFor="categoryPicker">Category</label>
                <select id="categoryPicker" className="form-control" value={this.props.category} onChange={e => this.handleChange(e)}>
                    {this.props.categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
            </div>
        )
    }

}

const CategorySelector = connect(mapStateToProps, mapDispatchToProps)(ConnectedCategorySelector);
export default CategorySelector;