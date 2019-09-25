<template>
    <modal name="inputform">
      <div>コスメの分野:{{type}}</div>
          <div>コスメの名前:<input v-model="cosmeNameText" type="text" name="name" ></div>
          <div>コスメのブランド:<input v-model="cosmeBrandText" type="text" name="brand"></div>
          <div>コスメの色味:<input v-model="cosmeColorText" type="text" name="color" ></div>
          <div>コスメのテーマ:
          <label v-for="theme in themes" :key="theme">
            <input v-model="cosmeThemeCheckbox" :value="theme" type="checkbox">{{ translateJ(theme) }}
          </label>
          </div>
          <button v-on:click="saveForm(type)">コスメを登録</button>
    </modal>
</template>

<script>
export default {
  name: 'inputform',
  props: {
    type: {
      type: String,
      required: true
    }
  },
  data(){
    return {
      cosmeBrandText: '',
      cosmeNameText: '',
      cosmeColorText: '',
      cosmeThemeCheckbox: []
    }
  },
  methods: {
    saveForm(type){
      const item = {
        type,
        info: {
          brand: this.cosmeBrandText,
          name: this.cosmeNameText,
          color: this.cosmeColorText,
          theme: this.cosmeThemeCheckbox
        }
      }
      this.$store.dispatch('userData/registerCosmeInformation', item)
      this.$store.dispatch('userData/loadMain')
      this.cosmeBrandText = ''
      this.cosmeNameText = ''
      this.cosmeColorText = ''
      this.cosmeThemeCheckbox = []
      this.$modal.hide('inputform')
    },
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
  },
  computed: {
    themes() {
      return this.$store.getters['userData/themes']
    }
  }
}
</script>

<style scoped>
</style>
