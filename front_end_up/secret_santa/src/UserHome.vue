<template>
  <div>
    <h1>{{username}}'s Home</h1>
    <p>{{userID}}</p>
    <div class="list" v-if="ShowList == false" v-for="list in RealList" :key="list.name">
      <h3 class="ListTitle" contenteditable="true">{{list.name}}</h3>
      <p class="ListPerson" v-for="tperson in list.persons" :key="tperson">{{tperson}}</p>
    </div>
    <div class="list" v-if="ShowList == false" v-for="ListId in ListIds" :key="ListId">
      <h3 class="ListTitle">{{getListTitle(ListId)}}</h3>
      <p class="ListPerson" v-for="person in getListNames(ListId)" :key="person">{{person}}</p>
    </div>
    <div v-if="ShowList == true">
      <label for="templistname">List name</label>
      <input type="text" id="templistname" contenteditable="true">
      <label for="tempnames">Names</label>
      <input type="text" id="tempnames" contenteditable="true">
    </div>
    <button id="CreateNewList" v-on:click="CreateNewList">{{ButtonState()}}</button>
    <button id="detele button" v-on:click="DeleteCookies()">Delete Cookies</button>
  </div>
</template>

<script>

import functions from './firebaseConfig'

let create_list = functions.httpsCallable("create_list");
let get_listIds = functions.httpsCallable("get_listIds");

export default {
  name: "userhome",
  data() {
    return {
      RealList: [
        { name: "Fun List", persons: ["sam", "mike", "ala"] },
        { name: "Bad list", persons: ["sam1", "sam2"] },
        {
          name: "awesome list",
          persons: [
            "jacob",
            "jacob's friend",
            "jacob's other friend",
            "steve",
            "pikachu"
          ]
        }
      ],
      ShowList: false,
      ListIds: []
    };
  },
  created() {
    console.log("Created Vue instance");
    get_listIds({ userId: this.userID })
      .then(result => {
        console.log(result);
        if ($cookies.isKey("UserListIds")) $cookies.remove("UserListIds");
        $cookies.set("UserListIds", result["data"], "60s");
        if ($cookies.isKey("UserListIds")) {
          this.ListIds = $cookies.get("UserListIds");
          //calling $cookies.get() produces the Vue warn
          //vue.esm.js?efeb:628 [Vue warn]: Duplicate keys detected: 'l'. This may cause an update error.
        }
      })
      .catch(function(error) {
        console.error("Error!");
        console.error(error);
      });
  },
  methods: {
    CreateNewList: function() {
      if (
        this.ShowList == true &&
        document.getElementById("templistname").value != ""
      ) {
        //remove this push when testing is complete
        this.RealList.push({
          name: document.getElementById("templistname").value,
          persons: document.getElementById("tempnames").value.split(" ")
        });
        create_list({
          userId: this.userID,
          people: document.getElementById("tempnames").value.split(" "),
          name: document.getElementById("templistname").value
        })
          .then(result => {
            this.docID = result["data"]; //this is the returned docID
            console.log(this.docID);
          })
          .catch(function(error) {
            console.error("Error!");
            console.error(error);
          });
      }
      this.ShowList = !this.ShowList;
      //use this function to to CreateNewList to list
    },
    debug: function() {
      console.log("debug");
    },
    getListTitle: ListId => {
      return "Title";
      //return the list title from database
    },
    getListNames: ListId => {
      return ["name1", "name2", "name3"];
      //return persons from database
    },
    ButtonState: function() {
      if (this.ShowList) return "Save";
      else return "Create List";
    },
    DeleteCookies: function() {
      let cookies = $cookies.keys();
      for (let cookie in cookies) {
        $cookies.remove(cookie);
      }
    }
  },
  props: ["userID", "username"]
};
</script>

<!-- This is how you comment html -->

