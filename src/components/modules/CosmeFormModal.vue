<template>
  <div id="modal" class="cosme-form-modal-component">
    <modal :name="`form-modal-${formId}`" :scrollable="true" width="95%" height="auto" :plotY="1.0">
      <div class="cosme-form-modal container-fluid">
        <div class="form-wrap container-fluid">
          <section class="input-form">
            <label class="title">NAME</label>
            <input class="input-text" v-model="cosmeNameText" type="text" name="name" :placeholder="`xxx-${focusingType}`"/>
          </section>
          <section class="input-form">
            <label class="title">BRAND</label>
            <input class="input-text" v-model="cosmeBrandText" type="text" name="name" placeholder="xxx-brand"/>
          </section>
          <section class="input-form">
            <label class="title">COLOR</label>
            <input class="input-text" v-model="cosmeColorText" type="text" name="name" placeholder="beige"/>
          </section>
          <section class="input-form">
            <label class="title">THEME</label>
            <div class="checkbox-group">
              <div
                class="check-button-wrap d-inline-block"
                v-for="(theme, index) in themes"
                :key="theme"
              >
                <input
                  :id="`input-${index}`"
                  class="input-checkbox d-none"
                  v-model="cosmeThemeCheckbox"
                  :value="theme"
                  type="checkbox"
                />
                <label class="check-btn" :for="`input-${index}`">
                  <span class="checkbox-wrap d-flex align-items-center justify-content-center">
                    <span class="stick"></span>
                    <span class="stick"></span>
                    <span class="checkbox"></span>
                    <span class="stick"></span>
                    <span class="stick"></span>
                  </span>
                  <span class="checkvalue d-flex align-items-center">{{ toJapanese(theme) }}</span>
                </label>
              </div>
            </div>
          </section>
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
        <modal :name="`delete-modal-${formId}`" width="95%" height="30%">
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
      type: Object,
      required: true
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
  padding: 32px 16px;
}
#modal .cosme-delete-modal {
  padding: 32px 16px;
}
/* for form-modal */

#modal .input-form {
  margin-bottom: 16px;
}

#modal .input-form .title {
  color: rgb(55, 26, 26);
  font-size: 20px;
  font-weight: 500;
}
#modal .input-form .input-text {
  color: black;
  font-size: 16px;
  font-weight: 500;
  width: 100%;
  padding: 8px 12px;
  border: 2px solid rgb(235, 197, 164);
  border-radius: 4px;
  background-color: rgb(255, 234, 210);
  transition: border 0.1s linear;
}
#modal .input-form .input-text::placeholder {
  color: rgba(210, 138, 138, 0.762);
}

#modal .check-btn {
  display: inline-block;
  width: auto;
}
#modal .check-btn {
  padding: 4px;
  display: flex;
  flex-direction: row;
}
#modal .check-btn .checkvalue > * {
  margin-right: 4px;
}
#modal .check-btn .checkbox-wrap {
  width: 40px;
  height: 40px;
}
#modal .check-btn .checkvalue {
  font-size: 16px;
}

#modal .check-btn .checkbox {
  content: "";
  border-radius: 4px;
  width: 20px;
  height: 20px;
  opacity: 0.6;
  border: 2px solid gray;
  /* #f56868; */
  transition: all 0.2s;
}

#modal .input-checkbox:checked + .check-btn .checkbox {
  animation: shrink 0.1s;
  opacity: 1;
  background-color: #f3aecb;
  /* #f56868e3; */
}
#modal .input-checkbox + .check-btn .stick {
  position: absolute;
  height: 0px;
  width: 2px;
  border-radius: 2px;
  background-color: #f56868;
  transition: all 0.4s;
}
#modal .input-checkbox:checked + .check-btn .stick {
  animation: stick 0.4s;
}
#modal .input-checkbox + .check-btn .stick:nth-child(1) {
  transition: all 0.4s;
  transform: translate(-12px, -8px) rotate(-65deg);
}
#modal .input-checkbox:checked + .check-btn .stick:nth-child(1) {
  transform: translate(-18px, -12px) rotate(-65deg);
}
#modal .input-checkbox + .check-btn .stick:nth-child(2) {
  transform: translate(-8px, -12px) rotate(-25deg);
}
#modal .input-checkbox:checked + .check-btn .stick:nth-child(2) {
  transform: translate(-12px, -18px) rotate(-25deg);
}
#modal .input-checkbox + .check-btn .stick:nth-child(4) {
  transition: all 0.4s;
  transform: translate(8px, 12px) rotate(-25deg);
}
#modal .input-checkbox:checked + .check-btn .stick:nth-child(4) {
  transform: translate(12px, 18px) rotate(-25deg);
}
#modal .input-checkbox + .check-btn .stick:nth-child(5) {
  transform: translate(12px, 8px) rotate(-65deg);
}
#modal .input-checkbox:checked + .check-btn .stick:nth-child(5) {
  transform: translate(18px, 12px) rotate(-65deg);
}

#modal .input-text:focus {
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
