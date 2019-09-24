<template>
  <div>
    <Header/>
    <button @click="login"></button>
    <button @click="logout"></button>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: 'login',
  components: {
    Header
  },
  methods: {
    login() {
      this.$store.dispatch('pages/login/loginUser')
    },
    logout() {
      this.$store.dispatch('pages/login/logoutUser')
    }
  }
}
</script>
