<template>
  <div id="main" class="main-page">
    <main class="main-inner">
      <div class="hero d-flex justify-content-center">
        <p class="hero-text text-center" :class="{ active : isLoaded }">trousueがきっとあなたのコスメを見つけてくれます！</p>
      </div>
      <section class="select-area container-fluid">
        <h2 class="sub-title">SELECT</h2>
        <div class="select">
          <accordion-cosmes-list
            v-for="typeCosmesData in allCosmesAry"
            :key="typeCosmesData.type"
            :cosmesData="typeCosmesData"
            listType="main"
          ></accordion-cosmes-list>
        </div>
        <div class="filter">
          <h3>FILTER</h3>
          <div class="checkbox-group">
            <div
              class="check-button-wrap d-inline-block"
              v-for="(theme, index) in themes"
              :key="theme"
            >
              <input
                :id="`input-${index}`"
                class="input-checkbox d-none"
                v-model="cosmeThemeCheckbox"
                :value="theme"
                type="checkbox"
              />
              <label class="check-button" :for="`input-${index}`">
                <span class="checkbox-wrap d-flex align-items-center justify-content-center">
                  <span class="stick"></span>
                  <span class="stick"></span>
                  <span class="checkbox"></span>
                  <span class="stick"></span>
                  <span class="stick"></span>
                </span>
                <span class="checkvalue d-flex align-items-center">{{ toJapanese(theme) }}</span>
              </label>
            </div>
          </div>
        </div>
        <button class="filter-btn" @click="narrowCheckedItems">絞り込み</button>
      </section>

      <section class="suggest-area container-fluid">
        <h2 class="sub-title">RESULT</h2>
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
      cosmeThemeCheckbox: [],
      isLoaded: false
    }
  },
  computed: {
    ...mapGetters('userData', ['cosmeTypes', 'cosmes']),
    ...mapGetters('pages/main', ['isOpened']),
    themes() {
      return this.$store.getters['userData/themes']
    },
    allCosmesAry() {
      return this.cosmeTypes.map(type => {
        return {
          type,
          cosmeAry: this.cosmes[type],
          accordionCosmesList: {
            isOpend: this.isOpened[type]
          }
        }
      })
    }
  },
  methods: {
    narrowCheckedItems() {
      if (this.cosmeThemeCheckbox.length) {
        this.cosmeTypes.forEach(type => {
          const data = {
            type
          }
          data.cosmes = this.cosmes[type]
            .filter(cosme => {
              //チェックされてるtheme配列をcosmeが持つtheme配列でfilterして長さが小さくなったものはチェックしたい
              //つまりアンチェックリストに入れたくないのでfalseを返すようにする
              const dif = this.cosmeThemeCheckbox.filter(
                type => !cosme.theme.includes(type)
              )
              return dif.length >= this.cosmeThemeCheckbox.length
            })
            .map(cosme => cosme.id)

          this.$store.dispatch('pages/main/loadCheckedItems', data)

          this.cosmeThemeCheckbox = []
        })
      }
    },
    toJapanese(word) {
      switch (word) {
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
    }, 300)
  }
}
</script>

<style scoped>
@keyframes shrink {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes stick {
  0% {
    height: 0px;
  }
  30% {
    height: 5px;
  }
  100% {
    height: 0px;
  }
}

@keyframes floatArrow {
  50% {
    transform: rotate(45deg) translate(5px, 5px);
  }
}

#main .main-page {
  padding: 8px;
}

#main .main-inner section {
  padding-top: 40px;
  padding-bottom: 40px;
}

/* select-area */
#main .main-inner .select-area {
  background-color: #f8f3ed;
}
#main .main-inner .select-area .filter {
  margin-top: 44px;
}
#main .main-inner .select-area .filter-btn {
  width: 100%;
  margin: 8px 0;
  height: 40px;
  border-radius: 20px;
  color: gray;
  background-color: #f3aecb;
}
#main .main-inner .suggest-area {
  background-color: #f8f3ed;
}
#main .check-button {
  display: inline-block;
  width: auto;
}
#main .check-button {
  padding: 4px;
  display: flex;
  flex-direction: row;
}
#main .check-button .checkvalue > * {
  margin-right: 4px;
}
#main .check-button .checkbox-wrap {
  width: 40px;
  height: 40px;
}
#main .check-button .checkvalue {
  font-size: 16px;
}

#main .check-button .checkbox {
  content: "";
  border-radius: 4px;
  width: 20px;
  height: 20px;
  opacity: 0.6;
  border: 2px solid gray;
  /* #f56868; */
  transition: all 0.2s;
}

#main .input-checkbox:checked + .check-button .checkbox {
  animation: shrink 0.1s;
  opacity: 1;
  background-color: #f3aecb;
  /* #f56868e3; */
}
#main .input-checkbox + .check-button .stick {
  position: absolute;
  height: 0px;
  width: 2px;
  border-radius: 2px;
  background-color: #f56868;
  transition: all 0.4s;
}
#main .input-checkbox:checked + .check-button .stick {
  animation: stick 0.4s;
}
#main .input-checkbox + .check-button .stick:nth-child(1) {
  transition: all 0.4s;
  transform: translate(-12px, -8px) rotate(-65deg);
}
#main .input-checkbox:checked + .check-button .stick:nth-child(1) {
  transform: translate(-18px, -12px) rotate(-65deg);
}
#main .input-checkbox + .check-button .stick:nth-child(2) {
  transform: translate(-8px, -12px) rotate(-25deg);
}
#main .input-checkbox:checked + .check-button .stick:nth-child(2) {
  transform: translate(-12px, -18px) rotate(-25deg);
}
#main .input-checkbox + .check-button .stick:nth-child(4) {
  transition: all 0.4s;
  transform: translate(8px, 12px) rotate(-25deg);
}
#main .input-checkbox:checked + .check-button .stick:nth-child(4) {
  transform: translate(12px, 18px) rotate(-25deg);
}
#main .input-checkbox + .check-button .stick:nth-child(5) {
  transform: translate(12px, 8px) rotate(-65deg);
}
#main .input-checkbox:checked + .check-button .stick:nth-child(5) {
  transform: translate(18px, 12px) rotate(-65deg);
}

#main .fade-leave-active,
.fade-enter-active {
  transition: opacity 0.2s;
}
#main .fade-enter-to,
.fade-leave {
  opacity: 1;
}
#main .fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* hero-area */
#main .main-inner .hero {
  position: relative;
  color: white;
  text-align: center;
  padding-bottom: 160px;
}
#main .main-inner .hero::after {
  content: "";
  border: 6px solid white;
  border-left: none;
  border-top: none;
  width: 20px;
  height: 20px;
  position: absolute;
  bottom: 32px;
  transform: rotate(45deg);
  animation: floatArrow 0.6s infinite;
}

#main .main-inner .hero .hero-text {
  padding: 20px 32px;
  opacity: 0;
  transition: all 0.4s;
}

#main .main-inner .hero .hero-text.active {
  top: 0;
  opacity: 1;
}

/* result-are */
</style>
