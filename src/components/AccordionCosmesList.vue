<template>
<!-- AccordionCosmesListコンポーネントはcosmesDataを渡すと開閉できるコスメリストを表示してくれるコンポーネント -->
  <div class="accordion-cosmes-li">
    <div class="accordion-cosmes-li-func">
      <a v-if="formType === 'main'">
      <label class="accordion-cosmes-li-label">
        <input class="accordion-cosmes-li-checkbox" type="checkbox" v-model="isChecked" :value="cosmesData.type">
        {{ cosmesData.type }}
      </label>
      </a>
      <a v-else>
         {{ cosmesData.type }}
      </a>
      <button v-if="cosmesData.accordionCosmesList.isOpened" @click="changeCosmesListState(cosmesData.type)">▲</button>
      <button v-else @click="changeCosmesListState(cosmesData.type)">▼</button>
    </div>
    <cosme-list :cosmesData="cosmesData" :formType="formType"></cosme-list>
  </div>
</template>

<script>
import CosmeList from '@/components/modules/CosmeList.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'accordion-cosmes-list',
  components: {
    CosmeList
  },
  props: {
    // cosmesData =  {
    //   type: ...,
    //   cosmeAry: ...,
    //   accordionCosmesList: {
    //     isOpened: ...
    //   }
    // }
    cosmesData: {
      type: Object,
      required: true
    },
    formType: {
      type: String,
      required: true,
      validator: value => ['main', 'user'].includes(value)
    }
  },
  computed: {
    ...mapGetters('userData', [
      'cosmeTypes',
      'cosmes'
    ]),
    ...mapGetters('pages/main', [
      'unCheckedTypes',
      'unCheckedItems'
    ]),
    isChecked: {
      get() {
        return this.cosmeTypes.filter(type => !this.unCheckedTypes.includes(type))
      },
      set(newCheckedTypes) {
        const newUnCheckedTypes = this.cosmeTypes.filter(type => !newCheckedTypes.includes(type))

        if(this.unCheckedTypes > newUnCheckedTypes) {
          const newData = {
            newCheckedTypes,
            cosmeTypes: this.cosmeTypes
          }
          this.$store.dispatch('pages/main/addCheckedItems', newData)
        } else {
          const newData = {
            newUnCheckedTypes,
            cosmes: this.cosmes
          }
          this.$store.dispatch('pages/main/filterCheckedItems', newData)
        }

       this.$store.dispatch('pages/main/loadCheckedTypes', newUnCheckedTypes)
      }
    }
  },
  methods: {
    changeCosmesListState(type) {
      this.$store.dispatch('pages/main/loadCosmesListState', type)
    }
  }
}
</script>
