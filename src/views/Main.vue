<template>
<!-- Mainページはコスメサジェスト機能が利用できるページ -->
  <div class="main-page">
    <main class="mn-main">
      <h1 class="mn-title">今日のコスメを決めよう！</h1>
      <!-- ここからコスメ選択 -->
      <section class="mn-select-cosme">
        <h2 class="mn-sl-title">コスメを選択しよう！</h2>
        <accordion-cosmes-list v-for="typeCosmesData in allCosmesAry" :key="typeCosmesData.type" :cosmesData="typeCosmesData" formType="main"></accordion-cosmes-list>
        <div class="mn-sl-cosme-filter">
          <label v-for="theme in themes" :key="theme">
            <input v-model="cosmeThemeCheckbox" :value="theme" type="checkbox">{{ toJapanese(theme) }}
          </label>
          <button @click="narrowCheckedItems">絞り込み</button>
        </div>
      </section>

      <section class="mn-suggest-cosme">
        <h2 class="mn-sg-title">今日のコスメはこれだ！</h2>
        <suggested-cosmes-list></suggested-cosmes-list>
      </section>
      <!-- <router-link class="link" to="/main/result">結果を画像で保存</router-link> -->
    </main>
  </div>
</template>

<script>
import AccordionCosmesList from '@/components/AccordionCosmesList.vue'
import SuggestedCosmesList from '@/components/SuggestedCosmesList.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'main-page',
  components: {
    AccordionCosmesList,
    SuggestedCosmesList
  },
  data() {
    return {
      cosmeThemeCheckbox: []
    }
  },
  computed: {
    ...mapGetters('userData', [
      'cosmeTypes',
      'cosmes'
    ]),
    ...mapGetters('pages/main', [
      'isOpened'
    ]),
    themes() {
      return this.$store.getters['userData/themes']
    },
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
  methods: {
    narrowCheckedItems() {
      this.cosmeTypes.forEach(type => {
        const data = {
          type
        }
        data.cosmes = this.cosmes[type].filter(cosme => {
          //チェックされてるtheme配列をcosmeが持つtheme配列でfilterして長さが小さくなったものはチェックしたい
          //つまりアンチェックリストに入れたくないのでfalseを返すようにする
            const dif = this.cosmeThemeCheckbox.filter(type => !cosme.theme.includes(type))
            console.log(dif)
            return dif.length >= this.cosmeThemeCheckbox.length
        }).map(cosme => cosme.id)

        this.$store.dispatch('pages/main/loadCheckedItems', data)
      })
    },
    toJapanese(word) {
      switch(word) {
        case 'spring':
          return '春'
        case 'summer':
          return '夏'
        case 'autumn':
          return '秋'
        case 'winter':
          return '冬'
      }
      return word
    }
  }
}
</script>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
}
</style>
