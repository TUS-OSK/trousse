<template>
  <header id="header" class="header-page">
    <load-page pageName="main" :isLoading="transIsActive.main"></load-page>
    <load-page pageName="user" :isLoading="transIsActive.user"></load-page>
    <load-page pageName="edit/makeupbase" :isLoading="transIsActive['edit/makeupbase']"></load-page>
    <load-page pageName="edit/facepowder" :isLoading="transIsActive['edit/facepowder']"></load-page>
    <load-page pageName="edit/foundation" :isLoading="transIsActive['edit/foundation']"></load-page>
    <load-page pageName="edit/eyeshadow" :isLoading="transIsActive['edit/eyeshadow']"></load-page>
    <load-page pageName="edit/eyeliner" :isLoading="transIsActive['edit/eyeliner']"></load-page>
    <load-page pageName="edit/mascara" :isLoading="transIsActive['edit/mascara']"></load-page>
    <load-page pageName="edit/eyebrow" :isLoading="transIsActive['edit/eyebrow']"></load-page>
    <load-page pageName="edit/cheek" :isLoading="transIsActive['edit/cheek']"></load-page>
    <load-page pageName="edit/lipstick" :isLoading="transIsActive['edit/lipstick']"></load-page>
    <load-page pageName="edit/lipgloss" :isLoading="transIsActive['edit/lipgloss']"></load-page>

    <div class="logo-wrap d-flex align-items-center justify-content-center">
      <button class="link" @click="navigate('main')">
        <span class="logo d-inline-block">Trousse</span>
      </button>
    </div>
    <button class="btn-wrap" :class="{ active : sidebarIsActive }" @click="changeSidebarState">
      <span class="line"></span>
      <span class="line"></span>
      <span class="line"></span>
    </button>
    <div class="navbar d-flex align-items-start" :class="{ active : sidebarIsActive }">
      <nav class="link-wrap d-flex flex-column">
        <button class="link" @click="navigate('user')">ユーザー情報</button>
        <button class="link" @click="navigate('edit/makeupbase')">化粧下地のコスメを追加</button>
        <button class="link" @click="navigate('edit/facepowder')">フェイスパウダーのコスメを追加</button>
        <button class="link" @click="navigate('edit/foundation')">ファンデーションのコスメを追加</button>
        <button class="link" @click="navigate('edit/eyeshadow')">アイシャドウのコスメを追加</button>
        <button class="link" @click="navigate('edit/eyeliner')">アイライナーのコスメを追加</button>
        <button class="link" @click="navigate('edit/mascara')">マスカラのコスメを追加</button>
        <button class="link" @click="navigate('edit/eyebrow')">アイブロウのコスメを追加</button>
        <button class="link" @click="navigate('edit/cheek')">チークのコスメを追加</button>
        <button class="link" @click="navigate('edit/lipstick')">口紅のコスメを追加</button>
        <button class="link" @click="navigate('edit/lipgloss')">リップグロスのコスメを追加</button>
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
      transIsActive: {
        main: false,
        user: false,
        'edit/makeupbase': false,
        'edit/foundation': false,
        'edit/facepowder': false,
        editeyeshadow: false,
        'edit/eyeliner': false,
        'edit/mascara': false,
        'edit/eyebrow': false,
        'edit/cheek': false,
        'edit/lipstick': false,
        'edit/lipgloss': false
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
.header-page#header {
  z-index: 11;
  background-color: #b97085f5;
}

#header .link {
  background-color: transparent;
}

#header .logo {
  color: rgb(255, 238, 238);
  font-weight: 800;
  font-size: 44px;
}
#header .logo.main {
  opacity: 0;
}
/* z-index 3 */
#header .btn-wrap {
  z-index: 13;
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
  background-color: rgb(249, 222, 222);
  border-radius: 4px;
  transition: all 0.3s;
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
  width: 100vw;
  z-index: 12;
  padding: 60px 8px 8px 8px;
  position: fixed;
  top: 0;
  right: -100vw;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.95);
  transition: all 0.3s ease;
}
#header .navbar.active {
  right: 0;
}

#header .link-wrap {
  width: 100%;
}
#header .navbar .link {
  padding: 12px 24px;
  border-bottom: 1px solid gray;
  color: rgba(20, 20, 20, 0.8);
}
#header .logout-btn {
  color: red;
  font-size: 20px;
  margin: 20px;
}
</style>
