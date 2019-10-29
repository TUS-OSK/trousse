<template>
  <div id="modal" class="cosme-form-modal-component">
    <modal :name="`form-modal-${formId}`" width="100%" height="70%" :pivotY="1.0">
      <div class="cosme-form-modal container-fluid">
        <div class="form-wrap container-fluid">
          <h3 class="title">コスメの名前</h3>
          <div class="row">
            <div class="col-12">
              <input class="input-text col-12" v-model="cosmeNameText" type="text" name="name" />
            </div>
          </div>
          <h3 class="title">コスメのブランド</h3>
          <div class="row">
            <div class="col-12">
              <input class="input-text col-12" v-model="cosmeBrandText" type="text" name="name" />
            </div>
          </div>
          <h3 class="title">コスメの色味</h3>
          <div class="row">
            <div class="col-12">
              <input class="input-text col-12" v-model="cosmeColorText" type="text" name="name" />
            </div>
          </div>
          <h3 class="title">コスメのテーマ</h3>
          <div class="checkbox-group row">
            <div class="col-3" v-for="theme in themes" :key="theme">
              <label class="check-btn">
                <input
                  class="input-checkbox"
                  v-model="cosmeThemeCheckbox"
                  :value="theme"
                  type="checkbox"
                />
                {{ toJapanese(theme) }}
              </label>
            </div>
          </div>
        </div>
        <div class="button-group">
          <div class="update-btn" v-if="formType === 'edit'">
            <button class="modal-btn delete-btn col-6" v-on:click="showConfirmModal()">コスメを削除</button>
            <button class="modal-btn change-btn col-6" v-on:click="updateCosmeInfo()">コスメを更新</button>
          </div>
          <div class="update-btn" v-else>
            <button class="modal-btn register-btn" v-on:click="updateCosmeInfo()">コスメを登録</button>
          </div>
        </div>
        <modal :name="`delete-modal-${formId}`" width="100%" height="30%" :pivotY="1.0">
          <div class="cosme-delete-modal container-fluid">
            <div class="warning">
              <h3 class="title">Warning!</h3>
              <p class="text">本当に削除しますか？</p>
              <div class="warning-btn container-fluid">
                <div class="row">
                  <button class="modal-btn delete-btn col-6" v-on:click="deleteCosmeInfo()">はい</button>
                  <button class="modal-btn col-6" v-on:click="hideConfirmModal()">いいえ</button>
                </div>
              </div>
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
  data() {
    if (this.formType === 'edit') {
      return {
        cosmeBrandText: this.focusingCosme.brand,
        cosmeNameText: this.focusingCosme.name,
        cosmeColorText: this.focusingCosme.color,
        cosmeThemeCheckbox: this.focusingCosme.theme
      }
    } else if (this.formType === 'register') {
      return {
        cosmeBrandText: '',
        cosmeNameText: '',
        cosmeColorText: '',
        cosmeThemeCheckbox: []
      }
    }
  },
  methods: {
    updateCosmeInfo() {
      const newCosme = {
        type: this.focusingType,
        info: {
          brand: this.cosmeBrandText,
          name: this.cosmeNameText,
          color: this.cosmeColorText,
          theme: this.cosmeThemeCheckbox
        }
      }
      if (this.formType === 'edit') {
        newCosme.info.id = this.focusingCosme.id
        this.$store.dispatch('userData/changeCosmeInfo', newCosme)
        this.$store.dispatch('userData/loadMain')
      } else if (this.formType === 'register') {
        this.$store.dispatch('userData/registerCosmeInfo', newCosme)
        this.$store.dispatch('userData/loadMain')
        this.cosmeBrandText = ''
        this.cosmeNameText = ''
        this.cosmeColorText = ''
        this.cosmeThemeCheckbox = []
      }
      this.$modal.hide(`form-modal-${this.formId}`)
    },
    deleteCosmeInfo() {
      const newCosme = {
        type: this.focusingType,
        id: this.focusingCosme.id
      }
      this.$store.dispatch('userData/deleteCosmeInfo', newCosme)
      this.$modal.hide(`form-modal-${this.formId}`)
    },
    showConfirmModal() {
      this.$modal.show(`delete-modal-${this.formId}`)
    },
    hideConfirmModal() {
      this.$modal.hide(`delete-modal-${this.formId}`)
    },
    toJapanese(word) {
      switch (word) {
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
#modal .cosme-form-modal {
  position: relative;
  height: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
}
#modal .cosme-delete-modal {
  padding-top: 20px;
  padding-bottom: 20px;
}
/* for form-modal */

#modal .check-btn {
  background-color: rgb(243, 234, 183);
  border: 2px solid rgb(196, 183, 114);
}
#modal .input-text title {
  font-size: 16px;
}
#modal .input-text {
  border: 2px solid rgb(196, 183, 114);
  border-radius: 12px;
  font-size: 16px;
  background-color: rgb(243, 234, 183);
}
#modal .input-text:focus,
.input-checkbox:focus {
  border: 2px solid rgb(182, 55, 86);
}
/* for btns */
#modal .modal-btn {
  padding: 8px;
  text-align: center;
  font-size: 20px;
  border-radius: 12px;
  background-color: blanchedalmond;
  border: 2px solid rgb(196, 183, 114);
}
#modal .delete-btn {
  color: white;
  background-color: rgb(192, 29, 70);
  border: 2px solid rgb(192, 29, 70);
}
/* for delete modal */

#modal .warning .title {
  text-align: center;
}
#modal .warning .text {
  text-align: center;
}
</style>
