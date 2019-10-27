<template>
<div id="icon" class="cosme-icon-component">
  <div v-if="iconType === 'main'" class="cosme-icon main" :class="cosme.color">
    <div class="info">
      <div class="name">{{ cosme.name }}</div>
      <div class="brand">{{ cosme.brand }}</div>
      <div class="theme">
        <span v-for="(theme, index) in cosme.theme" :key="`$theme-${cosme.id}-${index}`">{{ theme }}</span>
      </div>
    </div>
  </div>
  <div v-else class="cosme-icon edit">
    <div class="info" :class="cosme.color">
      <div class="info">
        <div class="name">{{ cosme.name }}</div>
        <div class="brand">{{ cosme.brand }}</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>

export default {
  name: 'cosme-icon',
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
   computed: {
    themes() {
      return this.$store.getters['userData/themes']
    }
  },
  mounted() {
    this.$emit('mounted')
  }
}
</script>

<style scoped>
#icon .cosme-icon {
  position: absolute;
  top: 20%;
  right: 0;
  left: 0;
}

#icon .cosme-icon-component.sortable-ghost {
  opacity: 0;
}

#icon .show-modal-button {
  border-radius: 10px;
  font-family: "serif";
  max-height: 100%;
  margin-bottom: 8px;
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
