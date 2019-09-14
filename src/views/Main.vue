<template>
  <div>
    <Header/>
    <div class="row">
      <Sidebar PageName="メイン"/>
      <main>
        <h2>今日のコスメを決めよう！</h2>
        <section>
          <div v-for="category in cosmeList" :key="category.label" class="category">
            <h3 class="category-label">{{ category.label }}</h3>
            <button v-if="category.isOpened" @click="changeState(category.label)">▲</button>
            <button v-else @click="changeState(category.label)">▼</button>
            <ul class="list">
              <li v-for="item in category.list" :key="item.id" class="item">- cosme list -
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

export default {
  name: 'main-page',
  components: {
    Header,
    Sidebar
  },
  computed: {
    cosmeList() {
      return this.$store.getters['userData/cosmeTypes'].map(type => {
        const isOpened = this.$store.getters['pages/main/cosmeStates'][type].isOpened
        const list = this.$store.getters['userData/cosmes'][type]

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
