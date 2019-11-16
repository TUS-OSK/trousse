<template>
  <div id="icon" class="cosme-checkbox-component">
    <div class="cosme-checkbox-wrap">
      <input :id="`checkbox-${cosme.id}`" class="input-checkbox d-none" type="checkbox" v-model="cosmeIds" :value="cosme.id">
      <label :for="`checkbox-${cosme.id}`" class="cosme-checkbox">
        <cosme-icon :cosme="cosme" />
      </label>
    </div>
  </div>
</template>

<script>
import CosmeIcon from '@/components/templates/CosmeIcon.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'cosme-checkbox',
  data() {
    return {
      acitve: true
    }
  },
  components: {
    CosmeIcon
  },
  props: [
    'value',
    'cosme',
    'cosmeType'
  ],
  computed: {
    ...mapGetters('userData', ['allCosmeIds']),
    cosmeIds: {
      get() {
        return this.allCosmeIds[this.cosmeType].filter(
          id => !this.value[this.cosmeType].includes(id)
        )
      },
      set(newIds) {
        const listData = {
          type: this.cosmeType,
          cosmes: this.allCosmeIds[this.cosmeType].filter(
            id => newIds === undefined ? true : !newIds.includes(id)
          )
        }
        this.$emit('input', listData)
      }
    }
  }
}
</script>

<style scoped>
#icon .cosme-checkbox {
  width: 100%;
  transition: filter .2s ease;
  filter: brightness(80%)
}
#icon .input-checkbox:checked + .cosme-checkbox {
  filter: brightness(100%)
}
</style>
