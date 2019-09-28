<template>
  <div>
    <Header/>
    <div class="row">
      <main>
        <h2 class="sub-title">{{ type }}の編集画面</h2>
        <div class="cosme-area">
          <div class="cosme-list">
            <draggable v-model="cosmeAry">
              <cosme-icon v-for="cosme in cosmeAry" :key="cosme.id" :type="type" :cosme="cosme"></cosme-icon>
            </draggable>
          </div>
          <button class="show-modal-button" v-on:click="showAddCosmeModal()" >{{ addCosmeValue }}</button>
          <cosme-form-modal formId="new" formType="register" :focusingType="type"/>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import CosmeIcon from '@/components/modules/CosmeIcon.vue'
import CosmeFormModal from '@/components/modules/CosmeFormModal.vue'
import draggable from 'vuedraggable'

export default {
  name: 'edit',
  components: {
    Header,
    CosmeIcon,
    CosmeFormModal,
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
      addCosmeValue: 'コスメを追加'
    }
  },
  methods: {
    showAddCosmeModal() {
      this.$modal.show('form-modal-new')
    }
  },
  computed: {
    cosmeIdcount(){
      return this.$store.getters['userData/cosmeIdCount']
    },
    cosmeAry: {
      get(){
        return this.$store.getters['userData/cosmes'][this.type]
      },
      set(array){
        this.$store.dispatch('userData/dragCosme', { array, type: this.type })
      }
    }
  }
}

</script>

<style scoped>
.row {
  /* display: flex; */
  flex-direction: row;
}
.sub-title {
  text-align: center;
  color: rgb(99, 96, 92);
  text-decoration: underline solid #ffb3f9;
}
.show-modal-button {
  cursor:pointer;
  width: 100%;
  padding: 10px;
  margin-bottom: 8px;
  box-shadow: 0 2px 0 rgba(9,30,66,.25);
  font-family: "serif";
  border-radius: 10px;
  white-space: normal;
  font-size: 20px;
}
.cosme-area {
  background-color: antiquewhite;
  padding: 4px;
}
ul {
  padding: 0px;
}
</style>
