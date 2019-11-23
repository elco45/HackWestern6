import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

// Replace this with your own config details
const config = {
  apiKey: 'AIzaSyC2lXDtGvwma-LiKuN_X2Gs0RZIBtqr64E',
  authDomain: 'dispatcher-866d5.firebaseapp.com',
  databaseURL: 'https://dispatcher-866d5.firebaseio.com',
  projectId: 'dispatcher-866d5',
  storageBucket: 'dispatcher-866d5.appspot.com',
  messagingSenderId: '100129663087',
  appId: '1:100129663087:web:d60338dd8b425307ddc59a',
  measurementId: 'G-FS0H4NPB7Q'
};

firebase.initializeApp(config);
firebase.firestore();
firebase.analytics();

export default firebase;
