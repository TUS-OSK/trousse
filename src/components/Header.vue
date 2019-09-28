<template>
  <div>
    <header>
      <router-link class="link" to="/main">
        <h1>Trousse</h1>
      </router-link>
      <button @click="changeSidebarState">メニューボタン</button>
    </header>
    <aside v-if="isGuided" :class="{ 'is-guided': isGuided }">
      <button @click="logout()">log out!</button>
      <nav>
        <router-link class="link" @click.native="resetGuideState" to="/user">ユーザー情報を見る</router-link>
        <router-link class="link" @click.native="resetGuideState" to="/edit/base">ベースのコスメを追加</router-link>
        <router-link class="link" @click.native="resetGuideState" to="/edit/cheek">チークのコスメを追加</router-link>
        <router-link class="link" @click.native="resetGuideState" to="/edit/lip">リップのコスメを追加</router-link>
      </nav>
      <button @click="changeSidebarState"></button>
    </aside>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    changeSidebarState() {
      this.isGuided = !this.isGuided
    },
    resetGuideState() {
      this.isGuided = false
    },
    logout() {
      this.$store.dispatch('userData/logOut')
    }
  },
  data() {
    return {
      isGuided: false
    }
  }
}
</script>

<style scoped>
h1 {
  color: red;
  text-align: center;
}
header {
  border-bottom: 2px dotted black;
  flex-direction: row;
}

nav {
  width: 200px;
  display: flex;
  flex-direction: column;
}

.is-guided  {
  z-index: 1;
  visibility: visible;
  /* ここまで変更 */
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  background-color: rgba(255, 255, 255, 0.8);
}
</style>
