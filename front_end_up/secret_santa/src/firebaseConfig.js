import firebase from 'firebase/app';
import 'firebase/functions';

let config = {
    apiKey: "AIzaSyAUT063UC7cTHbd4fBnu3lDs7CYrRWawhA",
    authDomain: "santa-secreta.firebaseapp.com",
    databaseURL: "https://santa-secreta.firebaseio.com/",
    projectId: "santa-secreta",
    storageBucket: "santa-secreta.appspot.com",
    messagingSenderId: "602714974736"
};
  
const fbApp = firebase.initializeApp(config);

const functions = fbApp.functions("europe-west1");

export default functions