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
        <button v-on:click="editButtonClicked()">コスメを追加</button>
        <Form v-if="isShow">
        コスメの分野
          <select><option disabled value="">Please select one</option>
          <option>base</option>
          <option>cheek</option>
          <option>lip</option>
          </select><br>
        コスメのブランド<input type="text" name="brand" ><br>
        コスメの名前<input type="text" name="name" ><br>
        コスメの色味<input type="text" name="color" >
        </Form>
      </main>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'

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
    },
  },
  methods:{
    editButtonClicked(){
      this.$store.dispatch('edit/loadForm')
    },
  },
  computed: {
    list() {
      return this.$store.getters['user/cosmes'](this.type)
    },

    isShow(){
      return this.$store.getters['edit/formShow']
    }

    
  },
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
