<template>
  <router-view v-if="viewPage"/>
  <div v-else>
    <h1>読み込み中です!</h1>
  </div>
</template>

<script>
import { STATUS } from '@/constant.js'

export default {
  computed: {
    viewPage() {
      console.log(this.$store.getters['userData/status'])
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
</style>
