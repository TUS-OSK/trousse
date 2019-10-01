<template>
  <div class="navigation">
    <header class="header">
      <router-link class="link" to="/main">
        <div class="logo">Trousse</div>
      </router-link>
    </header>
    <button class="btn" v-bind:class='{ active : active01 }' @click="changeSidebarState">
      <span class="line"></span>
      <span class="line"></span>
      <span class="line"></span>
    </button>
    <aside class="sidebar" v-bind:class='{ active: active01 }'>
      <nav>
        <router-link class="sublink" @click.native="resetGuideState" to="/user">ユーザー情報</router-link>
        <router-link class="sublink" @click.native="resetGuideState" to="/edit/base">ベースのコスメを追加</router-link>
        <router-link class="sublink" @click.native="resetGuideState" to="/edit/cheek">チークのコスメを追加</router-link>
        <router-link class="sublink" @click.native="resetGuideState" to="/edit/lip">リップのコスメを追加</router-link>
        <button @click="logout()" class="logout">ログアウト</button>
      </nav>
    </aside>
  </div>
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
    // destroyed() {
    // window.removeEventListener('scroll', this.handleScroll)
    // },
    // handleScroll() {
    //   if (this.lastPosition > window.scrollY) {
    //     this.scrolled = false
    //   }
    //   this.lastPosition = window.scrollY
    // },
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
  },
  created() {
    window.addEventListener('scroll', this.handleScroll)
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Courgette|Kosugi+Maru&display=swap');

a {
  text-decoration: none;
}

.navigation {
  height: 56px;
  margin-bottom: 12px;
}

/* z-index 3 */
.btn {
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
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0);
}

.line {
  width: 100%;
  height: 5px;
  position: absolute;
  left: 0;
  background-color: rgb(245, 226, 226);
  border-radius: 4px;
  transition: all .4s;
  box-sizing: border-box;
}

.btn span:nth-of-type(1) {
  top: 0;
}
.btn span:nth-of-type(2) {
  top: 12px;
}
.btn span:nth-of-type(3) {
  top: 24px;
}

.btn.active span:nth-of-type(1) {
  transform: translateY(12px) rotate(-45deg);
}
.btn.active span:nth-of-type(2) {
  opacity: 0;
}
.btn.active span:nth-of-type(3) {
  transform: translateY(-12px) rotate(45deg);
}
/* z-index 2 */
.sidebar {
  z-index: 2;
  width: 250px;
  margin: auto auto;
  position: fixed;
  top: 0px;
  right: -250px;
  bottom: 0px;
  background-color: rgba(48, 43, 49, 0.95);
  transition: all .4s;
}
.sidebar.active {
  right: 0;
}

nav {
  position: absolute;
  top: 60px;;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  font-size: 20px;
	text-decoration: none;
}

nav > * {
  padding: 12px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  color: white;
}

.logout {
  color: black;
  font-size: 20px;
}
/* z-index-1 */
.header {
  z-index: 1;
  height: 52px;
  border-bottom: 4px dotted rgb(231, 195, 200);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  background-image: linear-gradient(-45deg, #f5eeed 25%, #f4e2de 25%, #f4e2de 50%, #f5eeed 50%, #f5eeed 75%, #f4e2de 75%, #f4e2de);
  background-color: rgb(125, 73, 88);
}

/* .headroom {
  will-change: transform;
  transition: transform 200ms linear;
}
.headroom--pinned {
    transform: translateY(0%);
}
.headroom--unpinned {
    transform: translateY(-100%);
} */

.logo {
  width: 150px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Courgette', cursive;
  font-size: 40px;
  color: rgb(243, 225, 221);
}

/* z-index 0 */
.brank {
  z-index: 0;
}

</style>
