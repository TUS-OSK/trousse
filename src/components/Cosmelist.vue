<template>
  <div>
    <li class="item"> {{ item.name }}
      <button v-on:click="editShowCosmeChangeFormButtonClicked()">コスメ情報を編集</button>
      <div class="id">{{ item.id }}</div>
      <div class="brand">{{ item.brand }}</div>
      <div class="color">{{ item.color }}</div>
      <div class="image">{{ item.theme }}</div>

      <modal :name="`cosmelistform-${id}`">
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
        <button v-on:click="showDeleteCosmeModal()">コスメを削除</button>
        <modal :name="`deletecosme-${id}`">
          <div>本当に削除しますか？</div>
          <button v-on:click="deleteCosme()">はい</button>
          <button v-on:click="hideModal()">いいえ</button>
          </modal>
      </modal>
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
      this.$modal.show(`cosmelistform-${this.id}`)
    },
    updateInformation(){
      this.$modal.hide(`cosmelistform-${this.id}`)
      this.$store.dispatch('userData/loadMain')
      this.item.name = this.cosmeNameText,
      this.item.brand = this.cosmeBrandText,
      this.item.color = this.cosmeColorText,
      this.item.theme = this.cosmeThemeCheckbox
    },
    showDeleteCosmeModal(){
      this.$modal.show(`deletecosme-${this.id}`)
    },
    deleteCosme(){
      this.$store.dispatch('userData/deleteCosmeInformation', this.id)
      this.$store.dispatch('userData/loadMain')
    },
    hideModal(){
      this.$modal.hide(`deletecosme-${this.id}`)
    }
  },
   computed: {
    list() {
      return this.$store.getters['userData/cosmes'][this.type]
    }
  }

}
</script>

<style scoped>
li {
  cursor:pointer;
  padding: 10px;
  border: solid #ddd 1px;
  list-style-type: none;
}
.item{
  font-size: 20px;
}
.id{
  font-size: 10px;
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
