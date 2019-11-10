<template>
  <div id="edit" class="edit-page container-fluid">
    {{modalStatus}}
    <h2 class="sub-title">EDIT</h2>
    <main class="edit-inner">
      <h3 class="sub-sub-title">{{ type }}</h3>
      <div class="edit-area">
        <div class="cosme-list-wrap">
          <div>
            <draggable-list v-model="cosmeIds">
              <template #default="draggableListProps">
                <cosme-icon v-bind="cosmeIconProps(draggableListProps.cosmeId)" :onClick="onOpen"></cosme-icon>
              </template>
            </draggable-list>
          </div>
        </div>
      </div>
    </main>
    <modal :active="modal.status" :onClose="onClose">
      <update-form formType="edit" :focusingType="this.type" :focusingId="modal.focusingId"></update-form>
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
        status: false,
        focusingId: null
      }
    }
  },
  computed: {
    ...mapGetters('userData', ['cosmes']),
    cosmeAry() {
      console.log(this.cosmes)
      return this.cosmes[this.type]
    },
    cosmeIds: {
      get() {
        console.log(this.cosmeAry)
        return this.cosmeAry.map(cosme => cosme.id)
      },
      set(array) {
        this.$store.dispatch(
          'userData/reorderCosmeInfo',
          {type: this.type, cosmeIds: array}
        )
      }
    },
    fakeCosmes() {
      return [...new Array(10).keys()].map(num => `fakeCosme${num}`)
    }
  },
  methods: {
    cosmeIconProps(cosmeId) {
      return {
        iconType: 'edit',
        cosme: this.cosmes[this.type].find(cosme => cosme.id === cosmeId)
      }
    },
    onOpen(id) {
      this.modal.focusingId = id
      this.modal.status = true
    },
    onClose() {
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
  background-color: #f8f3ed;
  min-height: calc(100vh - 70px);
}

.modal-btn {
  background-color: #f3aecb;
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
