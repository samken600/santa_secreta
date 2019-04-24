<template>
  <div v-if="!loggedIn" id="login-app">
    <h1 class="greeting">{{greeting}}</h1>
    <form id="login">
      <label for="email">Email</label>
      <input type="text" id="email" name="user-email">
      <label for="username">Username</label>
      <input type="text" id="username" name="user-username">
      <!-- <router-link to="/log"> -->
      <input type="submit" id="submit-button" value="Log in" @click="submit">
      <!-- </router-link> -->
    </form>
    <p v-if="debug">{{userID}}</p>
  </div>
</template>

<script>
import firebase from "firebase";

let config = {
  apiKey: "AIzaSyAUT063UC7cTHbd4fBnu3lDs7CYrRWawhA",
  authDomain: "santa-secreta.firebaseapp.com",
  databaseURL: "https://santa-secreta.firebaseio.com/",
  projectId: "santa-secreta",
  storageBucket: "santa-secreta.appspot.com",
  messagingSenderId: "602714974736"
};

firebase.initializeApp(config);
let functions = firebase.app().functions("europe-west1");

export default {
  name: "app",
  data() {
    return {
      greeting: "Log in to Secret Santa",
      userID: "",
      debug: true,
      loggedIn: false
    };
  },
  methods: {
    inc: function() {
      this.value++;
    },
    submit: function() {
      let uemail = document.getElementById("email").value;
      let uusername = document.getElementById("username").value;

      let login = functions.httpsCallable("login");
      login({ email: uemail, username: uusername })
        .then(function(result) {
          console.log(result);
          this.userID = String(result);
        })
        .catch(function(error) {
          console.error(error);
        });
      this.$router.push("log");
    }
  }
};
</script>

<style>
</style>
