<template>
  <div id="dg-list" class="draggable-list-template">
    <div class="draggable-list-wrap container-fluid text-center">
      <div v-if="!cosmesStatus.allLoaded" class="spinner-border text-light my-3" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <div v-else>
        <div v-if="!value.length">
          <span>コスメを登録しましょう!</span>
        </div>
      </div>
      <draggable class="draggable-list row" v-model="cosmeIds" v-bind="dragOptions">
        <div
          class="cosme-icon-wrap col-xl-2 col-md-3 col-sm-4 col-6 px-1 mb-2"
          v-for="cosmeId in cosmeIds"
          :key="cosmeId"
        >
          <slot :cosmeId="cosmeId" />
        </div>
      </draggable>
      <div
        v-if="!cosmesStatus.changeLoaded"
        class="spinner-wrap d-flex justify-content-center align-items-center"
      >
        <div class="spinner-border text-light" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { mapGetters } from 'vuex'
export default {
  name: 'draggable-list',
  components: {
    draggable
  },
  props: ['value'],
  computed: {
    ...mapGetters('userData', ['cosmesStatus']),
    cosmeIds: {
      get() {
        return this.value
      },
      set(newCosmeIds) {
        if (newCosmeIds.every(v => v !== null)) {
          this.$emit('input', newCosmeIds)
        }
      }
    },
    dragOptions() {
      return {
        animation: 200,
        delay: 100
      }
    }
  }
}
</script>

<style scoped>
.draggable-list-template#dg-list {
  overflow: hidden;
  padding: 12px 8px 8px;
  background-color: #f3e3e6;
  border-radius: 8px;
  transition: all 0.4s;
}
#dg-list .cosme-icon-wrap.sortable-ghost {
  opacity: 0;
}
#dg-list .fake-icon {
  height: 0;
}
#dg-list .spinner-wrap {
  height: 100px;
}
</style>
