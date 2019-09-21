<template>
  <div class="suggested-cosmes-list">
    <div v-if="isSuggested">
      <div v-for="(item, type) in currentHistory" :key="type">
        <ul>
          <h3>{{ type }}</h3>
          <li v-for="(info, infoName) in item" :key="info.id"> {{ infoName }}: {{ info }} </li>
        </ul>
      </div>
      <button @click="suggestCosmes()">もう一回やる！</button>
    </div>
    <div v-else>
      <button @click="suggestCosmes()">結果を表示する！</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'suggested-cosmes-list',
  computed: {
    ...mapGetters('userData', [
      'cosmeTypes',
      'cosmes',
      'allCosmeIds'
    ]),
    ...mapGetters('pages/main', [
      'isOpened',
      'unCheckedTypes',
      'unCheckedItems',
      'history'
    ]),
    currentHistory() {
      return this.history.slice(-1)[0]
    }
  },
  methods: {
    suggestCosmes() {
      const suggestedCosmes = {}
      const checkedTypes = this.cosmeTypes.filter(type => !this.unCheckedTypes.includes(type))

      checkedTypes.forEach(type => {
        const checkedCosmes = {}
        checkedCosmes[type] = this.cosmes[type].filter(item => !this.unCheckedItems[type].includes(item.id))
        suggestedCosmes[type] = checkedCosmes[type][Math.floor(Math.random() * checkedCosmes[type].length)]
      })
      this.$store.dispatch('pages/main/loadHistory', suggestedCosmes)

      if(!this.isSuggested) {
        this.isSuggested = !this.isSuggested
      }
    }
  },
  data() {
    return {
      isSuggested: false
    }
  }
}
</script>
