<template>
  <div>
    <Header/>
    <div class="row">
      <Sidebar PageName="メイン"/>
      <main>
        <h2>Hello World!</h2>
        <router-link class="link" to="/main/result">結果を画像で保存</router-link>
      </main>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'main',
  components: {
    Header,
    Sidebar
  }
}
</script>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
}
</style>
