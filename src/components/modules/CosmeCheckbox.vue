<template>
  <div id="icon" class="cosme-checkbox-component">
    <div class="cosme-checkbox">
      <input type="checkbox" v-model="cosmeIds">
      <cosme-icon :cosme="cosme" v-model="cosmeIds"/>
    </div>
  </div>
</template>

<script>
import CosmeIcon from '@/components/templates/CosmeIcon.vue'

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
    'cosme'
  ],
  computed: {
    cosmeIds: {
      get() {
        return this.value
      },
      set(newIds) {
        this.$emit('input', newIds)
      }
    }
  }
}
</script>

<style scoped>
  .cosme-checkbox {
    width: 100%;
    height: 100%;
  }
</style>
