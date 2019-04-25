<template>
  <div>
    <h1>{{username}}'s Home</h1>
    <p>{{userID}}</p>
    <div id = "list" v-if="ShowList == false" v-for="list in RealList">
      <h3 class="ListTitle">{{list.name}}</h3>
      <p class ="ListPerson" v-for="person in list.persons">{{person}}</p>
    </div>
    <div v-if="ShowList == true">
      <h3>
        {{ PresentList }}
      </h3>
    </div>
    <button id=add v-on:click="add">
      +
    </button>
  </div>
</template>

<script>

export default {
  name: "userhome",
  data() {
    return {
      RealList: [
        {name: 'Fun List', persons: ['sam', 'mike', 'ala']},
        {name: 'Bad list', persons: ['sam1', 'sam2']},
        {name: 'awesome list', persons: ['jacob', "jacob's friend", "jacob's other friend", "steve", "pikachu"]},
      ],
      ShowList: false,
      PresentList: 'THIS LIST',
    };
  },
  methods:{
    add: function(){
      console.log(this.userID);
      this.RealList.push({name: 'Fun List', persons: ['sam', 'mike', 'ala']})
      //use this function to to add to list
    }
  },
  props: ["userID", "username"]
};
</script>

<!-- This is how you comment html -->

