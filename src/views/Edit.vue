<template>
  <div>
    <Header/>
    <div class="row">
      <Sidebar PageName="編集"/>
      <main>
        <h2>{{ type }}の編集画面</h2>
        <ul class="list">
          <Cosmelist v-for="item in list" :key="item.id" :id="item.id" :type="type" :item="item"></Cosmelist>
        </ul>
        <button v-on:click="editAddButtonClicked()" >{{ cosmeAddFormButtonValue }}</button>
        <Inputform v-if="isShow" :type="type" />
      </main>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import Inputform from '@/components/Inputform.vue'
import Cosmelist from '@/components/Cosmelist.vue'

export default {
  name: 'edit',
  components: {
    Header,
    Sidebar,
    Inputform,
    Cosmelist
  },
  props: {
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      cosmeBrandText: '',
      cosmeNameText: '',
      cosmeColorText: '',
      cosmeThemeCheckbox: [],
      cosmeAddFormButtonValue: 'コスメを追加'
    }
  },
  methods: {
    editAddButtonClicked() {
      this.$store.dispatch('pages/edit/loadForm')
      if(this.isShow) {
        this.cosmeAddFormButtonValue = '閉じる'
      } else {
        this.cosmeAddFormButtonValue = 'コスメを追加'
      }
    },
    editCosmeChengeInformationButtonClicked(){
      // this.$store.dispatch('pages/edit/loadChengeForm')
      if(this.showChengeForm){
        this.showChengeForm = false
      } else {
      this.showChengeForm = true
    }
    }
  },
  computed: {
    list() {
      return this.$store.getters['userData/cosmes'][this.type]
    },
    isShow() {
      return this.$store.getters['pages/edit/formShow']
    },
    cosmeIdcount(){
      return this.$store.getters['userData/cosmeIdCount']
    }
  }
}

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
.image{
  font-size: 10px;
}
</style>
