<template>
  <div>
    <h1>{{username}}'s Home</h1>
    <p>{{userID}}</p>
    <div class="list" v-if="ShowList == false" v-for="list in RealList" :key="list.name">
      <h3 class="ListTitle" contenteditable="true">{{list.name}}</h3>
      <p class="ListPerson" v-for="person in list.persons" :key="person">{{person}}</p>
    </div>
    <div class="list" v-if="ShowList == false" v-for="ListId in ListIds" :key="ListId">
      <h3 class="ListTitle">{{getListTitle(ListId)}}</h3>
      <p class="ListPerson" v-for="person in getListNames(ListId)" :key="person">{{person}}</p>
    </div>
    <div v-if="ShowList == true">
      <label for="templistname">List name</label>
      <input type="text" id="templistname" contenteditable="true">
      <label for="tempnames">Names</label>
      <input type="text" id="tempnames" contenteditable="ture">
    </div>
    <button id="add" v-on:click="add">{{ButtonState()}}</button>
  </div>
</template>

<script>
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
        this.ListIds = result["data"];
      })
      .catch(function(error) {
        console.error("Error!");
        console.error(error);
      });
  },
  methods: {
    add: function() {
      console.log(this.userID);
      /*this.RealList.push({
        name: "List name",
        persons: ["sam", "mike", "ala"]
      });*/
      if (
        this.ShowList == true &&
        document.getElementById("templistname").value != ""
      ) {
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
      //use this function to to add to list
    },
    debug: function() {
      console.log("debug");
    },
    getListTitle: ListId => {
      return "Title";
    },
    getListNames: ListId => {
      return ["name1", "name2", "name3"];
    },
    ButtonState: function() {
      if (this.ShowList) return "Save";
      else return "Create List";
    }
  },
  props: ["userID", "username"]
};
</script>

<!-- This is how you comment html -->

