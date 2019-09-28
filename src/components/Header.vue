<template>
  <div>
    <header :class="{'headroom--unpinned': scrolled}" class="headroom header">
      <div class="Trousse">
        <router-link class="link" to="/main">
          <p>Trousse</p>
        </router-link>
      </div>
    </header>
    <button class="btn" v-bind:class='{active:active01}' @click="changeSidebarState">
        <span></span>
        <span></span>
        <span></span>
      </button>
    <div class="brank"></div>
    <aside class="is-guided" v-bind:class='{active:active01}'>
      <nav>
        <router-link class="sublink" @click.native="resetGuideState" to="/user">ユーザー情報を見る</router-link>
        <router-link class="sublink" @click.native="resetGuideState" to="/edit/base">ベースのコスメを追加</router-link>
        <router-link class="sublink" @click.native="resetGuideState" to="/edit/cheek">チークのコスメを追加</router-link>
        <router-link class="sublink" @click.native="resetGuideState" to="/edit/lip">リップのコスメを追加</router-link>
      </nav>
    </aside>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    changeSidebarState() {
      // this.isGuided = !this.isGuided
      this.active01 = !this.active01
    },
    resetGuideState() {
      console.log(this.isGuided)
      this.isGuided = false
      this.active01 = !this.active01
    },
    destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
    },
    handleScroll() {
      if (this.lastPosition > window.scrollY) {
        this.scrolled = false
      }
      this.lastPosition = window.scrollY
    }
  },
  data() {
    return {
      isGuided: false,
      active01: false,
      scrolled: false,
      lastPosition: 0
    }
  },
  created() {
    window.addEventListener('scroll', this.handleScroll)
  }
}
</script>

<style scoped>
a{
  text-decoration: none;
}
.Trousse {
  margin-block-start: 4px;
  margin-block-end: 4px;
  display: inline-block;
  height: 48px;
}
p {
  color: red;
  margin: 0;
  width: 150px;
  font: 32px "sans-serif";
  font-weight: 700;
}
header {
  border-bottom: 2px dotted black;
  flex-direction: row;
  text-align: center;
  width: 100%;
  height: 54px;
  position: fixed;
  background-color: #fff;
  top: 0;
}
.headroom {
    will-change: transform;
    transition: transform 200ms linear;
}
.headroom--pinned {
    transform: translateY(0%);
}
.headroom--unpinned {
    transform: translateY(-100%);
}
.brank {
  top: 0;
  height: 48px;
}
nav {
  z-index: 1;
  display: flex;
  flex-direction: column;
  position: absolute;
  -webkit-transform : translateY(-50%);
  transform : translateY(-50%);
  font-size: 24px;
  font-family: "sans-serif";
	text-decoration: none;
  top: 125px;
}
.sublink {
  color: #fff;
  top: 125px;
}
.is-guided  {
  z-index: 1;
  visibility: visible;
  /* ここまで変更 */
  position: fixed;
  top: 0;
  right: -250px;
  bottom: 0;
  width: 250px;
  text-align: center;
  background-color: rgba(210, 189, 212);
  margin: auto auto;
  transition: all .4s;
}
.is-guided.active {
  right: 0px;
}
.btn {
  z-index: 2;
  position: fixed;
  display: inline-block;
  right: 16px;
  width: 40px;
  height: 32px;
  margin-block-start: 12px;
  margin-block-end: 12px;
  padding: 0px 0px 0px;
  top: 0;
  border: none;
  cursor: pointer;
}
.btn.active{
  background-color: rgba(210, 189, 212, 0.8);
}
.btn span {
  position: absolute;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: #000000;
  border-radius: 4px;
  transition: all .4s;
  box-sizing: border-box;
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
