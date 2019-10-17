<template>
  <div class="cosme-form-modal">
    <modal :name="`form-modal-${formId}`">
      <div class="inputs">
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
          <label v-for="theme in themes" :key="theme">
            <input v-model="cosmeThemeCheckbox" :value="theme" type="checkbox">{{ toJapanese(theme) }}
          </label>
        </div>
      </div>
      <div class="buttons" >
        <div v-if="formType === 'edit'">
          <button v-on:click="updateCosmeInfo()">コスメ情報を更新</button>
          <button v-on:click="showConfirmModal()">コスメを削除</button>
        </div>
        <div v-else>
          <button v-on:click="updateCosmeInfo()">コスメを登録</button>
        </div>
      </div>
      <modal :name="`delete-modal-${formId}`">
        <div>本当に削除しますか？</div>
        <button v-on:click="deleteCosmeInfo()">はい</button>
        <button v-on:click="hideConfirmModal()">いいえ</button>
      </modal>
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
          id: this.focusingCosme.id,
          brand: this.cosmeBrandText,
          name: this.cosmeNameText,
          color: this.cosmeColorText,
          theme: this.cosmeThemeCheckbox
        }
      }
      if(this.formType === 'edit') {
        // this.$store.dispatch('userData/changeCosmeInfo', newCosme)
        // this.$store.dispatch('userData/loadMain')
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
</style>
