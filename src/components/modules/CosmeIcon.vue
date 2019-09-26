<template>
  <div class="cosme">
    <div class="cosme-icon">
      <div class="name">{{ cosme.name }}</div>
      <div class="brand">{{ cosme.brand }}</div>
      <button class="show-modal-button" v-on:click="showEditCosmeModal()">編集</button>
    </div>
    <cosme-form-modal :formId="cosme.id" formType="edit" :focusingType="type" :focusingCosme="cosme"/>
  </div>
</template>

<script>
import CosmeFormModal from '@/components/modules/CosmeFormModal.vue'

export default {
  name: 'cosme-icon',
  components: {
    CosmeFormModal
  },
  props: {
    type: {
      type: String,
      required: true
    },
    cosme: {
      type: Object,
      required: true
    }
  },
  methods: {
    showEditCosmeModal(){
      this.$modal.show(`form-modal-${this.cosme.id}`)
    }
  },
   computed: {
    themes() {
      return this.$store.getters['userData/themes']
    }
  }

}
</script>

<style scoped>
.cosme {
  display: inline-block;
}
.cosme-icon {
  width: 90px;
  height: 120px;
  margin: 4px;
  padding: 10px;
  box-shadow: 0 2px 0 rgba(9,30,66,.25);
  border-radius: 10px;
  font-family: "serif";
  font-size: 15px;
  text-align: center;
  background-color: lightpink;
  word-break: break-all;
  overflow: scroll;
  cursor:pointer;
}
.show-modal-button {
  border-radius: 10px;
  font-family: "serif";
  max-height: 100%;
  margin-bottom: 8px;
}
.brand {
  font-size: 8px;
  color: rgb(99, 96, 92);
  text-align: center;
}
</style>
