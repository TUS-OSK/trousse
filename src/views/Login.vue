<template>
  <div class="login-page">
    <div class="lg-area">
      <div class="lg-logo">Trousse</div>
      <button class="lg-login-btn" @click="login"><img class="lg-btn-img" src="@/assets/btn_google_signin_light_normal_web@2x.png"></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  methods: {
    login() {
      this.$store.dispatch('userData/login')
    }
  }
}
</script>

<style scoped>

.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgb(125, 73, 88);
}
.lg-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.lg-logo {
  width: 200px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Courgette', cursive;
  font-size: 60px;
  color: rgb(243, 225, 221);
}
.lg-btn-img {
  width: 200px;
  margin: 20px;
}

img {
  width: 200px;
}
</style>
