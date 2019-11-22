<template>
  <div id="user" class="user-page container-fluid">
    <h2 class="sub-title">USER</h2>
    <main class="user-inner">
      アカウント名: {{userName}}
      <div
        v-for="cosmeType in cosmeTypes"
        :key="`user-cosme-${cosmeType}`"
        v-bind="accordionCosmesListProps(cosmeType)"
      >
        <cosme-display :cosmeIds="cosmeIds(cosmeType)">
          <template #default="cosmeDisplayProps">
            <cosme-icon v-bind="cosmeIconProps(cosmeDisplayProps.cosmeId, cosmeType)" />
          </template>
        </cosme-display>
      </div>
    </main>
  </div>
</template>

<script>
import CosmeDisplay from '@/components/templates/CosmeDisplay.vue'
import CosmeIcon from '@/components/templates/CosmeIcon.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'user',
  components: {
    CosmeDisplay,
    CosmeIcon
  },
  computed: {
    ...mapGetters('userData', [
      'cosmeTypes',
      'cosmes',
      'allCosmeIds',
      'userName'
    ]),
    ...mapGetters('pages/main', ['uncheckedItems', 'isOpened']),
    themes() {
      return this.$store.getters['userData/themes']
    },
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
    },
    uncheckedCosmeIds: {
      get() {
        return this.uncheckedItems
      },
      set(newData) {
        this.$store.dispatch('pages/main/loadCheckedItems', newData)
      }
    }
  },
  methods: {
    accordionCosmesListProps(cosmeType) {
      return {
        cosmeType: cosmeType
      }
    },
    cosmeIconProps(cosmeId, type) {
      return {
        cosme: this.cosmes[type].find(cosme => cosme.id === cosmeId)
      }
    },
    cosmeIds(type) {
      return this.cosmes[type].map(cosme => cosme.id)
    },
    narrowCheckedItems() {
      if (this.cosmeThemeCheckbox.length) {
        this.cosmeTypes.forEach(type => {
          const data = {}
          data.type = type
          data.cosmes = this.cosmes[type]
            .filter(cosme => {
              //チェックされてるtheme配列をcosmeが持つtheme配列でfilterして長さが小さくなったものはチェックしたい
              //つまりアンチェックリストに入れたくないのでfalseを返すようにする
              const dif = cosme.theme
                ? this.cosmeThemeCheckbox.filter(
                    checkedTheme => !cosme.theme.includes(checkedTheme)
                  )
                : null
              return dif.length >= this.cosmeThemeCheckbox.length
            })
            .map(cosme => cosme.id)
          this.$store.dispatch('pages/main/loadCheckedItems', data)
        })
        this.cosmeThemeCheckbox = []
      }
    }
  }
}
</script>

<style scoped>
.user-page#user {
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f8f3ed;
  min-height: calc(100vh - 68px);
}
.user-page {
  background-color: #f8f3ed;
}
.row {
  display: flex;
  flex-direction: row;
}
</style>
