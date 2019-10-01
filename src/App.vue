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

* {
  font-family: 'Kosugi Maru', sans-serif;
  margin: 0;
  padding: 0;
}

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
