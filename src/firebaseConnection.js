import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

let firebaseConfig = {
    apiKey: "AIzaSyAKOK3di6lnI47Vjc3NN6CCjkEMKPj26gU",
    authDomain: "appmcburguer.firebaseapp.com",
    databaseURL: "https://appmcburguer-default-rtdb.firebaseio.com",
    projectId: "appmcburguer",
    storageBucket: "appmcburguer.appspot.com",
    messagingSenderId: "966091020663",
    appId: "1:966091020663:web:9d275222855f90d757a972"
  };
  
  if (!firebase.apps.length) {
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
  }

  export default firebase;