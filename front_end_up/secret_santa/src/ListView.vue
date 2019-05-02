<template>
  <div>
    <h1>{{ListName}}</h1>
    <h3 v-for="person in Persons" :key="person">{{person}}</h3>
  </div>
</template>

<script>
export default {
  created() {},
  data() {
    return {
      my: "name"
    };
  },
  props: ["ListName", "Persons"]
};
</script>