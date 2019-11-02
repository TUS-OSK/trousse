<template>
  <!-- AccordionCosmesListコンポーネントはcosmesDataを渡すと開閉できるコスメリストを表示してくれるコンポーネント -->
  <div
    id="accordion"
    class="accordion-cosmes-list-component"
    :class="{ isOpened : isOpened[cosmesData.type] }"
  >
    <div class="accordion-wrap" :class="{ isSelected : isSelected }" v-if="listType === 'main'">
      <div class="list-title d-flex align-items-center">
        <span class="check-btn">
          <input
            :id="`type${cosmesData.type}`"
            class="input-checkbox"
            type="checkbox"
            v-model="isChecked"
            :value="cosmesData.type"
          />
          <label
            :for="`type${cosmesData.type}`"
            class="input-label"
            @click="isSelected = !isSelected"
          >
            <span class="checkbox"></span>
            <span class="name">{{ cosmesData.type }}</span>
          </label>
        </span>
      </div>
      <div class="cosme-list-wrap">
        <cosme-list
          @mounted="getElementHeight"
          :cosmeType="cosmesData.type"
          :cosmeAry="cosmesData.cosmeAry"
          :listType="listType"
        ></cosme-list>
      </div>
    </div>

    <div class="accordion-wrap" :class="{ isSelected : isSelected }" v-if="listType === 'user'">
      <ul class="check-btn">
        <li class="name">
          <div>{{ cosmesData.type }}</div>
          <cosme-list
            @mounted="getElementHeight"
            :cosmeType="cosmesData.type"
            :cosmeAry="cosmesData.cosmeAry"
            :listType="listType"
          />
        </li>
      </ul>
    </div>

    <div
      class="btn-area d-flex justify-content-center"
      v-if="cosmesData.cosmeAry.length && this.cosmeListHeight > 124"
    >
      <button
        class="accordion-btn d-flex justify-content-center"
        @click="changeCosmesListState(cosmesData.type)"
      ></button>
    </div>
  </div>
</template>

<script>
import CosmeList from '@/components/modules/CosmeList.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'accordion-cosmes-list',
  components: {
    CosmeList
  },
  data() {
    return {
      cosmeListHeight: null,
      isSelected: true
    }
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
    ...mapGetters('userData', ['cosmeTypes', 'cosmes']),
    ...mapGetters('pages/main', [
      'unCheckedTypes',
      'unCheckedItems',
      'isOpened'
    ]),
    isChecked: {
      get() {
        return this.cosmeTypes.filter(
          type => !this.unCheckedTypes.includes(type)
        )
      },
      set(newCheckedTypes) {
        const newUnCheckedTypes = this.cosmeTypes.filter(
          type => !newCheckedTypes.includes(type)
        )
        this.$store.dispatch('pages/main/loadCheckedTypes', newUnCheckedTypes)
      }
    }
  },
  methods: {
    changeCosmesListState(type) {
      this.$store.dispatch('pages/main/loadCosmesListState', type)
    },
    getElementHeight(elementHeight) {
      this.cosmeListHeight = elementHeight
    }
  }
}
</script>

<style>
@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(4px);
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
  position: relative;
  margin: 16px 0px;
}

#accordion .accordion-wrap .cosme-list-wrap {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
}

#accordion .accordion-wrap .cosme-list-wrap::before {
  content: "";
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.3);
  transition: all 0.4s;
}
#accordion .accordion-wrap.isSelected .cosme-list-wrap::before {
  opacity: 0;
  height: 0;
}
#accordion .check-btn .name {
  font-size: 24px;
  font-weight: 600;
}
#accordion .check-btn .input-checkbox {
  display: none;
}
#accordion .check-btn .checkbox {
  display: inline-block;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  margin: 0 4px;
  border: 2px solid gray;
  transition: all 0.4s;
}
#accordion .check-btn .input-checkbox:checked + .input-label .checkbox {
  background-color: #f3aecb;
}

/* accordion-btn */
#accordion .btn-area {
  z-index: 2;
  position: absolute;
  left: 0;
  right: 0;
  bottom: -12px;
  animation: float 0.4s infinite;
}
#accordion .accordion-btn {
  background-color: #f3aecb;
  padding: 0;
  margin: auto;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  transition: all 0.8s ease;
}
#accordion.isOpened .accordion-btn {
  transform: rotate(540deg);
}
#accordion .accordion-btn::before {
  content: "";
  width: 12px;
  height: 12px;
  position: absolute;
  top: 8px;
  border: 4px solid #861212;
  border-left: none;
  border-top: none;
  transform: rotate(45deg);
}
</style>
