<template>
<div id="list" class="cosme-list-component container-fluid">
  <div v-if="listType==='main'" class="cosme-list row">
    <div class="cosme-button col-4" v-for="cosme in cosmeAry" :key="cosme.id">
      <input :id="`cosme${cosme.id}`" class="input-checkbox d-none" type="checkbox" v-model="isChecked" :value="cosme.id">
      <label :for="`cosme${cosme.id}`" class="cosme-icon-wrap">
        <cosme-icon :type="cosmeType" :cosme="cosme" :iconType="listType"></cosme-icon>
      </label>
    </div>
    <div class="fake-icon col-4" v-for="i in fakeCosmes" :key="i"></div>
  </div>
  <div v-else-if="listType === 'edit'">
    <draggable class="cosme-list row" v-model="draggableAry" v-bind="dragOptions" @start="isDragging = true" @end="isDragging = false">
      <div class="cosme-button col-4" v-for="cosme in cosmeAry" :key="cosme.id">
        <div class="cosme-icon-wrap" @click="showEditCosmeModal(cosme.id)">
          <cosme-icon :type="cosmeType" :cosme="cosme" :iconType="listType"></cosme-icon>
        </div>
      </div>
      <div class="fake-icon col-4" v-for="i in fakeCosmes" :key="i"></div>
    </draggable>
    <cosme-form-modal v-for="cosme in cosmeAry" :key="cosme.id" :formId="cosme.id" :formType="listType" :focusingType="cosmeType" :focusingCosme="cosme"/>
  </div>
  <ul v-else-if="listType === 'user'">
    <li v-for="cosme in cosmeAry" :key="cosme.id" class="cosme-list">{{ cosme.name }}
    </li>
  </ul>
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
  props: {
    cosmeType: {
      type: String,
      required: true
    },
    cosmeAry: {
      type: Array,
      required: true
    },
    listType: {
      type: String,
      required: true,
      validator: value => ['main', 'user', 'edit'].includes(value)
    }
  },
  computed: {
    ...mapGetters('userData', [
      'allCosmeIds'
    ]),
    ...mapGetters('pages/main', [
      'unCheckedItems',
      'unCheckedTypes'
    ]),
    draggableAry: {
      get(){
        return this.$store.getters['userData/cosmes'][this.cosmeType]
      },
      set(array){
        this.$store.dispatch('userData/dragCosme', { array, type: this.cosmeType })
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
    isChecked: {
      get() {
        return this.allCosmeIds[this.cosmeType].filter(id => !this.unCheckedItems[this.cosmeType].includes(id))
      },
      set(value) {
        const listData = {
          type: this.cosmeType,
          cosmes: this.allCosmeIds[this.cosmeType].filter(id => !value.includes(id))
        }
        this.$store.dispatch('pages/main/loadCheckedItems', listData)

        const unCheckedTypes = [...this.unCheckedTypes]
        if(unCheckedTypes.includes(listData.type)) {
          this.$store.dispatch('pages/main/loadCheckedTypes', unCheckedTypes.filter(() => !unCheckedTypes.includes(listData.type)))
        }
      }
    }
  },
  methods: {
    showEditCosmeModal(id){
      this.$modal.show(`form-modal-${id}`)
    }
  },
  created() {
    console.log(this.cosmesData)
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
    transform: scale(1.0);
  }
}

#list .fake-icon {
  height: 0;
}
#list .cosme-list {
  padding: 24px 0;
  background-color: rgb(243, 234, 183);
}
#list .cosme-icon-wrap {
  position: relative;
  content: "";
  width: 100%;
  padding-top: 100%;
  border-radius: 12px;
  font-size: 12px;
  text-align: center;
  background-color: rgb(248, 241, 242);
  border: 4px solid #B25A74;
  word-break: break-all;
  overflow: hidden;
  cursor:pointer;
}
#list .cosme-button.col-4 {
  padding: 0 8px;
}

#list .input-checkbox + .cosme-icon-wrap {
  filter: brightness(80%);
  transition: all .4s
}
#list .input-checkbox:checked + .cosme-icon-wrap {
  filter: none;
  animation: spring .3s;
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
