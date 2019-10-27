<template>
  <div class="first-page" :class="{ main : $route.name === 'main' }">
    <my-header />
    <router-view></router-view>
  </div>
</template>

<script>
import MyHeader from '@/components/MyHeader.vue'

export default {
  name: 'first',
  components: {
    MyHeader
  }
}
</script>

<style scoped>
 .first-page  {
  min-height: 100vh;
  background-color: #b97085;
}

.first-page .header-page {
  position: sticky;
  top: 0;
}

.first-page.main {
  padding-top: 160px;
}
</style>
