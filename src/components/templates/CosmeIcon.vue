<template>
  <div id="icon" class="cosme-icon-template">
    <div class="cosme-icon d-flex align-items-center justify-content-center">
      <div class="info">
        <img :src="cosme.imageURL" width="60%">
        <span class="name">{{ cosme.name }}</span>
        <span class="brand">{{ cosme.brand }}</span>
        <div class="theme-group">
          <span class="theme d-inline-block" v-for="(theme, index) in cosme.theme" :key="`$theme-${cosme.id}-${index}`">{{ toJapanese(theme) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cosme-icon',
  props: {
    cosme: {
      type: Object,
      required: true
    }
  },
  methods: {
    // imageStyles(imageURL) {
    //   return {
    //     'background-image': `url(${imageURL})`,
    //     'background-size': '60%',
    //     'background-repeat': 'no-repeat'
    //   }
    // },
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
.cosme-icon-template#icon {
  width: 100%;
  height: 200px;
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
