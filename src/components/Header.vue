<template>
  <header>
    <router-link class="link" to="/main">
      <h1>Trousse</h1>
    </router-link>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
h1 {
  color: red;
}

header {
  border-bottom: 2px dotted black;
  display: flex;
  flex-direction: row;
}
</style>
