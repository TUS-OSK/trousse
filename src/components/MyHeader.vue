<template>
  <header id="header" class="header-page">
    <load-page pageName="main" :isLoading="transIsActive.main"></load-page>
    <load-page pageName="help" :isLoading="transIsActive.help"></load-page>
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
    <button class="nav-btn" :class="{ active: sidebarIsActive }" @click="changeSidebarState">
      <span class="line"></span>
      <span class="line"></span>
      <span class="line"></span>
    </button>
    <div
      class="navbar d-flex align-items-start justify-content-center"
      :class="{ active: sidebarIsActive }"
    >
      <nav class="link-wrap d-flex flex-column">
        <button class="link" @click="navigate('help')">ヘルプ</button>
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
        help: false,
        user: false,
        'edit/makeupbase': false,
        'edit/foundation': false,
        'edit/facepowder': false,
        'edit/eyeshadow': false,
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
      this.sidebarIsActive = false
      setTimeout(() => {
        this.$router.push({ path }).catch()
      }, 300)
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
#header .nav-btn {
  z-index: 13;
  width: 32px;
  height: 28px;
  margin: 20px;
  position: fixed;
  top: 0;
  right: 0;
  background-color: transparent;
}
#header .nav-btn .line {
  width: 100%;
  height: 4px;
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgb(249, 222, 222);
  border-radius: 4px;
  transition: all 0.3s ease;
}

#heaedr .nav-btn span:nth-of-type(1) {
  top: 0;
}
#header .nav-btn span:nth-of-type(2) {
  top: 12px;
}
#header .nav-btn span:nth-of-type(3) {
  top: 24px;
}

#header .nav-btn.active .line {
  background-color: rgb(85, 32, 32);
}

#header .nav-btn.active span:nth-of-type(1) {
  transform: translateY(12px) rotate(-45deg);
}
#header .nav-btn.active span:nth-of-type(2) {
  opacity: 0;
}
#header .nav-btn.active span:nth-of-type(3) {
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
  transition: all 0.4s cubic-bezier(0.33, 0.69, 0.01, 1.01);
  overflow-y: auto;
}
#header .navbar.active {
  right: 0;
}
#header .navbar .link-wrap {
  opacity: 0;
  transition: all 0.3s ease 0.4s;
}
#header .navbar.active .link-wrap {
  opacity: 1;
  animation: 0.3s ease 0.4s forwards fade-in;
}
#header .navbar .link {
  padding: 12px 24px;
  color: rgba(20, 20, 20, 0.8);
}
#header .logout-btn {
  color: red;
  font-size: 20px;
  margin: 20px;
  background-color: transparent;
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
