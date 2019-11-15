<template>
  <div id="display" class="cosme-display-template">
    <div class="cosme-display-wrap container-fluid text-center">
      <div v-if="!cosmesStatus.allLoaded" class="spinner-border text-light my-3" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <div v-else>
        <div v-if="!cosmeIds.length">
          <span>コスメを登録しましょう!</span>
        </div>
      </div>
      <div
      class="cosme-display row"
      >
        <div
          class="cosme-icon-wrap col-xl-2 col-md-3 col-sm-4 col-6 px-1 mb-2"
          v-for="cosmeId in cosmeIds"
          :key="cosmeId"
        >
          <slot :cosmeId="cosmeId" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'cosme-display',
  props: [
    'cosmeIds'
  ],
  computed: {
    ...mapGetters('userData', ['cosmesStatus'])
  }
}
</script>

<style scoped>
.cosme-display-template#display {
  overflow: hidden;
  padding: 8px;
  background-color: #f3e3e6;
  border-radius: 8px;
  transition: all 0.4s;
}
#display .cosme-icon-wrap.sortable-ghost {
  opacity: 0;
}
#display .fake-icon {
  height: 0;
}
</style>
