<template>
  <div id="edit" class="edit-page container-fluid">
    <main class="edit-inner">
      <h2 class="sub-title">{{ type }}の編集画面</h2>
      <div class="edit-area">
        <div class="cosme-list-wrap">
          <div>
            <cosme-list :cosmeType="this.type" :cosmeAry="cosmeAry" listType="edit"></cosme-list>
          </div>
        </div>
        <button class="modal-btn" @click="showAddCosmeModal()" >コスメを追加</button>
        <cosme-form-modal formId="new" formType="register" :focusingType="type"/>
      </div>
    </main>
  </div>
</template>

<script>
import CosmeList from '@/components/modules/CosmeList.vue'
import CosmeFormModal from '@/components/modules/CosmeFormModal.vue'

export default {
  name: 'edit',
  components: {
    CosmeList,
    CosmeFormModal
  },
  props: {
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      addCosmeValue: 'コスメを追加',
      isDragging: false,
      cosmesData: {
        type: this.type,
        cosmeAry: this.$store.getters['userData/cosmes'][this.type]
      }
    }
  },
  methods: {
    showAddCosmeModal() {
      this.$modal.show('form-modal-new')
    }
  },
  computed: {
    cosmeAry() {
      return this.$store.getters['userData/cosmes'][this.type]
    },
    cosmeIdcount(){
      return this.$store.getters['userData/cosmeIdCount']
    },
    fakeCosmes() {
      return [...new Array(10).keys()].map(num => `fakeCosme${num}`)
    }
  }
}

</script>

<style scoped>
@keyframes rotate {
  0% {
    transform: rotate(30deg)
  }
  50% {
    transform: rotate(210deg)
  }
  100% {
    transform: rotate(390deg)
  }
}

.edit-page#edit {
  padding-top: 40px;
  background-color: white;
  height: calc(100vh - 70px);
}

.modal-btn {
  background-color: pink;
  border-radius: 20px;
  width: 100%;
  height: 40px;
  margin: 8px 0;
}

/* .ed-modal-btn {
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

.fade-leave-active, .fade-enter-active {
  transition: opacity .2s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
} */
</style>
