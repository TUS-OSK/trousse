<template>
  <div id="suggest" class="suggested-cosmes-list">
    <div class="container-fluid">
      <div v-if="isSuggested">
        <div class="cosme" v-for="(item, type) in currentHistory" :key="type">
          <h3>{{ type }}</h3>
          <ul>
            <li v-for="(info, infoName) in item" :key="info.id">{{ infoName }}: {{ info }}</li>
          </ul>
        </div>
        <button class="suggest-btn" @click="suggestCosmes()">もう一回やる！</button>
      </div>
      <div v-else>
        <button class="suggest-btn" @click="suggestCosmes()">結果を表示する！</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'suggested-cosmes-list',
  computed: {
    ...mapGetters('userData', ['cosmeTypes', 'cosmes', 'allCosmeIds']),
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
      const checkedTypes = this.cosmeTypes.filter(
        type => !this.unCheckedTypes.includes(type)
      )

      checkedTypes.forEach(type => {
        const checkedCosmes = {}
        checkedCosmes[type] = this.cosmes[type].filter(
          item => !this.unCheckedItems[type].includes(item.id)
        )
        suggestedCosmes[type] =
          checkedCosmes[type][
            Math.floor(Math.random() * checkedCosmes[type].length)
          ]
      })
      this.$store.dispatch('pages/main/loadHistory', suggestedCosmes)

      if (!this.isSuggested) {
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

<style scoped>
#suggest .suggest-btn {
  background-color: #e86e9b;
  width: 100%;
  border-radius: 20px;
  color: white;
  height: 40px;
  margin: 8px 0;
}
#suggest .cosme {
  margin: 16px 0;
}
</style>
