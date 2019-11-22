<template>
  <div id="modal" class="modal-template">
    <transition name="fade">
      <div v-if="active" class="root">
        <div  class="modal-bg" @click="onClose()"></div>
        <div class="modal-inner">
          <button class="close-btn d-flex justify-content-center align-items-center" @click="onClose()">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
          </button>
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

#modal .modal-inner .close-btn {
  position: fixed;
  top: 0;
  right: 0;
  width: 44px;
  height: 44px;
  padding: 4px;
  margin: 8px;
  font-size: 20px;
  background-color: rgb(255, 109, 160);
  border-radius: 50%;
  color: white;
}
#modal .modal-inner .close-btn svg{
  width: 28px;
  height: 28px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .1s linear;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
