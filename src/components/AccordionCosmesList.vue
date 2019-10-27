<template>
<!-- AccordionCosmesListコンポーネントはcosmesDataを渡すと開閉できるコスメリストを表示してくれるコンポーネント -->
  <div id="accordion" class="accordion-cosmes-list-component" :class="{ isOpened : isOpened[cosmesData.type] }">
    <div class="cosme-list-wrap">
      <div class="list-title">
        <span class="check-btn" v-if="listType === 'main'">
          <input :id="`type${cosmesData.type}`" class="accordion-cosmes-li-checkbox" type="checkbox" v-model="isChecked" :value="cosmesData.type">
          <label :for="`type${cosmesData.type}`" class="accordion-cosmes-li-label">{{ cosmesData.type }}</label>
        </span>
        <span v-else>
          {{ cosmesData.type }}
        </span>
        <button class="accordion-btn" v-if="cosmesData.cosmeAry.length" @click="changeCosmesListState(cosmesData.type)"></button>
      </div>
      <cosme-list :cosmeType=cosmesData.type :cosmeAry="cosmesData.cosmeAry" :listType="listType"></cosme-list>
    </div>
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
    listType: {
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
      'unCheckedItems',
      'isOpened'
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

<style>
.accordion-cosmes-list-component#accordion {
  margin: 32px 0px;
}
</style>
