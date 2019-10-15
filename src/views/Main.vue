<template>
<!-- Mainページはコスメサジェスト機能が利用できるページ -->
  <div class="main-page">
    <main class="mn-main">
      <h1 class="mn-title">今日のコスメを決めよう！</h1>
      <!-- ここからコスメ選択 -->
      <section class="mn-select-cosme">
        <h2 class="mn-sl-title">コスメを選択しよう！</h2>
        <accordion-cosmes-list v-for="typeCosmesData in allCosmesAry" :key="typeCosmesData.type" :cosmesData="typeCosmesData" listType="main"></accordion-cosmes-list>
        <div class="mn-sl-cosme-filter">
          <div class="mn-sl-checkbox-group">
            <div class="mn-sl-cb" v-for="(theme, index) in themes" :key="theme">
              <input :id="`input-${index}`" class="mn-sl-cb-input" v-model="cosmeThemeCheckbox" :value="theme" type="checkbox">
              <label class="mn-sl-cb-label" :for="`input-${index}`">
                <span class="mn-sl-cb-lb-canvas">
                  <span class="stick"></span>
                  <span class="stick"></span>
                  <span class="box"></span>
                  <span class="stick"></span>
                  <span class="stick"></span>
                </span>
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
    <transition name="fade">
      <load-page pageName="Main" v-if="!isLoaded"></load-page>
    </transition>
  </div>
</template>

<script>
import AccordionCosmesList from '@/components/AccordionCosmesList.vue'
import SuggestedCosmesList from '@/components/SuggestedCosmesList.vue'
import loadPage from '@/components/LoadPage.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'main-page',
  components: {
    AccordionCosmesList,
    SuggestedCosmesList,
    loadPage
  },
  data() {
    return {
      cosmeThemeCheckbox: [],
      isLoaded: false
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
            cosmeAry: cosmeAry.slice(0, 3),
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
  },
  created() {
    setTimeout(() => {
      this.isLoaded = true
    }, 2000)
  }
}
</script>

<style scoped>
@keyframes shrink {
  0% {
    width: 16px;
    height: 16px;
  }
  40% {
    width: 12px;
    height: 12px;
  }
  100% {
    width: 16px;
    height: 16px;
  }
}

@keyframes stick {
  0% {
    height: 2px;
  }
  40% {
    height: 4px;
  }
  50% {
    height: 4px;
  }
  100% {
    height: 0px;
  }
}

.mn-main {
  padding: 8px;
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
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center
}

.mn-sl-cb-lb-value {
  width: auto;
}

.mn-sl-cb-input + .mn-sl-cb-label .box {
  content: '';
  border-radius: 4px;
  width: 16px;
  height: 16px;
  opacity: .6;
  border: 1px solid #6cc0e5;
  transition: all .2s;
}

.mn-sl-cb-input:checked + .mn-sl-cb-label .box {
  animation: shrink .1s;
  opacity: 1;
  background-color: #6cc0e5;
}

.mn-sl-cb-input + .mn-sl-cb-label .stick {
  height: 0px;
  width: 1px;
  background-color: #6cc0e5;
  transition: all .4s
}
.mn-sl-cb-input:checked + .mn-sl-cb-label .stick {
  animation: stick .4s;
}
.mn-sl-cb-input + .mn-sl-cb-label .stick:nth-child(1) {
  transition: all .4s;
  transform: translate(-1px,-8px)rotate(-65deg);
}
.mn-sl-cb-input:checked + .mn-sl-cb-label .stick:nth-child(1) {
  transform: translate(-3px,-10px)rotate(-65deg);
}
.mn-sl-cb-input + .mn-sl-cb-label .stick:nth-child(2) {
  transform: translate(2px,-12px)rotate(-25deg)
}
.mn-sl-cb-input:checked + .mn-sl-cb-label .stick:nth-child(2) {
  transform: translate(0px,-14px)rotate(-25deg)
}

.mn-sl-cb-input + .mn-sl-cb-label .stick:nth-child(4) {
  transition: all .4s;
  transform: translate(-2px,12px)rotate(-25deg);
}
.mn-sl-cb-input:checked + .mn-sl-cb-label .stick:nth-child(4) {
  transform: translate(0px,14px)rotate(-25deg);
}
.mn-sl-cb-input + .mn-sl-cb-label .stick:nth-child(5) {
  transform: translate(1px,8px)rotate(-65deg);
}
.mn-sl-cb-input:checked + .mn-sl-cb-label .stick:nth-child(5) {
  transform: translate(3px,10px)rotate(-65deg);
}

.fade-leave-active, .fade-enter-active {
  transition: opacity .2s;
}
.fade-enter-to, .fade-leave {
  opacity: 1;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
