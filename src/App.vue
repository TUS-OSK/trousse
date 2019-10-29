<template>
  <div>
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
      //このAPPはユーザーのログイン状態がチェックされるまでは画面を表示しません
      //ユーザーのログイン状態はinitアクションのauthenticatinのオブザーバーによってチェックされます
      //initアクションはuserDataストアに存在し、Vueインスタンス作成時に呼び出されます
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Courgette|Kosugi+Maru&display=swap');
@import url('https://fonts.googleapis.com/css?family=Ubuntu&display=swap');

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* global */
body {
  font-family: 'Ubuntu', sans-serif;
}

body h2 {
  font-weight: 900;
}
body h3 {
  font-weight: 800;
}

body a:hover {
  text-decoration: none;
}

body button, body button:focus {
  border: none;
  outline: none;
}

body label, body p {
  margin-bottom: 0;
}

body input, body button{
  outline: none;
}

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
