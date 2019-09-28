<template>
  <div>
    <Header/>
    <button @click="login">Sign In!</button>
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
    }
  }
}
</script>
