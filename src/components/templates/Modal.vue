<template>
  <div id="modal" class="modal-template">
    <transition name="fade">
      <div v-if="active" class="root">
        <div  class="modal-bg" @click="onClose()"></div>
        <div class="modal-inner">
          <button class="close-btn" @click="onClose()">閉じる</button>
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'modal',
  props: {
    active: {
      type: Boolean,
      required: true
    },
    onClose: {
      type: Function,
      required: true
    }
  }
}
</script>

<style scoped>
#modal .root {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  overflow-y: auto;
}

#modal .modal-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(196, 196, 196, 0.324);
}

#modal .modal-inner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

#modal .modal-inner .close-btn{
  position: absolute;
  top: 0;
  right: 0;
  padding: 8px;
  font-size: 12px;
  background-color: rgb(255, 109, 160);
  color: rgb(255, 248, 242);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .1s linear;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
