<template>
  <div v-if="!loggedIn" id="login">
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
let login = functions.httpsCallable("login");

export default {
  name: "login",
  data() {
    return {
      greeting: "Log in to Secret Santa",
      debug: true,
      loggedIn: false,
      userID: "empty"
    };
  },
  methods: {
    inc: function() {
      this.value++;
    },
    submit: function() {
      let uemail = document.getElementById("email").value;
      let uusername = document.getElementById("username").value;

      login({ email: uemail, username: uusername })
        .then((result) => {
          console.log(result);
          // this.userID = result;
          // if(result != null) this.$router.push({path: "log"});
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
