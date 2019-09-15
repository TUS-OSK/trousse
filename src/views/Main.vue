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
              <span class="category-label">{{ category.label }}</span>
              <input type="checkbox" v-model="checkedTypes" v-bind:value="category.label">
              <button v-if="category.isOpened" @click="changeState(category.label)">▲</button>
              <button v-else @click="changeState(category.label)">▼</button>
            </div>
            <ul class="list">
              <li v-for="item in category.list" :key="item.id" class="item">
                <div class="item-function">
                  <span>- cosme list -</span>
                  <input type="checkbox" v-model="checkedItems[category.label]" v-bind:value="item.id">
                </div>
                <ul>
                  <li v-for="( info, key ) in item" :key="key" class="key"> {{ key }}: {{ info }} </li>
                </ul>
              </li>
            </ul>
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
import { mapGetters } from 'vuex'

export default {
  name: 'main-page',
  components: {
    Header,
    Sidebar
  },
  computed: {
    ...mapGetters('userData', [
      'cosmeTypes',
      'cosmes',
      'allCosmeIds'
    ]),
    ...mapGetters('pages/main', [
      'cosmeStates',
      'isOpened'

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
    }
  },
  methods: {
    changeState(type) {
      this.$store.dispatch('pages/main/loadDisplayState', type)
    }
  },
  data() {
    return {
      checkedTypes: [],
      checkedItems: {
        base: [],
        cheek: [],
        lip: []
      }
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
