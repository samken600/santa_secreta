import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'

const config = {
	apiKey: "AIzaSyAUT063UC7cTHbd4fBnu3lDs7CYrRWawhA",
	authDomain: "santa-secreta.firebaseapp.com",
	databaseURL: "https://santa-secreta.firebaseio.com/",
	projectId: "santa-secreta",
	storageBucket: "santa-secreta.appspot.com",
	messagingSenderId: "602714974736"
};

 firebase.initializeApp(config);

new Vue({
	el: '#app',
	render: h => h(App)
  // renders the app.vue and puts in index
})
