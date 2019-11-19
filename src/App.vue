<template>
  <div id="root">
    <router-view />
    <div id="load-auth" class="load-page" v-if="!viewPage">
      <div class="load-img"><span class="load-txt">Loading...</span></div>
    </div>
  </div>
</template>

<script>
import { STATUS } from '@/constant.js'

export default {
  computed: {
    viewPage() {
      return this.$store.getters['userData/status'] !== STATUS.UNCHECKED
      //このrootはユーザーのログイン状態がチェックされるまでは画面を表示しません
      //ユーザーのログイン状態はinitアクションのauthenticatinのオブザーバーによってチェックされます
      //initアクションはuserDataストアに存在し、Vueインスタンス作成時に呼び出されます
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Courgette|Kosugi+Maru&display=swap');
@import url('https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c:700|Ubuntu:500&display=swap');

html {
  background-color: #b97085;
}

#root {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: 'Ubuntu', 'M PLUS Rounded 1c', sans-serif;
  min-height: 100vh;
  width: 100vw;
  overflow-wrap: break-word;
}

#root h2 {
  font-weight: 900;
}
#root h3 {
  font-weight: 800;
}

#root a:hover {
  text-decoration: none;
}

#root button, #root button:focus {
  border: none;
  outline: none;
}

#root label, #root p {
  margin-bottom: 0;
}

#root input, #root button{
  outline: none;
}

/* global */

/* load-page */
.load-page#load-auth {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgb(125, 73, 88);
  z-index: 200;
  color: beige;
  display: flex;
  align-items: center;
  justify-content: center;
}

#load-auth .load-txt {
  font-size: 32px;
}

</style>
