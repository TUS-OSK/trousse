<template>
<div>
    <li class="item"> {{ item.name }}
      <button v-on:click="editShowCosmeChangeFormButtonClicked(id)">{{
        openChangeForm ? '閉じる' : 'コスメ情報を編集'
      }}</button>
      <div class="brand">{{ item.id }}</div>
      <div class="brand">{{ item.brand }}</div>
      <div class="color">{{ item.color }}</div>
      <div class="image">{{ item.theme }}</div>

      <div v-if="openChangeForm">
        <div>コスメの名前:
          <input v-model="cosmeNameText" type="text" name="name" >
        </div>
        <div>コスメのブランド:
          <input v-model="cosmeBrandText">
        </div>
        <div>コスメの色味:
          <input v-model="cosmeColorText" type="text" name="color" >
        </div>
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
        <button v-on:click="updateInformation()">コスメ情報を更新</button>
        <button v-on:click="deleteCosme()">コスメを削除</button>
      </div>
    </li>
</div>

</template>

<script>
export default {
  name: 'cosmelist',
  props: {
    type: {
      type: String,
      required: true
    },
    item: {
      type: Object
    },
    id: {
      type: String
    }
  },
  data(){
    return {
      cosmeNameText: this.item.name,
      cosmeBrandText: this.item.brand,
      cosmeColorText: this.item.color,
      cosmeThemeCheckbox: this.item.theme
      }
  },
  methods: {
    editShowCosmeChangeFormButtonClicked(){
      this.$store.dispatch('userData/memoryCosmeId', this.id)
      if(this.openChangeForm) {
        this.$store.dispatch('pages/cosmelist/closeChangeForm')
      } else {
        this.$store.dispatch('pages/cosmelist/openChangeForm', this.id)
      }
    },
    updateInformation(){
      this.$store.dispatch('userData/loadMain')
      this.item.name = this.cosmeNameText,
      this.item.brand = this.cosmeBrandText,
      this.item.color = this.cosmeColorText,
      this.item.theme = this.cosmeThemeCheckbox
    },
    deleteCosme(){
      this.$store.dispatch('userData/deleteCosmeInformation', this.id)
      this.$store.dispatch('userData/loadMain')
    }
  },
   computed: {
    list() {
      return this.$store.getters['userData/cosmes'][this.type]
    },
    openChangeForm() {
      return this.id === this.openChangeFormId
    },
    openChangeFormId() {
      return this.$store.getters['pages/cosmelist/openChangeFormId']
    }
  }

}
</script>

<style scoped>
.item{
  font-size: 20px;
  border-bottom: 1px dashed #000000;
}
.brand{
  font-size: 10px;
}
.color{
  font-size: 10px;
}
.image{
  font-size: 10px;
}
</style>
