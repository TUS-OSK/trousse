<template>
  <div class="first-page">
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
  },
  data() {
    return {
      isLoaded: false
    }
  }
}
</script>

<style scoped>
 .first-page  {
  min-height: 100vh;
  background-color: rgb(250, 244, 246);
}
</style>
