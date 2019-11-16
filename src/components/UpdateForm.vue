<template>
  <div id="ud-form" class="update-form-component container-fluid">
    <div class="form-wrap container-fluid">
      <section class="input-form">
        <label class="title">名前</label>
        <input class="input-text" v-model="info.name" type="text" name="name" :placeholder="`xxx-item`"/>
      </section>
      <section class="input-form">
        <label class="title">ブランド</label>
        <input class="input-text" v-model="info.brand" type="text" name="name" placeholder="xxx-brand"/>
      </section>
      <section class="input-form">
        <label class="title">色味</label>
        <input class="input-text" v-model="info.color" type="text" name="name" placeholder="beige"/>
      </section>
      <section class="input-form">
        <label class="title">テーマ</label>
        <div class="checkbox-group">
          <div
            class="check-btn-wrap d-inline-block"
            v-for="theme in themes"
            :key="theme"
          >
            <theme-checkbox v-model="info.theme" :theme="theme" />
          </div>
        </div>
      </section>
    </div>
    <div class="container-fluid">
      <div class="d-block btn-group row" v-if="focusingCosme === undefined">
        <button class="update-btn register-btn col-12" @click="onSubmit('register', info)">コスメを登録</button>
      </div>
      <div class="d-block btn-group row" v-else>
        <button class="update-btn delete-btn col-6">
          <div class="delete-text" @click="deleteStatus = true">コスメを削除</div>
          <div class="delete-text warning" :class="{ _show : deleteStatus }">
            <div class="btn-wrap">
              <span class="btn-text return" :class="{ _show : deleteStatus }" @click="deleteStatus = false">戻る</span>
              <span class="btn-text" :class="{ _show : deleteStatus }" @click="onSubmit('delete', info)">削除</span>
            </div>
          </div>
        </button>
        <button class="update-btn change-btn col-6" @click="onSubmit('change', info)">コスメを更新</button>
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
    onSubmit: {
      type: Function,
      required: true
    }
  },
  data() {
    if (this.focusingCosme === undefined) {
      return {
        info: {
          brand: '',
          name: '',
          color: '',
          theme: []
        }
      }
    } else {
      const cosme = {...this.focusingCosme}
      return {
        info: {
          id: cosme.id,
          brand: cosme.brand,
          name: cosme.name,
          color: cosme.color,
          theme: cosme.theme
        },
        deleteStatus: false
      }
    }
  },
  computed: {
    ...mapGetters('userData', ['themes'])
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
.update-form-component#ud-form {
  height: 100%;
  width: 100%;
  background-color: white;
  padding: 36px 16px 16px;
}

#ud-form .input-form {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

#ud-form .input-form .title {
  color: rgb(55, 26, 26);
  font-size: 20px;
  margin-bottom: 8px;
  font-weight: 800;
}
#ud-form .input-form .input-text {
  color: black;
  font-size: 16px;
  font-weight: 500;
  width: 100%;
  padding: 8px 12px;
  border: 2px solid rgb(235, 197, 164);
  border-radius: 4px;
  background-color: rgb(255, 234, 210);
  transition: border 0.1s linear;
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
  padding: 12px;
  background-color: #f3aecb;
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
  transition: all .2s ease;
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
  padding: 0  4px;
  border-radius: 4px;
  background-color: white;
  color: rgb(80, 15, 15);
}

#ud-form .btn-group .delete-btn .warning .btn-text {
  color: rgb(57, 10, 10);
  opacity: 0;
  transition: opacity .2s cubic-bezier(0.01, 0.68, 0.25, 1);
}

#ud-form .btn-group .delete-btn .warning .btn-text._show {
  opacity: 1;
}

/* check-btn */

#ud-form .input-text:focus {
  border: 2px solid rgb(182, 55, 86);
}
</style>