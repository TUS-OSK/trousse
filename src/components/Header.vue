<template>
  <header class="header-page">
    <div class="hr-main">
      <router-link class="" to="/main">
        <div class="hr-main-logo">Trousse</div>
      </router-link>
    </div>
    <button class="hr-btn" v-bind:class='{ active : active01 }' @click="changeSidebarState">
      <span class="hr-btn-line"></span>
      <span class="hr-btn-line"></span>
      <span class="hr-btn-line"></span>
    </button>
    <aside class="hr-sidebar" v-bind:class='{ active: active01 }'>
      <nav class="hr-sb-nav">
        <router-link class="sublink" @click.native="resetGuideState" to="/user">ユーザー情報</router-link>
        <router-link class="sublink" @click.native="resetGuideState" to="/edit/base">ベースのコスメを追加</router-link>
        <router-link class="sublink" @click.native="resetGuideState" to="/edit/cheek">チークのコスメを追加</router-link>
        <router-link class="sublink" @click.native="resetGuideState" to="/edit/lip">リップのコスメを追加</router-link>
        <button @click="logout()" class="hr-sb-logout-btn">ログアウト</button>
      </nav>
    </aside>
  </header>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    changeSidebarState() {
      this.active01 = !this.active01
    },
    resetGuideState() {
      this.active01 = false
    },
    logout() {
      this.$store.dispatch('userData/logout')
      this.active01 = !this.active01
    }
  },
  data() {
    return {
      isGuided: false,
      active01: false
      // scrolled: false,
      // lastPosition: 0
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Courgette|Kosugi+Maru&display=swap');

.header-page {
  height: 56px;
  margin-bottom: 12px;
}

/* z-index 3 */
.hr-btn {
  z-index: 3;
  margin-block-start: 12px;
  margin-block-end: 12px;
  padding: 0px 0px 0px;
  border: none;
  position: fixed;
  top: 0;
  right: 16px;
  width: 36px;
  height: 32px;
  background-color: rgba(255, 255, 255, 0);
}

.hr-btn-line {
  width: 100%;
  height: 5px;
  position: absolute;
  left: 0;
  background-color: rgb(245, 226, 226);
  border-radius: 4px;
  transition: all .4s;
  box-sizing: border-box;
}

.hr-btn span:nth-of-type(1) {
  top: 0;
}
.hr-btn span:nth-of-type(2) {
  top: 12px;
}
.hr-btn span:nth-of-type(3) {
  top: 24px;
}

.hr-btn.active span:nth-of-type(1) {
  transform: translateY(12px) rotate(-45deg);
}
.hr-btn.active span:nth-of-type(2) {
  opacity: 0;
}
.hr-btn.active span:nth-of-type(3) {
  transform: translateY(-12px) rotate(45deg);
}
/* z-index 2 */
.hr-sidebar {
  z-index: 2;
  width: 248px;
  padding: 8px;
  position: fixed;
  top: 0px;
  right: -264px;
  bottom: 0px;
  background-color: rgba(48, 43, 49, 0.95);
  transition: all .4s;
}
.hr-sidebar.active {
  right: 0px;
}

.hr-sb-nav {
  position: absolute;
  top: 60px;
  right: 8px;
  bottom: 8px;;
  display: flex;
  flex-direction: column;
  font-size: 20px;
	text-decoration: none;
}

.hr-sb-nav > * {
  padding: 12px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  color: white;
}

.hr-sb-logout-btn {
  color: black;
  font-size: 20px;
  width: 248px;
}
/* z-index-1 */
.hr-main {
  z-index: 1;
  height: 52px;
  width: 100vw;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  background-image: linear-gradient(-45deg, #7d4958 25%, #b36279 25%, #b36279 50%, #7d4958 50%, #7d4958 75%, #b36279 75%, #b36279);
}
.hr-main-logo {
  width: 150px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Courgette', cursive;
  font-size: 40px;
  color: rgb(243, 225, 221);
}
</style>
