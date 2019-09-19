<template>
    <div>
      <div>コスメの分野:{{type}}</div>
          <div>コスメの名前:<input v-model="cosmeNameText" type="text" name="name" ></div>
          <div>コスメのブランド:<input v-model="cosmeBrandText" type="text" name="brand"></div>
          <div>コスメの色味:<input v-model="cosmeColorText" type="text" name="color" ></div>
          <div>コスメのテーマ:
              <input v-model="cosmeThemeCheckbox" value="spring" type="checkbox">
            <label>春</label>
            <input v-model="cosmeThemeCheckbox" value="summer" type="checkbox">
            <label>夏</label>
            <input v-model="cosmeThemeCheckbox" value="autumn" type="checkbox">
            <label>秋</label>
            <input v-model="cosmeThemeCheckbox" value="winter" type="checkbox">
            <label>冬</label>
          </div>
          <button v-on:click="saveForm(type)">コスメを登録</button>
    </div>
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
    }
  }
}
</script>

<style scoped>
</style>
