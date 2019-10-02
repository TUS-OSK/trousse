<template>
  <div>
    <router-view v-if="viewPage"/>
    <div class="load-page" v-else>
      <div class="load-img">ログイン状態を確認中</div>
    </div>
  </div>
</template>

<script>
import { STATUS } from '@/constant.js'

export default {
  computed: {
    viewPage() {
      return this.$store.getters['userData/status'] !== STATUS.UNCHECKED
      //このAPPはユーザーのログイン状態がチェックされるまでは画面を表示しません
      //ユーザーのログイン状態はinitアクションのauthenticatinのオブザーバーによってチェックされます
      //initアクションはuserDataストアに存在し、Vueインスタンス作成時に呼び出されます
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Courgette|Kosugi+Maru&display=swap');

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* global */

a {
  text-decoration: none;
}

h2 {
  display: inline-block;
  margin: 12px;
}
button {
  border: none;
  background-color: rgba(255, 255, 255, 0);
}
button:active {
  filter: brightness(80%);
}
* {
  font-family: 'Kosugi Maru', sans-serif;
  margin: 0;
  padding: 0;
}
.row {
  display: flex;
  flex-direction: row
}

/* load-page */
.load-page  {
  z-index: 5;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: beige;
  background-color: rgb(125, 73, 88);
}
</style>
