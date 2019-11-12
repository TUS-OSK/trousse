<template>
  <div id="ud-form" class="update-form-component container-fluid">
    <div class="form-wrap container-fluid">
      <section class="input-form">
        <label class="title">NAME</label>
        <input class="input-text" v-model="info.name" type="text" name="name" :placeholder="`xxx-item`"/>
      </section>
      <section class="input-form">
        <label class="title">BRAND</label>
        <input class="input-text" v-model="info.brand" type="text" name="name" placeholder="xxx-brand"/>
      </section>
      <section class="input-form">
        <label class="title">COLOR</label>
        <input class="input-text" v-model="info.color" type="text" name="name" placeholder="beige"/>
      </section>
      <section class="input-form">
        <label class="title">THEME</label>
        <div class="checkbox-group">
          <div
            class="check-btn-wrap d-inline-block"
            v-for="(theme, index) in themes"
            :key="theme"
          >
            <input
              :id="`input-${index}`"
              class="input-checkbox d-none"
              v-model="info.themes"
              :value="theme"
              type="checkbox"
            />
            <label class="check-btn" :for="`input-${index}`">
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
        </div>
      </section>
    </div>
    <div class="container-fluid">
      <div class="d-block btn-group row" v-if="focusingCosme === null">
        <button class="update-btn register-btn col-12" @click="onSubmit('register', info)">コスメを登録</button>
      </div>
      <div class="d-block btn-group row" v-else>
        <button class="update-btn delete-btn col-6" @click="onSubmit('delete', info)">コスメを削除</button>
        <button class="update-btn change-btn col-6" @click="onSubmit('change', info)">コスメを更新</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'update-form',
  props: {
    formType: {
      type: String,
      required: true,
      validator: value => ['edit', 'register'].includes(value)
    },
    focusingCosme: {
      type: Object,
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
          themes: []
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
          themes: cosme.themes
        }
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
  padding: 32px 16px;
}

#ud-form .input-form {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

#ud-form .input-form .title {
  color: rgb(55, 26, 26);
  font-size: 20px;
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
  background-color: rgb(255, 213, 213);
}

#ud-form .btn-group .delete-btn {
  background-color: #f56868;
  color: white;
}

/* check-btn */
#ud-form .check-btn {
  display: inline-block;
  width: auto;
}
#ud-form .check-btn {
  padding: 4px;
  display: flex;
  flex-direction: row;
}
#ud-form .check-btn .checkvalue > * {
  margin-right: 4px;
}
#ud-form .check-btn .checkbox-wrap {
  width: 40px;
  height: 40px;
}
#ud-form .check-btn .checkvalue {
  font-size: 16px;
}
#ud-form .check-btn .checkbox {
  content: "";
  border-radius: 4px;
  width: 20px;
  height: 20px;
  opacity: 0.6;
  border: 2px solid gray;
  /* #f56868; */
  transition: all 0.2s;
}
#ud-form .input-checkbox:checked + .check-btn .checkbox {
  animation: shrink 0.1s;
  opacity: 1;
  background-color: #f3aecb;
  /* #f56868e3; */
}
#ud-form .input-checkbox + .check-btn .stick {
  position: absolute;
  height: 0px;
  width: 2px;
  border-radius: 2px;
  background-color: #f56868;
  transition: all 0.4s;
}
#ud-form .input-checkbox:checked + .check-btn .stick {
  animation: stick 0.4s;
}
#ud-form .input-checkbox + .check-btn .stick:nth-child(1) {
  transition: all 0.4s;
  transform: translate(-12px, -8px) rotate(-65deg);
}
#ud-form .input-checkbox:checked + .check-btn .stick:nth-child(1) {
  transform: translate(-18px, -12px) rotate(-65deg);
}
#ud-form .input-checkbox + .check-btn .stick:nth-child(2) {
  transform: translate(-8px, -12px) rotate(-25deg);
}
#ud-form .input-checkbox:checked + .check-btn .stick:nth-child(2) {
  transform: translate(-12px, -18px) rotate(-25deg);
}
#ud-form .input-checkbox + .check-btn .stick:nth-child(4) {
  transition: all 0.4s;
  transform: translate(8px, 12px) rotate(-25deg);
}
#ud-form .input-checkbox:checked + .check-btn .stick:nth-child(4) {
  transform: translate(12px, 18px) rotate(-25deg);
}
#ud-form .input-checkbox + .check-btn .stick:nth-child(5) {
  transform: translate(12px, 8px) rotate(-65deg);
}
#ud-form .input-checkbox:checked + .check-btn .stick:nth-child(5) {
  transform: translate(18px, 12px) rotate(-65deg);
}

#ud-form .input-text:focus {
  border: 2px solid rgb(182, 55, 86);
}
</style>
