<template>
  <div id="main" class="main-page">
    <main class="main-inner">
      <div class="hero d-flex justify-content-center">
        <p class="hero-text text-center" :class="{ active: isLoaded }">
          trousseがきっとあなたのコスメを見つけてくれます！
        </p>
      </div>
      <section class="select-area container-fluid">
        <h2 class="sub-title">SELECT</h2>
        <div class="select">
          <accordion-cosmes-list
            v-for="cosmeType in cosmeTypes"
            :key="`m-${cosmeType}`"
            v-bind="accordionCosmesListProps(cosmeType)"
          >
            <cosme-display :cosmeIds="cosmeIds(cosmeType)">
              <template #default="cosmeDisplayProps">
                <cosme-checkbox
                  v-bind="
                    cosmeCheckboxProps(cosmeDisplayProps.cosmeId, cosmeType)
                  "
                  v-model="uncheckedCosmeIds"
                />
              </template>
            </cosme-display>
          </accordion-cosmes-list>
        </div>

        <div class="filter">
          <h3>FILTER</h3>
          <div class="checkbox-group">
            <div
              class="check-btn-wrap d-inline-block"
              v-for="theme in themes"
              :key="`btn-wrap${theme}`"
            >
              <theme-checkbox v-model="cosmeThemeCheckbox" :theme="theme" />
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
import AccordionCosmesList from '@/components/templates/AccordionCosmesList.vue'
import CosmeDisplay from '@/components/templates/CosmeDisplay.vue'
import CosmeCheckbox from '@/components/modules/CosmeCheckbox.vue'
import SuggestedCosmesList from '@/components/SuggestedCosmesList.vue'
import ThemeCheckbox from '@/components/modules/ThemeCheckbox.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'main-page',
  components: {
    AccordionCosmesList,
    SuggestedCosmesList,
    CosmeDisplay,
    CosmeCheckbox,
    ThemeCheckbox
  },
  data() {
    return {
      cosmeThemeCheckbox: [],
      isLoaded: false
    }
  },
  computed: {
    ...mapGetters('userData', ['cosmeTypes', 'cosmes', 'allCosmeIds']),
    ...mapGetters('pages/main', ['uncheckedItems', 'isOpened']),
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
    },
    uncheckedCosmeIds: {
      get() {
        return this.uncheckedItems
      },
      set(newData) {
        this.$store.dispatch('pages/main/loadCheckedItems', newData)
      }
    }
  },
  methods: {
    accordionCosmesListProps(cosmeType) {
      return {
        cosmeType: cosmeType
      }
    },
    cosmeCheckboxProps(cosmeId, type) {
      return {
        cosmeType: type,
        cosme: this.cosmes[type].find(cosme => cosme.id === cosmeId)
      }
    },
    cosmeIds(type) {
      return this.cosmes[type].map(cosme => cosme.id)
    },
    narrowCheckedItems() {
      if (this.cosmeThemeCheckbox.length) {
        this.cosmeTypes.forEach(type => {
          const data = {}
          data.type = type
          data.cosmes = this.cosmes[type]
            .filter(cosme => {
              //チェックされてるtheme配列をcosmeが持つtheme配列でfilterして長さが小さくなったものはチェックしたい
              //つまりアンチェックリストに入れたくないのでfalseを返すようにする
              const dif = cosme.theme
                ? this.cosmeThemeCheckbox.filter(
                    checkedTheme => !cosme.theme.includes(checkedTheme)
                  )
                : null
              return dif.length >= this.cosmeThemeCheckbox.length
            })
            .map(cosme => cosme.id)
          this.$store.dispatch('pages/main/loadCheckedItems', data)
        })
        this.cosmeThemeCheckbox = []
      }
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
