<template>
<div class="cosme-icon-component">
  <div v-if="iconType === 'main'">
    <div class="cosme-icon" :class="cosme.color">
      <div class="name">{{ cosme.name }}</div>
      <div class="brand">{{ cosme.brand }}</div>
      <div class="theme">
        <span v-for="(theme, index) in cosme.theme" :key="`$theme-${cosme.id}-${index}`">{{ theme }}</span>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="cosme-icon" @click="showEditCosmeModal()">
      <div class="name">{{ cosme.name }}</div>
      <div class="brand">{{ cosme.brand }}</div>
    </div>
    <cosme-form-modal :formId="cosme.id" formType="edit" :focusingType="type" :focusingCosme="cosme"/>
  </div>
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
    iconType: {
      type: String,
      required: true,
      validator: value => ['main', 'edit'].includes(value)
    },
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

.cosme-list-checkbox {
  display: none;
}
.mn-cm-li-checkbox:checked + .mn-cm-li-label .cosme-icon-component .cosme-icon {
  filter: none;
}
.mn-cm-li-checkbox + .mn-cm-li-label .cosme-icon-component .cosme-icon {
  filter: brightness(80%)
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
.pink {
  border-color: pink;
}
.orange {
  border-color: orange;
}
.red {
  border-color: red;
}
.beige {
  border-color: rgb(83, 83, 30);
}
</style>
