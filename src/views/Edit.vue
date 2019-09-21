<template>
  <div>
    <Header/>
    <div class="row">
      <main>
        <h2>{{ type }}の編集画面</h2>
        <ul class="list">
          <draggable v-model="list">
            <Cosmelist v-for="item in list" :key="item.id" :id="item.id" :type="type" :item="item"></Cosmelist>
          </draggable>
        </ul>
        <button v-on:click="editAddButtonClicked()" >{{ cosmeAddFormButtonValue }}</button>
        <Inputform :type="type" />
      </main>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Inputform from '@/components/Inputform.vue'
import Cosmelist from '@/components/Cosmelist.vue'
import draggable from 'vuedraggable'

export default {
  name: 'edit',
  components: {
    Header,
    Inputform,
    Cosmelist,
    draggable
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
      this.$modal.show('inputform')
    }
  },
  computed: {
    cosmeIdcount(){
      return this.$store.getters['userData/cosmeIdCount']
    },
    list: {
      get(){
        console.log(this.$store.getters['userData/cosmes'][this.type])
        return this.$store.getters['userData/cosmes'][this.type]
      },
      set(array){
        this.$store.dispatch('userData/dragCosmeInformation', {array, type: this.type})
      }
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
ul{
  padding: 0px;
}
</style>
