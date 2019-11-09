<template>
  <div id="list" class="cosme-list-component container-fluid">
    <div
      v-if="listType==='main'"
      ref="cosmeList"
      class="cosme-list main row"
      :class="{ isOpened : isOpened[cosmeType] }"
      :style="customProperty"
    >
      <div v-if="!draggableAry.length">
        <span>コスメを登録しましょう！</span>
      </div>
      <div
        class="cosme-button col-xl-2 col-md-3 col-sm-4 col-6 d-flex"
        v-for="cosme in draggableAry"
        :key="cosme.id"
      >
        <input
          :id="`cosme${cosme.id}`"
          class="input-checkbox d-none"
          type="checkbox"
          v-model="isChecked"
          :value="cosme.id"
        />
        <label :for="`cosme${cosme.id}`" class="cosme-icon-wrap">
          <cosme-icon @mounted="test" :type="cosmeType" :cosme="cosme" :iconType="listType"></cosme-icon>
        </label>
      </div>
      <div class="fake-icon col-xl-2 col-md-3 col-4" v-for="i in fakeCosmes" :key="i"></div>
    </div>
    <div v-else-if="listType === 'edit'">
      <draggable
        class="cosme-list edit row"
        v-model="draggableAry"
        v-bind="dragOptions"
        @start="isDragging = true"
        @end="isDragging = false"
      >
        <div
          class="cosme-button col-xl-2 col-md-3 col-sm-4 col-6 d-flex align-items-center"
          v-for="cosme in draggableAry"
          :key="cosme.id"
        >
          <div class="cosme-icon-wrap" @click="showEditCosmeModal(cosme.id)">
            <cosme-icon :type="cosmeType" :cosme="cosme" :iconType="listType"></cosme-icon>
          </div>
        </div>
        <div class="fake-icon col-xl-2 col-md-3 col-4" v-for="i in fakeCosmes" :key="i"></div>
      </draggable>
      <cosme-form-modal
        v-for="cosme in draggableAry"
        :key="cosme.id"
        :formId="cosme.id"
        :formType="listType"
        :focusingType="cosmeType"
        :focusingCosme="cosme"
      />
    </div>
    <div class="ul-user row" v-else-if="listType === 'user'">
      <div v-for="cosme in draggableAry" :key="cosme.id" class="cosme-user">{{ cosme.name }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CosmeIcon from '@/components/modules/CosmeIcon.vue'
import draggable from 'vuedraggable'
import CosmeFormModal from '@/components/modules/CosmeFormModal.vue'
export default {
  name: 'cosme-list',
  components: {
    CosmeIcon,
    draggable,
    CosmeFormModal
  },
  data() {
    return {
      mounted: false,
      renderedIconNumber: 0,
      elmentHeight: null,
      isDragging: false
    }
  },
  props: {
    cosmeType: {
      type: String,
      required: true
    },
    listType: {
      type: String,
      required: true,
      validator: value => ['main', 'user', 'edit'].includes(value)
    }
  },
  computed: {
    ...mapGetters('userData', ['allCosmeIds']),
    ...mapGetters('pages/main', [
      'unCheckedItems',
      'unCheckedTypes',
      'isOpened'
    ]),
    draggableAry: {
      get() {
        return this.$store.getters['userData/cosmes'][this.cosmeType]
      },
      set(array) {
        const newDragCosme = {
          array: array.filter(v => v !== undefined),
          type: this.cosmeType
        }
        this.$store.dispatch('userData/dragCosme', newDragCosme)
      }
    },
    dragOptions() {
      return {
        animation: 200,
        disabled: false
      }
    },
    fakeCosmes() {
      return [...new Array(10).keys()].map(num => `fakeCosme${num}`)
    },
    customProperty() {
      if (this.mounted) {
        if (this.isOpened[this.cosmeType]) {
          return {
            '--origin-height': '124px',
            '--opened-height': `${this.elmentHeight}px`
          }
        } else {
          return {
            '--origin-height': '124px',
            '--opened-height': '124px'
          }
        }
      } else {
        return {}
      }
    },
    isChecked: {
      get() {
        return this.allCosmeIds[this.cosmeType].filter(
          id => !this.unCheckedItems[this.cosmeType].includes(id)
        )
      },
      set(value) {
        const listData = {
          type: this.cosmeType,
          cosmes: this.allCosmeIds[this.cosmeType].filter(
            id => !value.includes(id)
          )
        }
        this.$store.dispatch('pages/main/loadCheckedItems', listData)
        const unCheckedTypes = [...this.unCheckedTypes]
        if (unCheckedTypes.includes(listData.type)) {
          this.$store.dispatch(
            'pages/main/loadCheckedTypes',
            unCheckedTypes.filter(() => !unCheckedTypes.includes(listData.type))
          )
        }
      }
    }
  },
  methods: {
    showEditCosmeModal(id) {
      this.$modal.show(`form-modal-${id}`)
    },
    test() {
      if (this.draggableAry.length === ++this.renderedIconNumber) {
        this.elmentHeight = this.$refs.cosmeList.clientHeight
        this.$emit('mounted', this.elmentHeight)
        this.mounted = true
      }
    }
  }
}
</script>

<style scoped>
@keyframes spring {
  0% {
    transform: none;
  }
  30% {
    transform: scale(0.94);
  }
  60% {
    transform: scale(1.04);
  }
  80% {
    transform: scale(0.96);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes collapse {
  0% {
    height: 124px;
  }
}
#list .fake-icon {
  height: 0;
}
#list .cosme-list-error-wrap {
  background-color: #f3e3e6;
}
#list .cosme-list {
  overflow: hidden;
  padding: 8px;
  background-color: #f3e3e6;
  border-radius: 8px;
  transition: all 0.4s;
}
#list .cosme-list.main {
  height: var(--origin-height);
  transition: height 0.3s;
}
#list .cosme-list.main.isOpened {
  height: var(--opened-height);
}
#list .ul-user {
  padding-left: 0px;
}
#list .cosme-button {
  height: 92px;
  margin: 8px 0;
  padding: 0 8px;
}
#list .cosme-icon-wrap {
  position: relative;
  height: 100%;
  width: 100%;
  font-size: 12px;
  text-align: center;
  background-color: rgb(248, 241, 242);
  border: 4px solid #b25a74;
  border-radius: 12px;
  word-break: break-all;
  overflow: hidden;
  cursor: pointer;
}
#list .cosme-user {
  position: relative;
  height: 100%;
  width: 100%;
  font-size: 16px;
  /* text-align: center; */
  background-color: rgb(248, 241, 242);
  /* border: 2px solid #b25a74; */
  color: #b25a74;
  border-radius: 2px;
  word-break: break-all;
  overflow: hidden;
  cursor: pointer;
  padding: 0px;
}
#list .input-checkbox + .cosme-icon-wrap {
  filter: brightness(80%);
  transition: all 0.4s;
}
#list .input-checkbox:checked + .cosme-icon-wrap {
  filter: none;
  animation: spring 0.3s;
}
#list .input-checkbox:checked + .cosme-icon-wrap::after {
  content: "";
  position: absolute;
  top: 4%;
  right: 8%;
  width: 8px;
  height: 16px;
  border-bottom: 4px solid pink;
  border-right: 4px solid pink;
  transform: rotate(45deg);
}
</style>
