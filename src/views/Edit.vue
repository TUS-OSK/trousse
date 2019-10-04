<template>
  <div class="edit-page">
    <main class="ed-main">
      <h2 class="ed-sub-title">{{ type }}の編集画面</h2>
      <div class="ed-main-function">
        <div class="ed-main-list">
          <div v-if="cosmeNumber">
            <draggable class="ed-main-li-draggable" v-model="cosmeAry">
              <cosme-icon v-for="cosme in cosmeAry" :key="cosme.id" :type="type" :cosme="cosme"></cosme-icon>
              <div class="fake-icon" v-for="i in fakeCosmes" :key="i"></div>
            </draggable>
          </div>
          <div v-else>
            <h3>コスメを登録しましょう！</h3>
          </div>
        </div>
        <button class="ed-modal-btn" @click="showAddCosmeModal()" >コスメを追加</button>
        <cosme-form-modal formId="new" formType="register" :focusingType="type"/>
      </div>
    </main>
  </div>
</template>

<script>
import CosmeIcon from '@/components/modules/CosmeIcon.vue'
import CosmeFormModal from '@/components/modules/CosmeFormModal.vue'
import draggable from 'vuedraggable'

export default {
  name: 'edit',
  components: {
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
    },
    cosmeNumber() {
      return this.$store.getters['userData/cosmes'][this.type].length
    }
  }
}

</script>

<style scoped>
.ed-sub-title {
  color: rgb(65, 52, 58);
}
.ed-modal-btn {
  color: white;
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
  height: 100%;
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
