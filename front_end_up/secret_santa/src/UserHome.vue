<template>
  <div>
    <h1>User home</h1>
    {{userID}}
  </div>
</template>

<script>

export default {
  name: "userhome",
  props: ['userID']
}
</script>