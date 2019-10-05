<template>
<div class="cosme-list-component">
  <div v-if="listType==='main'" class="mn-cosme-list">
    <div class="mn-cm-li-icon" v-for="cosme in cosmesData.cosmeAry" :key="cosme.id">
      <input :id="`cosme${cosme.id}`" class="mn-cm-li-checkbox" type="checkbox" v-model="isChecked" :value="cosme.id">
      <label :for="`cosme${cosme.id}`" class="mn-cm-li-label">
        <cosme-icon :type="cosmesData.type" :cosme="cosme" :iconType="listType"></cosme-icon>
      </label>
    </div>
    <div class="fake-icon" v-for="i in fakeCosmes" :key="i"></div>
  </div>
  <ul  v-else-if="listType === 'user'">
    <li v-for="cosme in cosmesData.cosmeAry" :key="cosme.id" class="cosme-list">{{ cosme.name }}
    </li>
  </ul>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import CosmeIcon from '@/components/modules/CosmeIcon.vue'

export default {
  name: 'cosme-list',
  components: {
    CosmeIcon
  },
  props: {
    cosmesData: {
      type: Object,
      required: true
    },
    listType: {
      type: String,
      required: true,
      validator: value => ['main', 'user'].includes(value)
    }
  },
  computed: {
    ...mapGetters('userData', [
      'allCosmeIds'
    ]),
    ...mapGetters('pages/main', [
      'unCheckedItems',
      'unCheckedTypes'
    ]),
    fakeCosmes() {
      return [...new Array(10).keys()].map(num => `fakeCosme${num}`)
    },
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

        const unCheckedTypes = [...this.unCheckedTypes]
        if(unCheckedTypes.includes(listData.type)) {
          this.$store.dispatch('pages/main/loadCheckedTypes', unCheckedTypes.filter(() => !unCheckedTypes.includes(listData.type)))
        }
      }
    }
  }
}
</script>

<style scoped>
.fake-icon {
  width: 118px;
}
.mn-cosme-list {
  background-color: rgb(243, 234, 183);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
.mn-cm-li-checkbox {
  display: none;
}
</style>
