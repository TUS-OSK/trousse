<template>
  <div>
    <header>
      <button class="btn" v-bind:class='{active:active01}' @click="changeSidebarState">
        <!-- <img src="../assets/menu_img.png" width="48px" height="48px"/> -->
        <span ></span>
        <span></span>
        <span></span>
      </button>
      <router-link class="link" to="/main">
        <h1>Trousse</h1>
      </router-link>

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
  color: red;
  text-align: center;
  margin-block-start: 4px;
  margin-block-end: 4px;
}
header {
  border-bottom: 2px dotted black;
  flex-direction: row;
}
nav {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.closebutton {
  float: right;
}
.is-guided  {
  z-index: 1;
  visibility: visible;
  /* ここまで変更 */
  position: fixed;
  top:0;
  right: 0;
  bottom: 0;
  left: 0;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.8);
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
