<template>
  <div>
    <Header/>
    <div class="row">
      <Sidebar PageName="ユーザー"/>
      <main>
        <h2>Hello World!</h2>
        <h3>ユーザー名</h3>
        <p>{{ name }} </p>
        <div v-for="category in all" :key="category.label" class="category">
          <h3 class="category-label">{{ category.label }}</h3>
          <ul class="list">
            <li v-for="item in category.list" :key="item.id" class="item">{{ item.name }}</li>
          </ul>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'user',
  components: {
    Header,
    Sidebar
  },
  computed: {
    name() {
      return this.$store.getters['userData/user'].name
    },
    all() {
      return this.$store.getters['userData/cosmeTypes'].map(type => ({
        label: type,
        list: this.$store.getters['userData/cosmes'](type)
      }))
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