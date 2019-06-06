<template>
  <div>
    <h1>{{USERNAME}}'s Home</h1>
    <div id="ShowAllListView" v-if="ShowList == false">
      <div
        class="list"
        v-for="list in Lists"
        :key="list.name"
        @click="ViewList(list.name, list.list)"
      >
        <h3 class="ListTitle" contenteditable="true">{{list.name}}</h3>
        <p class="ListPerson" v-for="person in list.list" :key="person">{{person}}</p>
      </div>
    </div>
    <div id="AddList-View" v-if="ShowList == true">
      <label for="templistname">List name</label>
      <input type="text" id="templistname" contenteditable="true">
      <label for="tempnames">Names</label>
      <input type="text" id="tempnames" contenteditable="true">
    </div>
    <button id="CreateNewList" v-on:click="CreateNewList">{{ButtonState()}}</button>
    <button id="delete_cookie" v-on:click="DeleteCookies()">Delete Cookies</button>
    <button id="Logout" v-on:click="Logout()">Logout</button>
  </div>
</template>

<script>
import functions from "./firebaseConfig";

let create_list = functions.httpsCallable("create_list");
let get_listIds = functions.httpsCallable("get_listIds");
let get_list = functions.httpsCallable("get_list");
let get_user = functions.httpsCallable("get_user");

export default {
  name: "userhome",
  data() {
    return {
      ShowList: false,
      Lists: [],
      USERID: $cookies.get("UserId"),
      USERNAME: "",
      ListIds: []
    };
  },
  created() {
    console.log("Created UserHome instance");
    if ($cookies.isKey("UserId")) {
      get_listIds({ userId: this.USERID })
        .then(result => {
          console.log(result);
          result.data.forEach(id => {
            this.ListIds.push(id);
            let data = get_list({ listId: id })
              .then(list => {
                console.log("List ", list);
                this.Lists.push(list.data);
                return list.data;
              })
              .catch(function(error) {
                console.error(error);
                return null;
              });
          });
        })
        .catch(function(error) {
          console.error(error);
          return null;
        });
      get_user({ userId: $cookies.get("UserId") })
        .then(result => {
          console.log(result);
          console.log(result.data.username);
          this.USERNAME = result.data.username;
        })
        .catch(function(error) {
          console.error(error);
          return null;
        });
    } else {
      this.Logout();
    }
  },
  methods: {
    CreateNewList: function() {
      let temp_list;
      let temp_listname;
      if (this.ShowList) {
        temp_list = document.getElementById("tempnames").value.split(" ");
        temp_listname = document.getElementById("templistname").value;
      }
      if (this.ShowList == true && temp_listname != "") {
        //remove this push when testing is complete
        /*this.RealList.push({
          name: document.getElementById("templistname").value,
          persons: document.getElementById("tempnames").value.split(" ")
        });*/

        create_list({
          userId: this.USERID,
          people: temp_list,
          name: temp_listname
        })
          .then(result => {
            this.docID = result["data"]; //this is the returned docID
            console.log(this.docID);
          })
          .catch(function(error) {
            console.error("Error!");
            console.error(error);
          });
        this.Lists.push({ name: temp_listname, list: temp_list });
      }
      this.ShowList = !this.ShowList;
      //use this function to to CreateNewList to list
    },
    ButtonState: function() {
      if (this.ShowList) return "Save";
      else return "Create List";
    },
    DeleteCookies: function() {
      $cookies.remove("UserId");

      console.log(this.Lists);
    },
    Logout: function() {
      this.DeleteCookies();
      this.$router.push({
        name: "login"
      });
    },
    ViewList: function(name, persons) {
      console.log("List name: " + name);
      console.log("List persons: " + persons);
      this.$router.push({
        name: "list-view",
        params: { ListName: name, Persons: persons }
      });
    }
  },
  props: ["userID", "username"]
};
</script>

<!-- This is how you comment html -->

