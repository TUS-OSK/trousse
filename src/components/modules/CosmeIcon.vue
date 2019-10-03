<template>
  <div class="cosme">
    <div class="cosme-icon" @click="showEditCosmeModal()">
      <div class="name">{{ cosme.name }}</div>
      <div class="brand">{{ cosme.brand }}</div>
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
  width: 64px;
  height: 64px;
  margin: 8px;
  padding: 12px;
  border-radius: 12px;
  font-size: 12px;
  text-align: center;
  background-color: rgb(248, 241, 242);
  border: 4px solid #B25A74;
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
