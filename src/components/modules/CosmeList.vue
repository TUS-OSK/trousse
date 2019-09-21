<template>
  <ul class="cosme-list">
    <li v-for="cosme in cosmesData.cosmeAry" :key="cosme.id" class="cosme-list">
      <div class="cosme-list-function">
        <label class="cosme-list-label">
          <input class="cosme-list-checkbox" type="checkbox" v-model="isChecked" :value="cosme.id">- cosme info -
        </label>
      </div>
      <ul>
        <li v-for="( info, infoName ) in cosme" :key="infoName" class="cosme-list-info"> {{ infoName }}: {{ info }} </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'cosme-list',
  props: {
    cosmesData: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters('userData', [
      'allCosmeIds'
    ]),
    ...mapGetters('pages/main', [
      'unCheckedItems'
    ]),
    isChecked: {
      get() {
        return this.allCosmeIds[this.cosmesData.type].filter(id => !this.unCheckedItems[this.cosmesData.type].includes(id))
      },
      set(value) {
        const listData = {
          type: this.cosmesData.type,
          cosmes: this.allCosmeIds[this.cosmesData.type].filter(id => !value.includes(id))
        }
        this.$store.dispatch('pages/main/loadCheckedItems', listData)
      }
    }
  }
}
</script>
