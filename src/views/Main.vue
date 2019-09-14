<template>
  <div>
    <Header/>
    <div class="row">
      <Sidebar PageName="メイン"/>
      <main>
        <h2>今日のコスメを決めよう！</h2>
        <div v-for="category in limitedItems" :key="category.label" class="category">
          <h3 class="category-label">{{ category.label }}</h3>
          <button class="displayDetail" @click="changeState(category.label)">詳細</button>
          <ul class="list">
           <li v-for="item in category.list" :key="item.id" class="item">{{ item.name }}
              <ul class="cosme-info">
                <li> {{ item.brand }} </li>
                <li> {{ item.color }} </li>
              </ul>
           </li>
          </ul>
        </div>
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
    limitedItems() {
      return this.$store.getters['userData/cosmeTypes'].map(type => {
        const list = this.$store.getters['userData/cosmes'][type].slice(0, 1)
        return {
          label: type,
          list
        }
      })
    },
    allItems() {
      return this.$store.getters['userData/cosmeTypes'].map(type => ({
        label: type,
        list: this.$store.getters['userData/cosmes'][type]
      }))
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
