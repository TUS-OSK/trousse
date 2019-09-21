<template>
<!-- Mainページはコスメサジェスト機能が利用できるページ -->
  <div>
    <Header/>
    <div class="row">
      <Sidebar PageName="メイン"/>
      <main>
        <h1>今日のコスメを決めよう！</h1>
        <!-- ここからコスメ選択 -->
        <section class="select-cosme">
          <h2>コスメを選択しよう！</h2>
          <accordion-cosmes-list v-for="typeCosmesData in allCosmesAry" :key="typeCosmesData.type" :cosmesData="typeCosmesData"></accordion-cosmes-list>
        </section>
        <!-- ここからコスメ結果 -->
        <section class="suggest-cosme">
          <h2>今日のコスメはこれだ！</h2>
          <suggested-cosmes-list></suggested-cosmes-list>
        </section>
        <router-link class="link" to="/main/result">結果を画像で保存</router-link>
      </main>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import AccordionCosmesList from '@/components/AccordionCosmesList.vue'
import SuggestedCosmesList from '@/components/SuggestedCosmesList.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'main-page',
  components: {
    Header,
    Sidebar,
    AccordionCosmesList,
    SuggestedCosmesList
  },
  computed: {
    ...mapGetters('userData', [
      'cosmeTypes',
      'cosmes'
    ]),
    ...mapGetters('pages/main', [
      'isOpened'
    ]),
    allCosmesAry() {
      return this.cosmeTypes.map(type => {
        const isOpened = this.isOpened[type]
        const cosmeAry = this.cosmes[type]

        if(isOpened) {
          return {
            type,
            cosmeAry,
            accordionCosmesList: {
              isOpened
            }
          }
        } else {
          return {
            type,
            cosmeAry: cosmeAry.slice(0, 1),
            accordionCosmesList: {
              isOpened
            }
          }
        }
      })
    }
  },
  created() {
    this.$store.dispatch('userData/loadMain')
  }
}

</script>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
}
</style>
