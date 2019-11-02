<template>
  <div>
    <div>
      <main class="user-page">
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
        return {
          type,
          cosmeAry: this.cosmes[type],
          accordionCosmesList: {
            isOpend: this.isOpened[type]
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
.user-page {
  background-color: #f8f3ed;
}
.row {
  display: flex;
  flex-direction: row;
}
</style>
