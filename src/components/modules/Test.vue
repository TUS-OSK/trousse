<template>
  <section>
    <div class="l-wrapper">
      <button class="p-modalBtn" @click="openItem">{ ここをクリックすると、モーダルが開きます。}</button>
    </div>
    <div class="p-modal" :class="{'is-open': isModalActive}">
      <button class="p-modelBt" @click="openItem">{ ここをクリックすると、モーダルが閉じます }</button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'test',
  data(){
    return {
      isModalActive: false
    }
  },
  methods: {
    openItem() {
      this.isModalActive = !this.isModalActive
    }
  }
}
</script>

<style>
.p-modal {
  z-index: -1;
  opacity: 0;
  visibility: hidden;
  /* ここまで初期設定 */
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
}

.is-open {
  z-index: 100;
  opacity: 1;
  visibility: visible;
  /* ここまで変更 */
  background-color: rgba(255, 255, 255, 0.5);
}
</style>
