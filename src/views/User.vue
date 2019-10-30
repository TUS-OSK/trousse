<template>
  <div>
    <div>
      <main>
        <h2>Hello World!</h2>
        <h3>ユーザー名</h3>
        <p>{{ userData.name }}</p>
        <p>{{ userData.token }}</p>
        <accordion-cosmes-list
          v-for="typeCosmesData in allCosmesAry"
          :key="typeCosmesData.type"
          :cosmesData="typeCosmesData"
          listType="user"
        ></accordion-cosmes-list>
      </main>
    </div>
  </div>
</template>

<script>
import AccordionCosmesList from '@/components/AccordionCosmesList.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'user',
  components: {
    AccordionCosmesList
  },
  data() {
    return {
      cosmeitem: false
    }
  },
  methods: {
    cosmeDisplay() {
      this.cosmeitem = !this.cosmeitem
    }
  },
  computed: {
    userData() {
      return this.$store.getters['userData/user']
    },
    ...mapGetters('userData', ['cosmeTypes', 'cosmes']),
    ...mapGetters('pages/main', ['isOpened']),
    allCosmesAry() {
      return this.cosmeTypes.map(type => {
        const isOpened = this.isOpened[type]
        const cosmeAry = this.cosmes[type]

        if (isOpened) {
          return {
            type,
            cosmeAry,
            accordionCosmesList: {
              isOpened
            }
          }
        } else {
          return {
            type,
            cosmeAry: cosmeAry.slice(0, 1),
            accordionCosmesList: {
              isOpened
            }
          }
        }
      })
    }
  },
  created() {
    this.$store.dispatch('userData/loadMain')
  }
}
</script>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
}
</style>
