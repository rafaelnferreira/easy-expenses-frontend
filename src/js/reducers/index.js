import {
    SUBMIT_KEY, CLEAR, SELECT_CATEGORY, FETCH_CATEGORY_COMPLETE, SUBMIT_DATE, SUBMIT_NOTES, FETCH_LAST_ENTRIES_COMPLETE, FETCH_LAST_ENTRIES_LOADING, FETCH_LAST_ENTRIES_ERROR,
    CLEAR_NOTIFICATION, SAVE_SCHEDULED, TYPING_COMMENTS, USER_LOADING_INFORMATION_COMPLETE, USER_LOADING_INFORMATION, USER_LOADING_INFORMATION_ERROR, USER_LOGGED_OUT
} from '../actions';
import { combineReducers } from 'redux';
import moment from 'moment';

const initialDate = moment();

const initialLastEntries = {
    failToLoad: false,
    loading: false,
    entries: [],
}

const initialUserInfo = {
    spreadsheetId : '',
    loading: false,
    failToLoad: false,
    userFullyLogged : false,
}

function amount(state = '0.00', action) {
    switch (action.type) {
        case SUBMIT_KEY:
            const fmt = (state + action.numValue).replace('.', '');
            const size = fmt.length;
            const decimals = fmt.substring(size - 2);
            const integer = fmt.substring(0, size - 2);

            return `${Number(integer)}.${decimals}`
        case CLEAR:
            return '0.00';
        default:
            return state;
    }
}

function category(state = '', action) {
    switch (action.type) {
        case SELECT_CATEGORY:
            return action.category;
        case FETCH_CATEGORY_COMPLETE:
            return state === '' ? action.categories[0] : state;
        default:
            return state;
    }
}

function categories(state = [], action) {
    switch (action.type) {
        case FETCH_CATEGORY_COMPLETE:
            return action.categories;
        default:
            return state;
    }
}

function date(state = initialDate, action) {
    switch (action.type) {
        case SUBMIT_DATE:
            return action.date;
        default:
            return state;
    }
}

function notes(state = '', action) {
    switch (action.type) {
        case SUBMIT_NOTES:
            return action.notes;
        case CLEAR:
            return '';
        default:
            return state;
    }
}

function lastEntries(state = initialLastEntries, action) {
    switch (action.type) {
        case FETCH_LAST_ENTRIES_LOADING:
            return { ...state, loading: true };
        case FETCH_LAST_ENTRIES_COMPLETE:
            return { ...state, loading: false, entries: action.entries };
        case FETCH_LAST_ENTRIES_ERROR:
            return { ...state, loading: false, failToLoad: true };
        default:
            return state;
    }
}

function saved(state = false, action) {
    switch (action.type) {
        case SAVE_SCHEDULED:
            return true;
        case CLEAR_NOTIFICATION:
            return false;
        default:
            return state;
    }
}

function typing(state = false, action) {
    switch (action.type) {
        case TYPING_COMMENTS:
            return action.isTyping;
        default:
            return state;
    }
}

function userInfo(state = initialUserInfo, action) {
    switch (action.type) {
        case USER_LOADING_INFORMATION:
            return { ...state, loading: true, failToLoad: false, userFullyLogged: false };
        case USER_LOADING_INFORMATION_COMPLETE:
            return { ...state, loading: false, failToLoad: false, spreadsheetId: action.spreadsheetId, userFullyLogged: true };
        case USER_LOADING_INFORMATION_ERROR:
            return { ...state, loading: false, failToLoad: true, userFullyLogged: false };
        case USER_LOGGED_OUT:
        return { ...state, userFullyLogged: false, spreadsheetId: '' };
        default:
            return state;
    }
}

const calcApp = combineReducers({
    amount,
    category,
    categories,
    date,
    notes,
    lastEntries,
    saved,
    typing,
    userInfo,
});

export default calcApp