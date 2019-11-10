<template>
  <div id="icon" class="cosme-icon-component">
    <button class="cosme-icon" @click="onClick()">
      <div class="info">
        <span class="name">{{ cosme.name }}</span>
        <span class="brand">{{ cosme.brand }}</span>
        <div class="theme-group">
          <span class="theme d-inline-block" v-for="(theme, index) in cosme.theme" :key="`$theme-${cosme.id}-${index}`">{{ toJapanese(theme) }}</span>
        </div>
      </div>
    </button>
  </div>
</template>

<script>
export default {
  name: 'cosme-icon',
  data() {
    return {
      acitve: true
    }
  },
  props: {
    iconType: {
      type: String,
      required: true,
      validator: value => ['main', 'edit'].includes(value)
    },
    cosme: {
      type: Object,
      required: true
    },
    onClick: {
      type: Function
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
.cosme-icon-component#icon {
  width: 100%;
  height: 100px;
}
#icon .cosme-icon {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background-color: white;
  border: 4px solid #b25a74;
  text-align: center;
  background-color: rgb(248, 241, 242);
  word-break: break-all;
  overflow: scroll;
  cursor: pointer;
}

#icon .cosme-icon .info {
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  justify-content: center;
}

#icon .cosme-icon .info .theme {
  background-color: rgba(221, 105, 149, 0.762);
  border-radius: 4px;
  margin: 2px;
  padding: 1px 3px;
  color: #fff3f3dd
}

.pink {
  border-color: pink;
}
.orange {
  border-color: orange;
}
.red {
  border-color: red;
}
.beige {
  border-color: rgb(83, 83, 30);
}
</style>
