<template>
  <div id="edit" class="edit-page container-fluid">
    <h2 class="sub-title">EDIT</h2>
    <main class="edit-inner">
      <h3 class="sub-sub-title">{{ type }}</h3>
      <div class="edit-area">
        <div class="cosme-list-wrap">
          <draggable-list v-model="cosmeIds">
            <template #default="draggableListProps">
              <cosme-btn v-bind="cosmeBtnProps(draggableListProps.cosmeId)" />
            </template>
          </draggable-list>
        </div>
      </div>
      <button class="register-btn" @click="onOpen()">コスメを追加</button>
    </main>
    <modal :active="modal.status" :onClose="onClose">
      <update-form :focusingCosme="cosme(this.form.focusingId)" :onSubmit="onSubmit"></update-form>
    </modal>
  </div>
</template>

<script>
import DraggableList from '@/components/templates/DraggableList.vue'
import CosmeBtn from '@/components/modules/CosmeBtn.vue'
import Modal from '@/components/templates/Modal.vue'
import UpdateForm from '@/components/UpdateForm.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'edit',
  components: {
    DraggableList,
    CosmeBtn,
    Modal,
    UpdateForm
  },
  props: {
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      modal: {
        status: false
      },
      form: {
        focusingId: null
      }
    }
  },
  computed: {
    ...mapGetters('userData', ['cosmes']),
    cosmeAry() {
      return this.cosmes[this.type]
    },
    cosmeIds: {
      get() {
        return this.cosmeAry.map(cosme => cosme.id)
      },
      set(newCosmeIds) {
        this.$store.dispatch(
          'userData/reorderCosmeInfo',
          {type: this.type, cosmeIds: newCosmeIds}
        )
      }
    }
  },
  methods: {
    cosme(id) {
      return this.cosmeAry.find(cosme => cosme.id === id)
    },
    cosmeBtnProps(cosmeId) {
      return {
        cosmeData: this.cosme(cosmeId),
        onClick: this.onOpen
      }
    },
    onOpen(cosmeId) {
      this.form.focusingId = cosmeId
      this.modal.status = true
    },
    onClose() {
      this.form.focusingId = null
      this.modal.status = false
    },
    onSubmit(request, info) {
      switch(request) {
        case 'register':
          this.$store.dispatch(
            'userData/registerCosmeInfo',
            {type: this.type, info}
          )
          break
        case 'change':
          this.$store.dispatch(
            'userData/changeCosmeInfo',
            {type: this.type, info}
          )
          break
        case 'delete':
          this.$store.dispatch(
            'userData/deleteCosmeInfo',
            {type: this.type, id: info.id}
          )
      }
      this.modal.status = false
    }
  }
}
</script>

<style scoped>
@keyframes rotate {
  0% {
    transform: rotate(30deg);
  }
  50% {
    transform: rotate(210deg);
  }
  100% {
    transform: rotate(390deg);
  }
}

.edit-page#edit {
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f8f3ed;
  min-height: calc(100vh - 69px);
}

.modal-btn {
  background-color: #f3aecb;
  border-radius: 20px;
  width: 100%;
  height: 40px;
  margin: 8px 0;
}

.register-btn {
  width: 100%;
  margin: 16px 0;
  padding: 16px;
  border-radius: 8px;
  background-color: rgba(221, 105, 149, 0.762);
  color: #fff2f8;
}
</style>
