<template>
  <div id="theme" class="theme-checkbox-component">
    <input
      :id="`theme-checkbox-${theme}`"
      class="input-checkbox d-none"
      v-model="cosmeThemeCheckbox"
      :value="theme"
      type="checkbox"
    />
    <label class="check-btn" :for="`theme-checkbox-${theme}`">
      <span class="checkbox-wrap d-flex align-items-center justify-content-center">
        <span class="stick"></span>
        <span class="stick"></span>
        <span class="checkbox"></span>
        <span class="stick"></span>
        <span class="stick"></span>
      </span>
      <span class="checkvalue d-flex align-items-center">{{ toJapanese(theme) }}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'theme-checkbox',
  props: [
    'value',
    'theme'
  ],
  computed: {
    cosmeThemeCheckbox: {
      get() {
        return this.value
      },
      set(newArray) {
        this.$emit('input', newArray)
      }
    }
  },
  methods: {
    toJapanese(word) {
      switch (word) {
        case 'spring':
          return '春'
        case 'summer':
          return '夏'
        case 'autumn':
          return '秋'
        case 'winter':
          return '冬'
      }
      return word
    }
  }
}
</script>

<style scoped>
@keyframes shrink {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes stick {
  0% {
    height: 0px;
  }
  30% {
    height: 5px;
  }
  100% {
    height: 0px;
  }
}

#theme .check-btn {
  display: inline-block;
  width: auto;
}
#theme .check-btn {
  padding: 4px;
  display: flex;
  flex-direction: row;
}
#theme .check-btn .checkvalue > * {
  margin-right: 4px;
}
#theme .check-btn .checkbox-wrap {
  width: 36px;
  height: 36px;
}
#theme .check-btn .checkvalue {
  font-size: 14px;
}

#theme .check-btn .checkbox {
  content: "";
  border-radius: 4px;
  width: 20px;
  height: 20px;
  opacity: 0.6;
  border: 2px solid gray;
  /* #f56868; */
  transition: all 0.2s;
}

#theme .input-checkbox:checked + .check-btn .checkbox {
  animation: shrink 0.1s;
  opacity: 1;
  background-color: #f3aecb;
  /* #f56868e3; */
}
#theme .input-checkbox + .check-btn .stick {
  position: absolute;
  height: 0px;
  width: 2px;
  border-radius: 2px;
  background-color: #f56868;
  transition: all 0.4s;
}
#theme .input-checkbox:checked + .check-btn .stick {
  animation: stick 0.4s;
}
#theme .input-checkbox + .check-btn .stick:nth-child(1) {
  transition: all 0.4s;
  transform: translate(-12px, -8px) rotate(-65deg);
}
#theme .input-checkbox:checked + .check-btn .stick:nth-child(1) {
  transform: translate(-18px, -12px) rotate(-65deg);
}
#theme .input-checkbox + .check-btn .stick:nth-child(2) {
  transform: translate(-8px, -12px) rotate(-25deg);
}
#theme .input-checkbox:checked + .check-btn .stick:nth-child(2) {
  transform: translate(-12px, -18px) rotate(-25deg);
}
#theme .input-checkbox + .check-btn .stick:nth-child(4) {
  transition: all 0.4s;
  transform: translate(8px, 12px) rotate(-25deg);
}
#theme .input-checkbox:checked + .check-btn .stick:nth-child(4) {
  transform: translate(12px, 18px) rotate(-25deg);
}
#theme .input-checkbox + .check-btn .stick:nth-child(5) {
  transform: translate(12px, 8px) rotate(-65deg);
}
#theme .input-checkbox:checked + .check-btn .stick:nth-child(5) {
  transform: translate(18px, 12px) rotate(-65deg);
}
</style>
