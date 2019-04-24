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
  </div>
</template>

