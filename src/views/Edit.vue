<template>
  <div>
    <Header/>
    <div class="row">
      <Sidebar PageName="編集"/>
      <main>
        <h2>{{ type }}の編集画面</h2>
        <ul class="list">
          <li v-for="item in list" :key="item.id" class="item"> {{ item.name }}
            <div class="brand">{{ item.brand }}</div>
            <div class="color">{{ item.color }}</div>
          </li>
        </ul>
        <button value="コスメを追加" onclick='editButtonClicked()'>
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
  methods:{
    editButtonClicked(){
      this.$store.dispatch('DisplayAddForm')
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
.item{
  font-size: 20px;
  border-bottom: 1px dashed #000000;
}
.brand{
  font-size: 10px;
}
.color{
  font-size: 10px;
}
</style>