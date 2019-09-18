<template>
  <ul class="list">
    <li v-for="item in category.list" :key="item.id" class="item">
      <div class="item-function">
        <label class="item-label">
          <input class="item-checkbox" type="checkbox" v-model="isChecked" :value="item.id">- cosme info -
        </label>
      </div>
      <ul>
        <li v-for="( info, key ) in item" :key="key" class="key"> {{ key }}: {{ info }} </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'type-list',
  props: {
    category: {
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
        return this.allCosmeIds[this.category.label].filter(id => !this.unCheckedItems[this.category.label].includes(id))
      },
      set(value) {
        const data = {
          type: this.category.label,
          cosmes: this.allCosmeIds[this.category.label].filter(id => !value.includes(id))
        }
        this.$store.dispatch('pages/main/loadCheckedItems', data)
      }
    }
  }
}
</script>
