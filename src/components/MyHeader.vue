<template>
  <header id="header" class="header-page">
    <div class="logo-wrap  d-flex align-items-center justify-content-center">
      <router-link to="/first/main">
        <span class="logo d-inline-block">Trousse</span>
      </router-link>
    </div>
    <button class="btn-wrap" :class="{ active : isActive }" @click="changeSidebarState">
      <span class="line"></span>
      <span class="line"></span>
      <span class="line"></span>
    </button>
    <div class="navbar d-fles align-items-start" :class="{ active : isActive }" v-if="isActive">
      <nav class="link-wrap d-flex flex-column">
        <router-link class="link" @click.native="navigate" to="/first/user">ユーザー情報</router-link>
        <router-link class="link" @click.native="navigate" to="/first/edit/base">ベースのコスメを追加</router-link>
        <router-link class="link" @click.native="navigate" to="/first/edit/cheek">チークのコスメを追加</router-link>
        <router-link class="link" @click.native="navigate" to="/first/edit/lip">リップのコスメを追加</router-link>
        <button @click="logout()" class="logout-btn">ログアウト</button>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'my-header',
  data() {
    return {
      isActive: false
      // scrolled: false,
      // lastPosition: 0
    }
  },
  methods: {
    changeSidebarState() {
      this.isActive = !this.isActive
    },
    navigate() {
      this.isActive = false
    },
    logout() {
      this.$store.dispatch('userData/logout')
      this.isActive = !this.isActive
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Courgette|Kosugi+Maru&display=swap');

.header-page#header {
  z-index: 1;
  background-color: #B25A74;
}
#header .logo {
  font-family: 'Courgette', cursive;
  font-size: 40px;
}
/* z-index 3 */
#header .btn-wrap {
  z-index: 3;
  width: 32px;
  height: 28px;
  margin: 12px;
  position: fixed;
  top: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0);
}
#header .btn-wrap .line {
  width: 100%;
  height: 4px;
  position: absolute;
  top: 0;
  right: 0;
  background-color: white;
  border-radius: 4px;
  transition: all .3s;
}

#heaedr .btn-wrap span:nth-of-type(1) {
  top: 0;
}
#header .btn-wrap span:nth-of-type(2) {
  top: 12px;
}
#header .btn-wrap span:nth-of-type(3) {
  top: 24px;
}

#header .btn-wrap.active span:nth-of-type(1) {
  transform: translateY(12px) rotate(-45deg);
}
#header .btn-wrap.active span:nth-of-type(2) {
  opacity: 0;
}
#header .btn-wrap.active span:nth-of-type(3) {
  transform: translateY(-12px) rotate(45deg);
}

/* z-index 2 */
#header .navbar {
  z-index: 2;
  min-width: 248px;
  padding: 60px 8px 8px 8px;
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  background-color: rgba(255, 255, 255, 0.95);
  transition: all .4s
}

#header .link-wrap {
  width: 100%;
}
#header .link {
  padding: 12px 24px;
  border-bottom: 1px solid gray;
  color: rgba(20, 20, 20, 0.8);
  transition: all .2s
}
#header .logout-btn {
  color: red;
  font-size: 20px;
  margin: 20px;
}

/* z-index-1 */

</style>
