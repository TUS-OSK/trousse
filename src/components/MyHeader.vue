<template>
  <header id="header" class="header-page">
    <load-page pageName="main" :isLoading="transIsActive.main"></load-page>
    <load-page pageName="user" :isLoading="transIsActive.user"></load-page>
    <load-page pageName="edit/base" :isLoading="transIsActive['edit/base']"></load-page>
    <load-page pageName="edit/cheek" :isLoading="transIsActive['edit/cheek']"></load-page>
    <load-page pageName="edit/lip" :isLoading="transIsActive['edit/lip']"></load-page>
    <div class="logo-wrap  d-flex align-items-center justify-content-center">
      <button class="link" @click="navigate('main')">
        <span class="logo d-inline-block">Trousse</span>
      </button>
    </div>
    <button class="btn-wrap" :class="{ active : sidebarIsActive }" @click="changeSidebarState">
      <span class="line"></span>
      <span class="line"></span>
      <span class="line"></span>
    </button>
    <div class="navbar d-fles align-items-start" :class="{ active : sidebarIsActive }" v-if="sidebarIsActive">
      <nav class="link-wrap d-flex flex-column">
        <button class="link" @click="navigate('user')">ユーザー情報</button>
        <button class="link" @click="navigate('edit/base')">ベースのコスメを追加</button>
        <button class="link" @click="navigate('edit/cheek')">ベースのコスメを追加</button>
        <button class="link" @click="navigate('edit/lip')">ベースのコスメを追加</button>
        <button @click="logout()" class="logout-btn">ログアウト</button>
      </nav>
    </div>
  </header>
</template>

<script>
import LoadPage from '@/components/LoadPage.vue'
export default {
  name: 'my-header',
  components: {
    LoadPage
  },
  data() {
    return {
      sidebarIsActive: false,
      locate: null,
      transIsActive: {
        'main': false,
        'user': false,
        'edit/base': false,
        'edit/cheek': false,
        'edit/lip': false
      }
    }
  },
  methods: {
    changeSidebarState() {
      this.sidebarIsActive = !this.sidebarIsActive
    },
    navigate(page) {
      const path = `/first/${page}`
      Object.keys(this.transIsActive).forEach(where => {
        this.transIsActive[where] = false
      })
      this.transIsActive[page] = true
      setTimeout(() => {
        this.$router.push({ path }).catch()
      }, 300)
      this.sidebarIsActive = false
    },
    logout() {
      this.$store.dispatch('userData/logout')
      this.sideBarisActive = false
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Courgette|Kosugi+Maru&display=swap');

.header-page#header {
  z-index: 1;
  background-color: #b97085;
}

#header .link {
  background-color: transparent;
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
#header .navbar .link {
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
</style>
