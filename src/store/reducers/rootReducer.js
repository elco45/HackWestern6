import authReducer from './authReducer'
import projectReducer from './projectReducer'
import workRequestReducer from './workRequestReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  workRequest: workRequestReducer,
});

export default rootReducer

// the key name will be the data property on the state object