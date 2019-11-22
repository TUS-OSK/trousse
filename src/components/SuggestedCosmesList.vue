<template>
  <div id="suggest" class="suggested-cosmes-list">
    <div class="suggest-inner">
      <div v-if="isSuggested">
        <div class="cosme" v-for="(item, type) in currentHistory" :key="type">
          <div v-if="item">
            <h3>{{ type }}</h3>
            <div class="container-fluid">
              <div class="row">
                <div class="img-wrap col-xl-2 col-md-3 col-4 d-flex justify-content-center align-items-center">
                  <img class="cosme-img" :src="item.imageURL">
                </div>
                <div class="d-flex flex-column col-xl-10 col-md-9 col-8 py-2">
                  <span v-if="item.name">名前: {{ item.name }}</span>
                  <span v-if="item.brand">ブランド: {{ item.brand }}</span>
                </div>
              </div>
            </div>
          </div>
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
      'uncheckedTypes',
      'uncheckedItems',
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
        type => !this.uncheckedTypes.includes(type)
      )

      checkedTypes.forEach(type => {
        const checkedCosmes = {}
        checkedCosmes[type] = this.cosmes[type].filter(
          item => !this.uncheckedItems[type].includes(item.id)
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
#suggest h3 {
  font-size: 20px;
}
#suggest .cosme .img-wrap {
  height: 100px;
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
  padding: 8px;
}
#suggest .cosme .cosme-img {
  max-width: 100%;
  max-height: 100%;
}
#suggest .suggest-btn {
  background-color: #f3aecb;
  width: 100%;
  border-radius: 20px;
  color: gray;
  height: 40px;
  margin: 8px 0;
}
#suggest .cosme {
  margin: 16px 0;
}
</style>
