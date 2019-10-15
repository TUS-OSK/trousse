<template>
<div class="cosme-icon-component">
  <div v-if="iconType === 'main'">
    <div class="cosme-icon" :class="cosme.color">
      <div class="icon-check-area"><div class="icon-check"></div></div>
      <div class="icon-content">
        <div class="name">{{ cosme.name }}</div>
        <div class="brand">{{ cosme.brand }}</div>
        <div class="theme">
          <span v-for="(theme, index) in cosme.theme" :key="`$theme-${cosme.id}-${index}`">{{ theme }}</span>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="cosme-icon" :class="cosme.color" @click="showEditCosmeModal()">
      <div class="icon-content">
        <div class="name">{{ cosme.name }}</div>
        <div class="brand">{{ cosme.brand }}</div>
      </div>
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
    transform: scale(1.0);
  }
}

.cosme {
  display: inline-block;
}

.cosme-icon-component.sortable-ghost {
  opacity: 0
}

.cosme-list-checkbox {
  display: none;
}
.mn-cm-li-checkbox:checked + .mn-cm-li-label .cosme-icon-component .cosme-icon {
  filter: none;
  animation: spring .3s;
}
.mn-cm-li-checkbox + .mn-cm-li-label .cosme-icon-component .cosme-icon {
  filter: brightness(80%);
  transition: all .4s
}
.cosme-icon {
  width: 88px;
  height: 88px;
  margin: 8px;
  border-radius: 12px;
  font-size: 12px;
  text-align: center;
  background-color: rgb(248, 241, 242);
  border: 4px solid #B25A74;
  word-break: break-all;
  overflow: hidden;
  cursor:pointer;
}
.icon-content {
  margin: 12px;
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
.icon-check-area {
  width: 4px;
  height: 8px;
  margin: 4px 8px;
}
.mn-cm-li-checkbox:checked + .mn-cm-li-label .cosme-icon-component .icon-check {
  width: 4px;
  height: 8px;
  border-bottom: 2px solid pink;
  border-right: 2px solid pink;
  transform: rotate(45deg);
}
</style>
