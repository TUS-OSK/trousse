<template>
<div>
    <li class="item"> {{ item.name }}
      <button v-on:click="editCosmeChengeInformationButtonClicked()">コスメ情報を編集</button>
      <div class="brand">{{ item.id }}</div>
      <div class="brand">{{ item.brand }}</div>
      <div class="color">{{ item.color }}</div>
      <div class="image">{{ item.theme }}</div>
      <div class="image">{{ id }}</div>

      <div v-if="id === openChangeFormId">
        <div>コスメのブランド:<input v-model="cosmeBrandText"></div>
        <div>コスメの名前:<input v-model="cosmeNameText" type="text" name="name" ></div>
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
      cosmeBrandText: '',
      cosmeNameText: '',
      cosmeColorText: '',
      cosmeThemeCheckbox: []
    }
  },
  methods: {
    editCosmeChengeInformationButtonClicked(){
      this.$store.dispatch('pages/cosmelist/openChangeForm', this.id)
    }
  },
   computed: {
    list() {
      return this.$store.getters['userData/cosmes'][this.type]
    },
    openChangeFormId() {
      return this.$store.getters['pages/cosmelist/openChangeFormId']
    }
  }

}
</script>

<style scoped>
</style>
