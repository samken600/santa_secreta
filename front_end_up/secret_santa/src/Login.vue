<template>
  <div id="login">
    <h1 class="greeting">{{greeting}}</h1>
    <div id="login">
      <label for="email">Email</label>
      <input type="text" id="email">
      <label for="username">Username</label>
      <input type="text" id="username">
      <button id="submit-button" v-on:click="submit">Log in</button>
    </div>
  </div>
</template>

<script>
// import firebase from "firebase";

// let config = {
//   apiKey: "AIzaSyAUT063UC7cTHbd4fBnu3lDs7CYrRWawhA",
//   authDomain: "santa-secreta.firebaseapp.com",
//   databaseURL: "https://santa-secreta.firebaseio.com/",
//   projectId: "santa-secreta",
//   storageBucket: "santa-secreta.appspot.com",
//   messagingSenderId: "602714974736"
// };

// firebase.initializeApp(config);

import functions from "./firebaseConfig";

let login = functions.httpsCallable("login");

export default {
  name: "login",
  data() {
    return {
      greeting: "Log in to Secret Santa",
      userID: null
    };
  },
  created() {
    // do something to do with cookies such that if cookie exists, redirect to /home
    if ($cookies.isKey("UserId")) {
      this.$router.push({
        name: "home"
      });
      console.log("Cookie exists");
    }
  },
  methods: {
    submit: function() {
      let InputEmail = document.getElementById("email").value;
      let InputUsername = document.getElementById("username").value;

      login({ email: InputEmail, username: InputUsername })
        .then(result => {
          this.userID = result["data"]; //this is the returned userID
          console.log(this.userID);
          $cookies.set("UserId", result["data"], "0");
          if (result != null)
            this.$router.push({
              name: "home",
              params: { userID: this.userID, username: InputUsername }
            });
        })
        .catch(function(error) {
          console.error("Error!");
          console.error(error);
        });
    }
  }
};
</script>

<style>
</style>
