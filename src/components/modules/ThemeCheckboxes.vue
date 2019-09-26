<template>
  <div class="theme-checkboxes">
    <label v-for="theme in themes" :key="theme">
      <input v-model="cosmeThemeCheckbox" :value="theme" type="checkbox">{{ translateJ(theme) }}
    </label>
  </div>
</template>

<script>
export default {
  name: 'theme-checkboxes',
  data() {
    return {
      cosmeThemeCheckbox: this.item.theme
    }
  },
  computed: {
    themes() {
      return this.$store.getters['userData/themes']
    }
  },
  methods: {
    translateJ(word) {
      switch(word) {
        case 'spring':
          return '春'
        case 'summer':
          return '夏'
        case 'autumn':
          return '秋'
        case 'winter':
          return '冬'
      }
      return word
    }
  }
}
</script>
