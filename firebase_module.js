const {initializeApp} = require('firebase/app')
const { getDatabase } = require('firebase/database');
const { getFirestore } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyBYgGuPlBm0mPVJt3SqOfhNBZUd_wbb2N0",
  authDomain: "mm300-2df21.firebaseapp.com",
  databaseURL: "https://mm300-2df21-default-rtdb.firebaseio.com",
  projectId: "mm300-2df21",
  storageBucket: "mm300-2df21.appspot.com",
  messagingSenderId: "162320643708",
  appId: "1:162320643708:web:b09047cb7b3786253abbf9",
  measurementId: "G-EXC2ERDQS1"
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);
const firestore = getFirestore(firebaseApp)

module.exports = {
  database,
  firestore
}
