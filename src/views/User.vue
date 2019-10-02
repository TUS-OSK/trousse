<template>
  <div>
    <Header/>
    <div>
      <main>
        <h2>Hello World!</h2>
        <h3>ユーザー名</h3>
        <p>{{ name }} </p>
         <accordion-cosmes-list v-for="typeCosmesData in allCosmesAry" :key="typeCosmesData.type" :cosmesData="typeCosmesData" formType="user"></accordion-cosmes-list>
      </main>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import AccordionCosmesList from '@/components/AccordionCosmesList.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'user',
  components: {
    Header,
    AccordionCosmesList
  },
  data(){
    return{
      cosmeitem: false
    }
  },
  methods: {
    cosmeDisplay(){
      this.cosmeitem = !this.cosmeitem
    }
  },
  computed: {
    name() {
      return this.$store.getters['userData/user'].name
    },
    ...mapGetters('userData', [
      'cosmeTypes',
      'cosmes'
    ]),
    ...mapGetters('pages/main', [
      'isOpened'
    ]),
    allCosmesAry() {
      return this.cosmeTypes.map(type => {
        const isOpened = this.isOpened[type]
        const cosmeAry = this.cosmes[type]

        if(isOpened) {
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
