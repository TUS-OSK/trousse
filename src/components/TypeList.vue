<template>
  <ul class="list">
    {{ checkedItem }}
    <li v-for="item in category.list" :key="item.id" class="item">
      <div class="item-function">
        <span>- cosme list -</span>
        <input type="checkbox" v-model="checkedItems" :value="item.id">
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
    checkedItems: {
      get() {
        return this.allCosmeIds[this.category.label]
      }
    }
  }
}
</script>
