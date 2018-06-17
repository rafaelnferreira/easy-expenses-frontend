import { get, post } from '../services/http-util'

export const USER_LOGGED = 'USER_LOGGED';
export const USER_LOADING_INFORMATION = 'USER_LOADING_INFORMATION';
export const USER_LOADING_INFORMATION_COMPLETE = 'USER_LOADING_INFORMATION_COMPLETE';
export const USER_LOADING_INFORMATION_ERROR = 'USER_LOADING_INFORMATION_ERROR';
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';

export const SUBMIT_KEY = 'SUBMIT_KEY';
export const CLEAR = 'CLEAR';
export const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION';
export const SELECT_CATEGORY = 'SELECT_CATEGORY';
export const FETCH_CATEGORY = 'FETCH_CATEGORY';
export const FETCH_CATEGORY_COMPLETE = 'FETCH_CATEGORY_COMPLETE';
export const SUBMIT_DATE = 'SUBMIT_DATE';
export const SUBMIT_NOTES = 'SUBMIT_NOTES';
export const SAVE_ENTRY = 'SAVE_ENTRY';
export const SAVE_SCHEDULED = 'SAVE_SCHEDULED';
export const TYPING_COMMENTS = 'TYPING_COMMENTS';

export const FETCH_LAST_ENTRIES = 'FETCH_LAST_ENTRIES';
export const FETCH_LAST_ENTRIES_LOADING = 'FETCH_LAST_ENTRIES_LOADING';
export const FETCH_LAST_ENTRIES_COMPLETE = 'FETCH_LAST_ENTRIES_COMPLETE';
export const FETCH_LAST_ENTRIES_ERROR = 'FETCH_LAST_ENTRIES_ERROR';

export const userLoadingInformation = () => {
  return {
    type: USER_LOADING_INFORMATION,
  }
}

export const userLoadingInformationError = () => {
  return {
    type: USER_LOADING_INFORMATION_ERROR,
  }
}

export const userLoadingInformationComplete = spreadsheetId => {
  return {
    type: USER_LOADING_INFORMATION_COMPLETE,
    spreadsheetId : spreadsheetId,
  }
}

export const userLoggedOut = () => {
  localStorage.removeItem('spreadsheetId');
  return {
    type: USER_LOGGED_OUT
  }
}

export const retrieveUserInfo = (dispatch) => {
  if (navigator.onLine){
    post('/api/v1/spreadsheets')
        .then(response => response.json())
        .then(json => {
          localStorage.setItem('spreadsheetId', json.spreadsheetId)
          dispatch(userLoadingInformationComplete(json.spreadsheetId))
        })
        .catch(e => dispatch(userLoadingInformationError()))
  } else {
    const spreadsheetId = localStorage.getItem('spreadsheetId');
    
    if ( !spreadsheetId || 0 === spreadsheetId.length )
      dispatch(userLoadingInformationComplete(spreadsheetId))
    else
      dispatch(userLoadingInformationError())
  }
}

export const userLogged = isSignedIn => {
  return (dispatch, getState) => {
    const { userInfo } = getState()
    // The google API might send multiple signals, and this can be a problem
    // this tries to ensure that only one attempt can be made at time
    if (isSignedIn && !userInfo.loading) {
      dispatch(userLoadingInformation());
      retrieveUserInfo(dispatch);
    } else {
      dispatch(userLoggedOut());
    }
  }
}

// export const userInformationRetrieved = (isSignedIn, spreadsheetId) => {
//   return {
//     type: USER_LOGGED,
//     isSignedIn,
//     spreadsheetId
//   }
// }

export const submitKey = numValue => {
  return {
    type: SUBMIT_KEY,
    numValue
  }
}

export const submitDate = date => {
  return {
    type: SUBMIT_DATE,
    date
  }
}

export const submitNotes = notes => {
  return {
    type: SUBMIT_NOTES,
    notes
  }
}

export const clear = () => {
  return {
    type: CLEAR
  }
}

export const clearNotification = () => {
  return {
    type: CLEAR_NOTIFICATION
  }
}

export const selectCategory = category => {
  return {
    type: SELECT_CATEGORY,
    category
  }
}

export const fetchCategories = () => {
  return (dispatch, getState) => {

    const storedCategories = localStorage.getItem('categories');
    if (storedCategories && !navigator.onLine) {
      const jsonCategories = JSON.parse(storedCategories);
      console.info('Offline: using categories saved previously.');
      return Promise.resolve(dispatch(fetchCategoriesSuccess(jsonCategories)));
    }

    const { userInfo } = getState();

    return get('/api/v1/categories?spreadsheetId=' + userInfo.spreadsheetId)
      .then(response => response.json())
      .then(body => {
        const cat = body['categories'];
        localStorage.setItem('categories', JSON.stringify(cat));
        return dispatch(fetchCategoriesSuccess(cat))
      })
      .catch(err => console.error(err));
  }
}

export const fetchCategoriesSuccess = categories => {
  return {
    type: FETCH_CATEGORY_COMPLETE,
    categories
  }
}

export const typingComments = isTyping => {
  return {
    type: TYPING_COMMENTS,
    isTyping: isTyping
  }
}

export const fetchLastEntries = () => {
  return (dispatch, getState) => {
    if (navigator.onLine) {
      dispatch(fetchLastEntriesLoading());

      const { userInfo } = getState();

      return get('/api/v1/entries?spreadsheetId=' + userInfo.spreadsheetId)
        .then(response => response.json())
        .then(entries => dispatch(fetchLastEntriesSuccess(entries.entries)))
        .catch(err => dispatch(fetchLastEntriesError()));

    } else {
      return dispatch(fetchLastEntriesError());
    }
  }
}

export const fetchLastEntriesSuccess = entries => {
  return {
    type: FETCH_LAST_ENTRIES_COMPLETE,
    entries
  }
}

export const fetchLastEntriesLoading = () => {
  return {
    type: FETCH_LAST_ENTRIES_LOADING,
  }
}

export const fetchLastEntriesError = () => {
  return {
    type: FETCH_LAST_ENTRIES_ERROR,
  }
}

function saveLater(entry) {
  const pending = JSON.parse(localStorage.getItem('pendingEntries'));
  const update = pending ? [...pending, entry] : [entry];
  localStorage.setItem('pendingEntries', JSON.stringify(update));
}

export const save = () => {
  return (dispatch, getState) => {
    const { amount, category, date, notes, userInfo } = getState();
    const entry = {
      spreadsheetId: userInfo.spreadsheetId,
      entry: {
        amount: `-${amount}`,
        description: notes,
        category: category,
        date: date.format('MM/DD/YYYY')
      }
    };

    if (navigator.onLine) {
      postEntry(entry)
        .then(res => console.info('Created entry!'))
        .catch(err => {
          console.error('fail, a new attempt will be made later');
          saveLater(entry);
        });
    } else {
      saveLater(entry);
    }

    dispatch(saveScheduled());
    return dispatch(clear());
  }
}

export const saveScheduled = () => {
  return {
    type: SAVE_SCHEDULED
  }
}

function postEntry(entry) {
  return post('/api/v1/entries?spreadsheetId=' + entry.spreadsheetId, entry.entry);
}

function postPendingEntries() {
  if (navigator.onLine) {
    const pendingEntries = JSON.parse(localStorage.getItem('pendingEntries'));
    if (pendingEntries) {
      pendingEntries.forEach(p => postEntry(p));
    }
    localStorage.removeItem('pendingEntries');
  }
}

// Test this by running the code snippet below and then
// use the "Offline" checkbox in DevTools Network panel
window.addEventListener('load', function () {
  function updateOnlineStatus(event) {
    if (navigator.onLine) {
      // handle online status
      console.log('online - flushing pending requests');
      postPendingEntries();
    } else {
      // handle offline status
      console.log('offline');
    }
  }

  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
});