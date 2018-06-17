import { createStore, applyMiddleware } from "redux";
import calcApp from "../reducers/index";
import thunk from 'redux-thunk';

const store = createStore(
    calcApp,
    applyMiddleware(thunk),
);

export default store;