<template>
  <modal :name="`form-modal-${formId}`" width="100%" height="70%" :pivotY="1.0">
    <div class="cosme-form-modal">
      <div class="ml-inputs">
        <h3 class="ml-input-title">コスメの名前</h3>
        <input class="ml-input" v-model="cosmeNameText" type="text" name="name" >
        <h3 class="ml-input-title">コスメのブランド</h3>
        <input class="ml-input" v-model="cosmeBrandText">
        <h3 class="ml-input-title">コスメの色味</h3>
        <input class="ml-input" v-model="cosmeColorText" type="text" name="color" >
        <h3 class="ml-input-title">コスメのテーマ</h3>
        <div class="ml-checkboxes-area">
          <label class="ml-cb-label" v-for="theme in themes" :key="theme">
            <input class="ml-cb-input" v-model="cosmeThemeCheckbox" :value="theme" type="checkbox">{{ toJapanese(theme) }}
          </label>
        </div>
      </div>
      <div class="buttons" >
        <div class="ml-update-btns" v-if="formType === 'edit'">
          <button class="ml-btn" v-on:click="updateCosmeInfo()">コスメ情報を更新</button>
          <button class="ml-btn" v-on:click="showConfirmModal()">コスメを削除</button>
        </div>
        <div class="ml-update-btns" v-else>
          <button v-on:click="updateCosmeInfo()">コスメを登録</button>
        </div>
      </div>
      <modal :name="`delete-modal-${formId}`">
        <div>本当に削除しますか？</div>
        <button v-on:click="deleteCosmeInfo()">はい</button>
        <button v-on:click="hideConfirmModal()">いいえ</button>
      </modal>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'cosme-form-modal',
  props: {
    formId: {
      type: String,
      required: true
    },
    formType: {
      type: String,
      required: true,
      validator: value => ['edit', 'register'].includes(value)
    },
    focusingType: {
      type: String,
      required: true
    },
    focusingCosme: {
      type: Object
    }
  },
  data(){
    if(this.formType === 'edit') {
      return {
        cosmeBrandText: this.focusingCosme.brand,
        cosmeNameText: this.focusingCosme.name,
        cosmeColorText: this.focusingCosme.color,
        cosmeThemeCheckbox: this.focusingCosme.theme
      }
    } else if(this.formType === 'register') {
      return {
        cosmeBrandText: '',
        cosmeNameText: '',
        cosmeColorText: '',
        cosmeThemeCheckbox: []
      }
    }
  },
  methods: {
    updateCosmeInfo(){
      const newCosme = {
        type: this.focusingType,
        info: {
          brand: this.cosmeBrandText,
          name: this.cosmeNameText,
          color: this.cosmeColorText,
          theme: this.cosmeThemeCheckbox
        }
      }
      if(this.formType === 'edit') {
        newCosme.info.id = this.focusingCosme.id
        this.$store.dispatch('userData/changeCosmeInfo', newCosme)
        this.$store.dispatch('userData/loadMain')
      } else if(this.formType === 'register') {

        this.$store.dispatch('userData/registerCosmeInfo', newCosme)
        this.$store.dispatch('userData/loadMain')

        this.cosmeBrandText = ''
        this.cosmeNameText = ''
        this.cosmeColorText = ''
        this.cosmeThemeCheckbox = []
      }
      this.$modal.hide(`form-modal-${this.formId}`)
    },
    deleteCosmeInfo(){
      this.$store.dispatch('userData/deleteCosmeInfo', this.formId)
      this.$store.dispatch('userData/loadMain')
    },
    showConfirmModal(){
      this.$modal.show(`delete-modal-${this.formId}`)
    },
    hideConfirmModal(){
      this.$modal.hide(`delete-modal-${this.formId}`)
    },
    toJapanese(word) {
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
.cosme-form-modal {
  padding: 20px;
}
.ml-cb-label {
  display: inline-block;
  background-color: rgb(243, 234, 183);
  padding: 8px;
  margin: 8px;
  border-radius: 12px;
  font-size: 20px;
  width: auto;
}
.ml-cb-input {
  outline: none;
  margin: 0 4px 0 0;
}
.ml-input {
  border: none;
  border-radius: 12px;
  font-size: 20px;
  background-color: rgb(243, 234, 183);
  margin: 12px;
  padding: 12px;
  width: 85%;
}
.ml-update-btns {
  width: 100vw;
}
.ml-btn {
  background-color: blanchedalmond
}
.ml-checkboxes-area {
  margin: 12px;
}

</style>
