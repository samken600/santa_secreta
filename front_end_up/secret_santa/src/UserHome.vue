<template>
  <div>
    <h1>{{username}}'s Home</h1>
    {{userID}}

  </div>
</template>

<script>

export default {
  name: "userhome",
  props: ['userID', 'username']
}

</script>

<!-- This is how you comment html -->