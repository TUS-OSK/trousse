<template>
  <div>
    <Header/>
    <div class="row">
      <Sidebar PageName="メイン"/>
      <main>
        <h1>今日のコスメを決めよう！</h1>
        <section>
          <h2>コスメを選択しよう！</h2>
          <div v-for="category in cosmeList" :key="category.label" class="category">
            <div class="category-fuction">
              <label class="category-label">
                <input class="category-checkbox" type="checkbox" v-model="isChecked" :value="category.label">{{ category.label }}
              </label>
              <button v-if="category.isOpened" @click="changeState(category.label)">▲</button>
              <button v-else @click="changeState(category.label)">▼</button>
            </div>
            <type-list :category="category"></type-list>
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
      'cosmes'
    ]),
    ...mapGetters('pages/main', [
      'isOpened',
      'unCheckedTypes'
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
        const data = {
          typeList: this.cosmeTypes.filter(type => !newList.includes(type))
        }
        //後の都合を考えてオブジェクトにしてます
        this.$store.dispatch('pages/main/loadCheckedTypes', data.typeList)
      }
    }
  },
  methods: {
    changeState(type) {
      this.$store.dispatch('pages/main/loadDisplayState', type)
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
