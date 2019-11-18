<template>
  <div id="login" class="login-page">
    <div class="login-inner">
      <div class="logo">Trousse</div>
      <button class="login-btn" @click="login">
        <img class="google-img" src="/images/btn_google_signin_light_normal_web@2x.png">
      </button>
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

.login-page#login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgb(125, 73, 88);
}
#login .login-inner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#login .logo {
  width: 200px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Courgette', cursive;
  font-size: 60px;
  color: rgb(243, 225, 221);
}
#login .login-btn {
  background-color: transparent;
}

#login .login-btn .google-img {
  width: 200px;
  margin: 20px;
}
</style>
