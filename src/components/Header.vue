<template>
  <div>
    <header>
      <button class="btn" v-bind:class='{active:active01}' @click="changeSidebarState">
        <span ></span>
        <span></span>
        <span></span>
      </button>
      <h1>
      <router-link class="link" to="/main">
        <p>Trousse</p>
      </router-link>
      </h1>
    </header>
    <aside v-if="isGuided" :class="{ 'is-guided': isGuided }">
      <nav>
        <router-link class="link" @click.native="resetGuideState" to="/user">ユーザー情報を見る</router-link>
        <router-link class="link" @click.native="resetGuideState" to="/edit/base">ベースのコスメを追加</router-link>
        <router-link class="link" @click.native="resetGuideState" to="/edit/cheek">チークのコスメを追加</router-link>
        <router-link class="link" @click.native="resetGuideState" to="/edit/lip">リップのコスメを追加</router-link>
      </nav>
    </aside>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    changeSidebarState() {
      this.isGuided = !this.isGuided
      this.active01 = !this.active01
    },
    resetGuideState() {
      console.log(this.isGuided)
      this.isGuided = false
      this.active01 = !this.active01
    }
  },
  data() {
    return {
      isGuided: false,
      active01: false
    }
  }
}
</script>

<style scoped>
h1 {
  margin-block-start: 4px;
  margin-block-end: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}
p {
  color: red;
  margin: 0;
  width: 150px;
  text-align: center;
}
header {
  border-bottom: 2px dotted black;
  flex-direction: row;
  text-align: center;
}
nav {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  -webkit-transform : translateY(-50%);
  transform : translateY(-50%);
}
.closebutton {
  float: right;
}
.is-guided  {
  z-index: 1;
  visibility: visible;
  /* ここまで変更 */
  position: fixed;
  top:0px;
  right: 0;
  bottom: 0;
  left: 0;
  text-align: center;
  background-color: rgba(210, 189, 212, 0.8);
  margin: auto auto;
}
.btn span {
  display: inline-block;
  transition: all .4s;
  box-sizing: border-box;
}
.btn {
  z-index: 2;
  position: fixed;
  right: 16px;
  width: 40px;
  height: 32px;
  margin-block-start: 8px;
  margin-block-end: 8px;
  padding: 0px 0px 0px;
  border-width: 0px;
  /* cursor: pointer; */
}
.btn span {
  position: absolute;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: #000000;
  border-radius: 4px;
}
.btn span:nth-of-type(1) {
  top: 0;
}
.btn span:nth-of-type(2) {
  top: 14px;
}
.btn span:nth-of-type(3) {
  bottom: 0;
}
.btn.active span:nth-of-type(1) {
  -webkit-transform: translateY(14px) rotate(-45deg);
  transform: translateY(14px) rotate(-45deg);
}
.btn.active span:nth-of-type(2) {
  opacity: 0;
}
.btn.active span:nth-of-type(3) {
  -webkit-transform: translateY(-14px) rotate(45deg);
  transform: translateY(-14px) rotate(45deg);
}
</style>
