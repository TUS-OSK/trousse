<template>
  <div>
    <Header/>
    <div class="row">
      <Sidebar PageName="メイン"/>
      <main>
        <h1>今日のコスメを決めよう！</h1>
        <section class="select-cosme">
          <h2>コスメを選択しよう！</h2>
          <div v-for="category in cosmeList" :key="category.label" class="category">
            <div class="category-fuction">
              <label class="category-label">
                <input class="category-checkbox" type="checkbox" v-model="isChecked" :value="category.label">{{ category.label }}
              </label>
              <button v-if="category.isOpened" @click="changeDisplayState(category.label)">▲</button>
              <button v-else @click="changeDisplayState(category.label)">▼</button>
            </div>
            <type-list :category="category"></type-list>
          </div>
        </section>
        <section class="suggest-cosme">
          <div v-if="isSuggested">
            <button @click="suggestCosmes(isSuggested)">もう一回やる！</button>
          </div>
          <div v-else>
            <button @click="suggestCosmes(isSuggested)">結果を表示する！</button>
          </div>
        </section>
        <router-link class="link" to="/main/result">結果を画像で保存</router-link>
      </main>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import TypeList from '@/components/TypeList.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'main-page',
  components: {
    Header,
    Sidebar,
    TypeList
  },
  computed: {
    ...mapGetters('userData', [
      'cosmeTypes',
      'cosmes',
      'allCosmeIds'
    ]),
    ...mapGetters('pages/main', [
      'isOpened',
      'unCheckedTypes',
      'unCheckedItems',
      'history'
    ]),
    cosmeList() {
      return this.cosmeTypes.map(type => {
        const isOpened = this.isOpened[type]
        const list = this.cosmes[type]

        if(isOpened) {
          return {
            isOpened,
            label: type,
            list
          }
        } else {
          return {
            isOpened,
            label: type,
            list: list.slice(0, 1)
          }
        }
      })
    },
    isChecked: {
      get() {
        return this.cosmeTypes.filter(type => !this.unCheckedTypes.includes(type))
      },
      set(newList) {
        const listData = {
          TypeList: this.cosmeTypes.filter(type => !newList.includes(type))
        }
        //後の都合を考えてオブジェクトにしてます
        this.$store.dispatch('pages/main/loadCheckedTypes', listData.TypeList)
      }
    }
  },
  methods: {
    changeDisplayState(type) {
      this.$store.dispatch('pages/main/loadDisplayState', type)
    },
    suggestCosmes(isSuggested) {
      const suggestedCosmes = {}
      const checkedTypes = this.cosmeTypes.filter(type => !this.unCheckedTypes.includes(type))
      const checkedCosmes = {}

      checkedTypes.forEach(type => {
        checkedCosmes[type] = this.allCosmeIds[type].filter(id => !this.unCheckedItems[type].includes(id))
        suggestedCosmes[type] = checkedCosmes[type][Math.floor(Math.random() * checkedCosmes[type].length)]
      })
      this.$store.dispatch('pages/main/loadHistory', suggestedCosmes)

      if(!isSuggested) {
        this.isSuggested = !this.isSuggested
      }
    }
  },
  data() {
    return {
      isSuggested: false
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
