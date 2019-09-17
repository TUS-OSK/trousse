<template>
  <ul class="list">
    <li v-for="item in category.list" :key="item.id" class="item">
      <div class="item-function">
        <span>- cosme list -</span>
        <input type="checkbox" v-model="isChecked" :value="item.id">
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
    ...mapGetters('pages/main', [
      'checkedItems'
    ]),
    isChecked: {
      get() {
        return this.checkedItems[this.category.label]
      },
      set(value) {
        const data = {
          type: this.category.label,
          cosmes: value
        }
        this.$store.dispatch('pages/main/loadCheckedItems', data)
      }
    }
  }
}
</script>
