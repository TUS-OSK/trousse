<template>
  <div
    id="accordion"
    class="accordion-cosmes-list-component"
  >
    <div class="accordion-wrap" :class="{ 'close-list' : !isOpened[this.cosmeType] }">
      <div class="list-title">
        <span class="check-btn d-inline-block">
          <input
            :id="`type${cosmeType}`"
            class="input-checkbox"
            type="checkbox"
            v-model="isChecked"
            :value="cosmeType"
          />
          <label
            :for="`type${cosmeType}`"
            class="input-label d-flex align-items-center"
            @click="changeCosmesListState('check')"
          >
            <span class="checkbox d-inline-block"></span>
            <span class="name d-inline-block">{{ cosmeType }}</span>
          </label>
        </span>
      </div>

      <div class="cosme-display-wrap">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'accordion-cosmes-list',
  data() {
    return {
      isSelected: true
    }
  },
  props: {
    cosmeType: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters('userData', ['cosmeTypes', 'cosmes']),
    ...mapGetters('pages/main', [
      'uncheckedTypes',
      'isOpened'
    ]),
    isChecked: {
      get() {
        return this.cosmeTypes.filter(
          type => !this.uncheckedTypes.includes(type)
        )
      },
      set(newCheckedTypes) {
        const newuncheckedTypes = this.cosmeTypes.filter(
          type => !newCheckedTypes.includes(type)
        )
        this.$store.dispatch('pages/main/loadCheckedTypes', newuncheckedTypes)
      }
    }
  },
  methods: {
    changeCosmesListState(mode) {
      if(mode === 'check') {
        this.isSelected = !this.isSelected
      }
      this.$store.dispatch('pages/main/loadCosmesListState', this.cosmeType)
    }
  }
}
</script>

<style scoped>
@keyframes float {
  0% {
    transform: translateY(0px);
  }
  25% {
    transform: translateY(2px);
  }
  50% {
    transform: translateY(0px);
  }
  75% {
    transform: translateY(-2px)
  }
  100% {
    transform: translateY(0);
  }
}
@keyframes surround {
  0% {
    height: 0;
    width: 0;
  }
  50% {
    height: 0;
    width: 100%;
  }
  100% {
    height: 100%;
    width: 100%;
  }
}
.accordion-cosmes-list-component#accordion {
  margin: 16px 0px;
}

#accordion .accordion-wrap .list-title {
  padding: 4px;
  margin: 12px 0;
  border-radius: 8px;
  background-color: #f3aecb;
}

#accordion .accordion-wrap .cosme-display-wrap {
  border-radius: 8px;
  overflow: hidden;
  opacity: 1;
  transition: all .4s
}
#accordion .accordion-wrap.close-list .cosme-display-wrap {
  opacity: 0;
  height: 0;
}
/* accordion-btn */
#accordion .input-checkbox {
  display: none;
}

#accordion .name {
  font-size: 24px;
  font-weight: 800;
}
#accordion .input-label .checkbox {
  margin: 0 8px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #ffebf4;
  transition: all .2s ease;
}
#accordion .input-checkbox:checked + .input-label .checkbox {
  background-color: #b55980
}
</style>
