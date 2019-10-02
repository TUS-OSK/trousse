<template>
  <div class="edit-page">
    <Header/>
      <main class="ed-main">
        <h2 class="ed-sub-title">{{ type }}の編集画面</h2>
        <div class="ed-main-function">
          <div class="ed-main-list">
            <draggable class="ed-main-li-draggable" v-model="cosmeAry">
              <cosme-icon v-for="cosme in cosmeAry" :key="cosme.id" :type="type" :cosme="cosme"></cosme-icon>
              <div class="fake-icon" v-for="i in fakeCosmes" :key="i"></div>
            </draggable>
          </div>
          <button class="ed-modal-btn" v-on:click="showAddCosmeModal()" >+</button>
          <cosme-form-modal formId="new" formType="register" :focusingType="type"/>
        </div>
      </main>
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
    fakeCosmes() {
      return [...new Array(10).keys()].map(num => `fakeCosme${num}`)
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
.ed-sub-title {
  color: rgb(65, 52, 58);
}
.ed-modal-btn {
  cursor:pointer;
  width: 100%;
  margin: 12px 0;
  padding: 12px;
  margin-bottom: 8px;
  border-radius: 12px;
  white-space: normal;
  background-color: #B25A74;
  font-size: 20px;
}
.fake-icon {
  width: 118px;
}
.ed-main {
  background-color: rgb(250, 244, 246);
}
.ed-main-list {
  padding: 8px;
  background-color: rgb(243, 234, 183);
}
.ed-main-li-draggable {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;

}
.ed-main-function {
  padding: 8px;
}
</style>
