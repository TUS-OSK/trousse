<template>
  <div id="ud-form" class="update-form-component container-fluid">
    <div class="form-wrap container-fluid">
      <section class="input-form">
        <label class="title">画像</label>
        <div class="text-center input-area">
          <div class="file-uploader">
            <input id="cosme-file" class="input-file" type="file" @change="preview"/>
            <label for="cosme-file" class="upload-btn d-flex flex-column">
              <span class="title">画像を選択</span>
              <span v-if="fileValue">{{fileValue}}</span>
            </label>
          </div>
          <img class="m-3 cosm-img" :src="this.info.imageURL" width="260p">
        </div>
      </section>
      <section class="input-form">
        <label class="title d-flex align-items-center">
          <span>名前</span>
          <span class="badge badge-danger mx-1">必須</span>
          <span v-if="info.name.length > 15" class="warning">文字数は15文字以内です</span>
        </label>
        <input
          class="input-text"
          v-model="info.name"
          type="text"
          name="name"
          :placeholder="`xxx-item`"
        />
      </section>
      <section class="input-form">
        <label class="title">
          <span>ブランド</span>
          <span v-if="info.brand.length > 15" class="warning">文字数は15文字以内です</span>
        </label>
        <input
          class="input-text"
          v-model="info.brand"
          type="text"
          name="name"
          placeholder="xxx-brand"
        />
      </section>
      <section class="input-form">
        <label class="title">
          <span>色味</span>
          <span v-if="info.color.length > 10" class="warning">文字数は10文字以内です</span>
        </label>
        <input
          class="input-text"
          v-model="info.color"
          type="text"
          name="name"
          placeholder="beige"
        />
      </section>
      <section class="input-form">
        <label class="title">テーマ</label>
        <div class="checkbox-group input-area">
          <div
            class="check-btn-wrap d-inline-block"
            v-for="theme in themes"
            :key="theme"
          >
            <theme-checkbox v-model="info.theme" :theme="theme" />
          </div>
        </div>
      </section>
      <transition name="fade">
        <div v-if="warningStatus" class="warning text-center">
          !正しく入力して下さい!
        </div>
      </transition>
    </div>
    <div class="container-fluid">
      <div class="d-block btn-group row" v-if="focusingCosme === undefined">
        <button
          v-if="info.name"
          class="update-btn register-btn col-12"
          @click="onSubmit('register', info, imageFile)"
        >
          コスメを登録
        </button>
        <span
          v-else
          class="update-btn register-btn col-12 d-inline-block text-center -error"
          >コスメを登録
        </span>
      </div>
      <div class="d-block btn-group row" v-else>
        <button class="update-btn delete-btn col-6">
          <div class="delete-text" @click="deleteStatus = true">
            コスメを削除
          </div>
          <div class="delete-text warning" :class="{ _show: deleteStatus }">
            <div class="btn-wrap">
              <span
                class="btn-text return"
                :class="{ _show: deleteStatus }"
                @click="deleteStatus = false"
                >戻る</span
              >
              <span
                class="btn-text"
                :class="{ _show: deleteStatus }"
                @click="onSubmit('delete', info)"
                >削除</span
              >
            </div>
          </div>
        </button>
        <button
          v-if="warningStatus"
          class="update-btn change-btn col-6 d-inline-block text-center -error"
        >
          コスメを更新
        </button>
        <button
          v-else
          class="update-btn change-btn col-6"
          @click="onSubmit('change', info, imageFile)"
        >
          コスメを更新
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ThemeCheckbox from '@/components/modules/ThemeCheckbox.vue'

export default {
  name: 'update-form',
  components: {
    ThemeCheckbox
  },
  props: {
    focusingCosme: {
      required: true
    },
    focusingType: {
      type: String,
      required: true
    },
    onSubmit: {
      type: Function,
      required: true
    }
  },
  data() {
    const data = {
      info: {
        brand: '',
        name: '',
        color: '',
        theme: [],
        imageURL: `/images/cosmeImages/${this.focusingType}.png`
      },
      fileValue: null,
      imageFile: null,
      deleteStatus: false
    }
    if(this.focusingCosme !== undefined) {
      const cosme = { ...this.focusingCosme }
      data.info = cosme
      data.info.imageURL = cosme.imageURL || `/images/cosmeImages/${this.focusingType}.png`
    }

    return data
  },
  computed: {
    ...mapGetters('userData', ['themes']),
    warningStatus() {
      const info = this.info
      const status = !info.name || info.name.length > 15 || info.color.length > 10 || info.brand.length > 15
      return status
    }
  },
  methods: {
    preview(e) {
      const image = e.target.files[0]
      this.fileValue = e.target.value.replace('C:\\fakepath\\', '')
      if(!image) {
        this.imageFile = null
        this.info.imageURL = `/images/cosmeImages/${this.focusingType}.png`
      } else {
        this.imageFile = image
        const reader = new FileReader()
        reader.onload = e => {
          this.info.imageURL = e.target.result
        }
        reader.readAsDataURL(image)
      }
    },
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
.fade-enter-active, .fade-leave-active {
  transition: opacity .1s linear;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
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
.update-form-component#ud-form {
  height: 100%;
  width: 100%;
  background-color: white;
  padding: 36px 16px 16px;
}
#ud-form .form-wrap .warning {
  font-size: 14px;
  margin: 8px 0;
  color: rgb(194, 46, 46);
}

#ud-form .input-form {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}
#ud-form .input-form .warning {
  font-size: 12px;
  color: rgb(227, 129, 155);
  margin: 0 4px;
}
#ud-form .input-form .title {
  color: rgb(55, 26, 26);
  font-size: 16px;
  margin-bottom: 8px;
  font-weight: 900;
}
#ud-form .input-form .input-text {
  color: black;
  text-shadow: none;
  font-size: 16px;
  font-weight: 100;
  width: 100%;
  border: 2px solid rgb(235, 197, 164);
  border-radius: 4px;
  background-color: rgb(255, 234, 210);
  padding: 6px 8px;
}

#ud-form .input-form .input-area {
  border: 2px solid rgb(235, 197, 164);
  border-radius: 4px;
  background-color: rgb(255, 234, 210);
  transition: border 0.1s linear;
}
#ud-form .input-form .input-area .input-file {
  display: none;
}
#ud-form .input-form .input-area .file-uploader {
  cursor: pointer;
  background-color: rgb(235, 197, 164);
  color: #fff6ee;
}
#ud-form .input-form .input-area .file-uploader .upload-btn{
  padding: 4px;
}
#ud-form .input-form .input-area .file-uploader .title{
  padding: 8px 12px;
  margin-bottom: 2px;
  border-radius: 4px;
  background-color: rgb(255, 247, 247);
  text-overflow: ellipsis;
}
#ud-form .input-form .input-area:focus {
  border: 2px solid rgb(182, 55, 86);
}

#ud-form .input-form .input-text::placeholder {
  color: rgba(210, 138, 138, 0.762);
}
/* update-btn */
#ud-form .btn-group {
  border-radius: 4px;
  overflow: hidden;
}
#ud-form .btn-group .update-btn {
  display: inline-block;
  padding: 12px;
  background-color: #f3aecb;
}

#ud-form .btn-group .update-btn.-error {
  background-color: #a3aeaf;
  cursor: initial;
}

#ud-form .btn-group .delete-btn {
  position: relative;
  background-color: #f56868;
  color: white;
}

#ud-form .btn-group .delete-btn .warning {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-around;
  width: 0;
  overflow: hidden;
  transition: all 0.2s ease;
}

#ud-form .btn-group .delete-btn .warning .btn-wrap {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  background-color: #eddc7a;
}
#ud-form .btn-group .delete-btn .warning .btn-wrap .btn-text {
  white-space: nowrap;
}

#ud-form .btn-group .delete-btn .warning._show {
  width: 100%;
}

#ud-form .btn-group .delete-btn .warning .btn-text.return {
  padding: 0 4px;
  border-radius: 4px;
  background-color: white;
  color: rgb(80, 15, 15);
}

#ud-form .btn-group .delete-btn .warning .btn-text {
  color: rgb(57, 10, 10);
  opacity: 0;
  transition: opacity 0.2s cubic-bezier(0.01, 0.68, 0.25, 1);
}

#ud-form .btn-group .delete-btn .warning .btn-text._show {
  opacity: 1;
}

</style>
