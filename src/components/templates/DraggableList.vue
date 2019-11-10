<template>
  <div id="dg-list" class="draggable-list-template container-fluid">
    <div>
      <draggable
        class="draggable-list row"
        v-model="cosmeIds"
        v-bind="dragOptions"
      >
        <div
          class="cosme-icon-wrap col-xl-2 col-md-3 col-sm-4 col-6 px-1 mb-2"
          v-for="cosmeId in cosmeIds"
          :key="cosmeId"
        >
        <slot :cosmeId="cosmeId"></slot>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'cosme-list',
  components: {
    draggable
  },
  props: [
    'value'
  ],
  computed: {
    cosmeIds: {
      get() {
        return this.value
      },
      set(newCosmeIds) {
        this.$emit('input', newCosmeIds)
      }
    },
    dragOptions() {
      return {
        animation: 200,
        delay: 100
      }
    },
    fakeCosmes() {
      return [...new Array(10).keys()].map(num => `fakeCosme${num}`)
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
    height: 124px
  }
}
#dg-list .draggable-list {
  overflow: hidden;
  padding: 8px;
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
/* #dg-list #dg-list.main {

  height: 0;
  transition: height 0.3s;
} */
/* #dg-list .draggable-list.main.isOpened {
  height: 300px;
} */
/* #dg-list .ul-user {
  padding-left: 0px;
}

#dg-list .cosme-user {
  position: relative;
  height: 100%;
  width: 100%;
  font-size: 16px;
  background-color: rgb(248, 241, 242);
  color: #b25a74;
  border-radius: 2px;
  word-break: break-all;
  overflow: hidden;
  cursor: pointer;
  padding: 0px;
} */
/* #dg-list .input-checkbox + .cosme-icon-wrap {
  filter: brightness(80%);
  transition: all 0.4s;
}
#dg-list .input-checkbox:checked + .cosme-icon-wrap {
  filter: none;
  animation: spring 0.3s;
}
#dg-list .input-checkbox:checked + .cosme-icon-wrap::after {
  content: "";
  position: absolute;
  top: 4%;
  right: 8%;
  width: 8px;
  height: 16px;
  border-bottom: 4px solid pink;
  border-right: 4px solid pink;
  transform: rotate(45deg);
} */
</style>
