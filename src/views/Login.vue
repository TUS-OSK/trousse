<template>
  <div>
    <Header/>
    <button @click="login">Sign In!</button>
    <button @click="logout">Sign Out!</button>
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
      this.$store.dispatch('userData/logIn')
    },
    logout() {
      this.$store.dispatch('userData/logOut')
    }
  }
}
</script>
