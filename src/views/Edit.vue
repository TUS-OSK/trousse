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
        <button class="addcosmebutton" v-on:click="editAddCosmeButton()" >{{ cosmeAddCosmeValue }}</button>
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
      cosmeAddCosmeValue: 'コスメを追加'
    }
  },
  methods: {
    editAddCosmeButton() {
      this.$modal.show('inputform')
    }
  },
  computed: {
    cosmeIdcount(){
      return this.$store.getters['userData/cosmeIdCount']
    },
    list: {
      get(){
        return this.$store.getters['userData/cosmes'][this.type]
      },
      set(array){
        this.$store.dispatch('userData/dragCosmeInfo', {array, type: this.type})
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
.addcosmebutton{
  cursor:pointer;
  padding: 10px;
  list-style-type: none;
  font-family: "serif";
  border-radius: 10px;
  max-height: 100%;
  white-space: normal;
  box-shadow: 0 2px 0 rgba(9,30,66,.25);
  margin-bottom: 8px;
}
ul{
  padding: 0px;
}
</style>
