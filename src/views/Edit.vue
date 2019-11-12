<template>
  <div id="edit" class="edit-page container-fluid">
    <h2 class="sub-title">EDIT</h2>
    <main class="edit-inner">
      <h3 class="sub-sub-title">{{ type }}</h3>
      <div class="edit-area">
        <div class="cosme-list-wrap">
          <draggable-list v-model="cosmeIds">
            <template #default="draggableListProps">
              <cosme-icon v-bind="cosmeIconProps(draggableListProps.cosmeId)" :onClick="onOpen"></cosme-icon>
            </template>
          </draggable-list>
        </div>
      </div>
    </main>
    <modal :active="modal.status" :onClose="onClose">
      <update-form formType="edit" :focusingCosme="cosme(this.form.focusingId)" :onSubmit="onSubmit"></update-form>
    </modal>
  </div>
</template>

<script>
import DraggableList from '@/components/templates/DraggableList.vue'
import CosmeIcon from '@/components/modules/CosmeIcon.vue'
import Modal from '@/components/templates/Modal.vue'
import UpdateForm from '@/components/UpdateForm.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'edit',
  components: {
    DraggableList,
    CosmeIcon,
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
    cosmeIconProps(cosmeId) {
      return {
        iconType: 'edit',
        cosme: this.cosme(cosmeId)
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
          return
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
</style>
