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
        <button v-on:click="editAddButtonClicked()">コスメを追加</button>
        <div v-if="isShow">
        <div>コスメの分野:{{type}}</div>
        <div>コスメのブランド:<input v-model="cosmeBrandText" type="text" name="brand"></div>
        <div>コスメの名前:<input v-model="cosmeNameText" type="text" name="name" ></div>
        <div>コスメの色味:<input v-model="cosmeColorText" type="text" name="color" ></div>
        <button v-on:click="saveForm(type)">コスメを登録</button>
        </div>
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
  data(){
    return {
      cosmeBrandText:'',
      cosmeNameText:'',
      cosmeColorText:''
    }
  },
  methods:{
    editAddButtonClicked(){
      this.$store.dispatch('pages/edit/loadForm')
    },
    saveForm(type){
      const item = {
          type,
          info: {
            id :"test",
            brand : this.cosmeBrandText,
            name : this.cosmeNameText,
            color : this.cosmeColorText
          }
        }
      this.$store.commit('userData/registerCosmeInformation',item)
      this.$store.dispatch('userData/loadMain')
    }

  },
  computed: {
    list() {
      return this.$store.getters['userData/cosmes'](this.type)
    },

    isShow(){
      return this.$store.getters['pages/edit/formShow']
    },

    
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
