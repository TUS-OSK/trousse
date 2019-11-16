<template>
  <div id="icon" class="cosme-btn-component">
    <button class="cosme-btn" @click="onClick(cosmeData.id)">
      <cosme-icon :cosme="cosmeData"/>
    </button>
  </div>
</template>

<script>
import CosmeIcon from '@/components/templates/CosmeIcon.vue'

export default {
  name: 'cosme-btn',
  data() {
    return {
      acitve: true
    }
  },
  components: {
    CosmeIcon
  },
  props: {
    cosmeData: {
      type: Object
    },
    onClick: {
      type: Function
    }
  }
}
</script>

<style scoped>
  .cosme-btn {
    width: 100%;
    background-color: transparent;
  }
</style>
