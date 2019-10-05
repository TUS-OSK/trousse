<template>
<div>
  <ul v-if="formType==='main'" class="cosme-list">
    <li v-for="cosme in cosmesData.cosmeAry" :key="cosme.id" class="cosme-list">
      <div  class="cosme-list-function">
        <input :id="`cosme${cosme.id}`" class="cosme-list-checkbox" type="checkbox" v-model="isChecked" :value="cosme.id">
        <label :for="`cosme${cosme.id}`" class="cosme-list-label">- cosme info -</label>
      </div>
      <ul>
        <li v-for="( info, infoName ) in cosme" :key="infoName" class="cosme-list-info"> {{ infoName }}: {{ info }} </li>
      </ul>
    </li>
  </ul>
  <ul  v-else>
    <li v-for="cosme in cosmesData.cosmeAry" :key="cosme.id" class="cosme-list">{{ cosme.name }}
    </li>
  </ul>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'cosme-list',
  props: {
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
      'allCosmeIds'
    ]),
    ...mapGetters('pages/main', [
      'unCheckedItems',
      'unCheckedTypes'
    ]),
    isChecked: {
      get() {
        return this.allCosmeIds[this.cosmesData.type].filter(id => !this.unCheckedItems[this.cosmesData.type].includes(id))
      },
      set(value) {
        const listData = {
          type: this.cosmesData.type,
          cosmes: this.allCosmeIds[this.cosmesData.type].filter(id => !value.includes(id))
        }
        this.$store.dispatch('pages/main/loadCheckedItems', listData)

        const unCheckedTypes = [...this.unCheckedTypes]
        if(unCheckedTypes.includes(listData.type)) {
          this.$store.dispatch('pages/main/loadCheckedTypes', unCheckedTypes.filter(() => !unCheckedTypes.includes(listData.type)))
        }
      }
    }
  }
}
</script>
