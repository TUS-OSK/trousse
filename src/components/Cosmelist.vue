<template>
  <div>
    <li class="item"> {{ item.name }}
      <button class="cosmechangeformbutton" v-on:click="editShowCosmeChangeFormButtonClicked()">コスメ情報を編集</button>
      <div class="info">{{ item.id }}</div>
      <div class="info">{{ item.brand }}</div>
      <div class="info">{{ item.color }}</div>
      <div class="info">{{ item.theme }}</div>

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
          <button v-on:click="hideConfirmModal()">いいえ</button>
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
    hideConfirmModal(){
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
  list-style-type: none;
  font-family: "serif";
  background-color: #f3e2f0;
  border-radius: 3px;
  max-height: 100%;
  white-space: normal;
  box-shadow: 0 2px 0 rgba(9,30,66,.25);
  margin-bottom: 8px;
}
.item{
  font-size: 20px;
}
.info{
  font-size: 10px;
}
</style>
