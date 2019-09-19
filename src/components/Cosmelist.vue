<template>
<div>
    <li class="item"> {{ item.name }}
      <button v-on:click="editCosmeChangeInformationButtonClicked()">{{
        openChangeForm ? '閉じる' : 'コスメ情報を編集'
      }}</button>
      <div class="brand">{{ item.id }}</div>
      <div class="brand">{{ item.brand }}</div>
      <div class="color">{{ item.color }}</div>
      <div class="image">{{ item.theme }}</div>

      <div v-if="openChangeForm">
        <div>コスメの名前:<input v-model="cosmeNameText" type="text" name="name" ></div>
        <div>コスメのブランド:<input v-model="cosmeBrandText"></div>
        <div>コスメの色味:<input v-model="cosmeColorText" type="text" name="color" ></div>
        <div>コスメのテーマ:
          <input v-model="cosmeThemeCheckbox.spring" value="spring" type="checkbox">
            <label>春</label>
          <input v-model="cosmeThemeCheckbox.summer" value="summer" type="checkbox">
          <label>夏</label>
          <input v-model="cosmeThemeCheckbox.autumn" value="autumn" type="checkbox">
            <label>秋</label>
          <input v-model="cosmeThemeCheckbox.winter" value="winter" type="checkbox">
            <label>冬</label>
        </div>
        <button>コスメ情報を更新</button>
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
      cosmeThemeCheckbox: {
        spring: this.item.theme,
        summer: this.item.theme,
        autumn: this.item.theme,
        winter: this.item.theme
      }
    }
  },
  methods: {
    editCosmeChangeInformationButtonClicked(){
      if(this.openChangeForm) {
        this.$store.dispatch('pages/cosmelist/closeChangeForm')
      } else {
        this.$store.dispatch('pages/cosmelist/openChangeForm', this.id)
      }
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
