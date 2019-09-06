<template>
  <div>
    <Header/>
    <div class="row">
      <Sidebar PageName="編集"/>
      <main>
        <h2>{{ type }}の編集画面</h2>
        <ul class="list">
          <li v-for="item in list" :key="item.id"> {{ item.name }} </li>
        </ul>
      </main>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue"
import Sidebar from "@/components/Sidebar.vue"

export default {
  name: 'edit',
  components: {
    Header,
    Sidebar
  },
  props: {
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    list() {
      return this.$store.getters.cosmes(this.type)
    }
  }
};
</script>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
}
</style>