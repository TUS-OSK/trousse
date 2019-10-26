<template>
 <div class="cosme-form-modal-component">
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
            <button class="ml-btn ml-delete-btn" v-on:click="showConfirmModal()">コスメを削除</button>
            <button class="ml-btn ml-change-btn" v-on:click="updateCosmeInfo()">コスメを更新</button>
          </div>
          <div class="ml-update-btns" v-else>
            <button class="ml-btn ml-register-btn" v-on:click="updateCosmeInfo()">コスメを登録</button>
          </div>
        </div>
      <modal :name="`delete-modal-${formId}`" width="100%" height="20%" :pivotY="1.0" >
          <div class="ml-cosme-warning-modal">
            <h3 class="ml-ml-warning-title">Warning!</h3>
            <p class="ml-ml-warning-txt">本当に削除しますか？</p>
            <div class="ml-ml-warning-btns">
              <button class="ml-btn ml-delete-btn" v-on:click="deleteCosmeInfo()">はい</button>
              <button class="ml-btn" v-on:click="hideConfirmModal()">いいえ</button>
            </div>
          </div>
        </modal>
        </div>
    </modal>
  </div>
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
  margin: 0 12px 12px 0;
  border-radius: 12px;
  font-size: 16px;
  width: auto;
}
/* for input */
.ml-cb-input {
  margin: 0 4px 0 0;
}
.ml-cb-label {
  border: 2px solid rgb(196, 183, 114);
}
.ml-checkboxes-area {
  margin: 12px;
}
.ml-input-title {
  font-size: 16px;
}
.ml-input {
  border: 2px solid rgb(196, 183, 114);
  border-radius: 12px;
  font-size: 16px;
  background-color: rgb(243, 234, 183);
  margin: 12px;
  padding: 8px;
  width: 85%;
}
.ml-input:focus, .ml-cb-input:focus {
  border: 2px solid rgb(182, 55, 86);
}
/* for btns */
.ml-update-btns {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}
.ml-btn {
  padding: 8px;
  text-align: center;
  font-size: 20px;
  border-radius: 12px;
  background-color: blanchedalmond;
  border: 2px solid rgb(196, 183, 114);
}
.ml-delete-btn {
  color: white;
  background-color: rgb(192, 29, 70);
  border: 2px solid rgb(192, 29, 70);
}
/* for delete modal */
.ml-ml-warning-title {
  margin: 12px;
  text-align: center;
}
.ml-ml-warning-txt {
  text-align: center;
  margin: 4px;
}
.ml-ml-warning-btns {
  display: flex;
  justify-content: center;
}
.ml-cosme-delete-modal {
  width: 100px;
}

</style>
