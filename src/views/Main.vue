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
          <div class="mn-sl-checkbox-group">
            <div class="mn-sl-cb" v-for="(theme, index) in themes" :key="theme">
              <input :id="`input-${index}`" class="mn-sl-cb-input" v-model="cosmeThemeCheckbox" :value="theme" type="checkbox">
              <label class="mn-sl-cb-label" :for="`input-${index}`">
                <span class="mn-sl-cb-lb-canvas"></span>
                <span class="mn-sl-cb-lb-value">{{ toJapanese(theme) }}</span>
              </label>
            </div>
          </div>
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
      if(this.cosmeThemeCheckbox.length) {
        this.cosmeTypes.forEach(type => {
          const data = {
            type
          }
          data.cosmes = this.cosmes[type].filter(cosme => {
            //チェックされてるtheme配列をcosmeが持つtheme配列でfilterして長さが小さくなったものはチェックしたい
            //つまりアンチェックリストに入れたくないのでfalseを返すようにする
              const dif = this.cosmeThemeCheckbox.filter(type => !cosme.theme.includes(type))
              return dif.length >= this.cosmeThemeCheckbox.length
          }).map(cosme => cosme.id)

          this.$store.dispatch('pages/main/loadCheckedItems', data)

          this.cosmeThemeCheckbox = []
        })
      }
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
@keyframes shrink {
  0% {
    width: 20px;
    height: 20px;
  }
  40% {
    width: 15px;
    height: 15px;
  }
  100% {
    width: 20px;
    height: 20px;
  }
}

.row {
  display: flex;
  flex-direction: row;
}

.mn-sl-checkbox-group {
  height: 40px;
  display: flex;
  align-items: center;
}

.mn-sl-cb {
  display: inline-block;
  width: auto;
}

.mn-sl-cb-label {
  padding: 4px;
  display: flex;
  flex-direction: row;
}
.mn-sl-cb-label > * {
  margin-right: 4px;
}

.mn-sl-cb-input {
  display: none;
}
.mn-sl-cb-lb-canvas, .mn-sl-cb-lb-value {
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center
}

.mn-sl-cb-lb-value {
  width: auto;
}

.mn-sl-cb-input + .mn-sl-cb-label .mn-sl-cb-lb-canvas:after {
  content: '';
  border-radius: 4px;
  width: 20px;;
  height: 20px;
  opacity: .6;
  border: 1px solid #6cc0e5;
  transition: all .2s, border-color .08s;
}

.mn-sl-cb-input:checked + .mn-sl-cb-label .mn-sl-cb-lb-canvas:after {
  animation-name: shrink;
  animation-duration: .1s;
  opacity: 1;
  background-color: #6cc0e5;
}

</style>
