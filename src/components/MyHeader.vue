<template>
  <header class="header-page">
    <div class="hr-main">
      <router-link class="" to="/first/main">
        <div class="hr-main-logo">Trousse</div>
      </router-link>
    </div>
    <button class="hr-btn" v-bind:class='{ active : isActive }' @click="changeSidebarState">
      <span class="hr-btn-line"></span>
      <span class="hr-btn-line"></span>
      <span class="hr-btn-line"></span>
    </button>
    <transition name="slide" mode="out-in">
      <aside class="hr-sidebar" v-if="isActive">
        <transition name="nav-action">
          <nav class="hr-sb-nav">
            <router-link class="hr-link" @click.native="navigate" to="/first/user">ユーザー情報</router-link>
            <router-link class="hr-link" @click.native="navigate" to="/first/edit/base">ベースのコスメを追加</router-link>
            <router-link class="hr-link" @click.native="navigate" to="/first/edit/cheek">チークのコスメを追加</router-link>
            <router-link class="hr-link" @click.native="navigate" to="/first/edit/lip">リップのコスメを追加</router-link>
            <button @click="logout()" class="hr-sb-logout-btn">ログアウト</button>
          </nav>
        </transition>
      </aside>
    </transition>
  </header>
</template>

<script>
export default {
  name: 'my-header',
  data() {
    return {
      isActive: false,
      // scrolled: false,
      // lastPosition: 0
      isLoaded: true
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
      this.active01 = !this.active01
    }
  },
  created() {
    setTimeout(() => {
      this.isLoaded = false
    }, 2000)
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Courgette|Kosugi+Maru&display=swap');

.header-page {
  height: 52px;
}

/* z-index 3 */
.hr-btn {
  z-index: 3;
  width: 32px;
  height: 28px;
  margin-block-start: 12px;
  margin-block-end: 12px;
  padding: 0px 0px 0px;
  border: none;
  position: fixed;
  top: 0;
  right: 16px;
  background-color: rgba(255, 255, 255, 0);
}

.hr-btn-line {
  width: 100%;
  height: 4px;
  position: absolute;
  top: 0;
  right: 0;
  background-color: white;
  border-radius: 4px;
  transition: all .3s;
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
  min-width: 248px;
  padding: 8px;
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  background-color: rgba(62, 58, 57, 0.95);
}

.slide-enter-active, .slide-leave-active{
  transition: all .4s ease
}
.slide-enter, .slide-leave-to {
  right: -264px;
  filter: blur(1px);
  opacity: 0.2;
}

.hr-sb-nav {
  position: absolute;
  top: 60px;
  right: 8px;
  left: 8px;
  bottom: 8px;;
  display: flex;
  flex-direction: column;
  font-size: 20px;
	text-decoration: none;
}

.hr-link {
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
  background-color: #B25A74;
}
.hr-main-logo {
  width: 150px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Courgette', cursive;
  font-size: 40px;
  color: rgb(243, 225, 221);
}
</style>
