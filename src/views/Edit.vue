<template>
  <div>
    <Header/>
    <div class="row">
      <Sidebar PageName="編集"/>
      <main>
        <h2>{{ type }}の編集画面</h2>
        <ul class="list">
          <!-- <Cosmelist  :type="type" :item="item">
          </Cosmelist> -->
          <li v-for="item in list" :key="item.id" class="item"> {{ item.name }}
            <button v-on:click="editCosmeChengeInformationButtonClicked()">コスメ情報を編集</button>
           <div class="brand">{{ item.id }}</div>
            <div class="brand">{{ item.brand }}</div>
            <div class="color">{{ item.color }}</div>
            <div class="image">{{ item.theme }}</div>

           <div v-if="showChengeForm">
             <div>コスメのブランド:<input v-model="cosmeBrandText"></div>
             <div>コスメの名前:<input v-model="cosmeNameText" type="text" name="name" ></div>
             <div>コスメの色味:<input v-model="cosmeColorText" type="text" name="color" ></div>
             <div>コスメのテーマ:
              <input v-model="cosmeThemeCheckbox" value="spring" type="checkbox">
            <label>春</label>
            <input v-model="cosmeThemeCheckbox" value="summer" type="checkbox">
            <label>夏</label>
            <input v-model="cosmeThemeCheckbox" value="autumn" type="checkbox">
            <label>秋</label>
            <input v-model="cosmeThemeCheckbox" value="winter" type="checkbox">
            <label>冬</label>
            </div>
          </div>
            </li>

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

export default {
  name: 'edit',
  components: {
    Header,
    Sidebar,
    Inputform
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
      cosmeAddFormButtonValue: 'コスメを追加',
      showChengeForm: false
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
    // showChengeForm(){
    //   return this.$store.getters['pages/edit/chengeForm']
    // },
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
