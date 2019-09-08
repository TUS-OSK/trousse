<template>
  <aside>
    <h2>現在は {{ PageName }}</h2>
    <nav>
      <router-link class="link" to="/user">ユーザー情報を見る</router-link>
      <router-link class="link" to="/edit/base">ベースのコスメを追加</router-link>
      <router-link class="link" to="/edit/cheek">チークのコスメを追加</router-link>
      <router-link class="link" to="/edit/lip">リップのコスメを追加</router-link>
    </nav>
  </aside>
</template>

<script>
export default {
  name: "sidebar",
  props: {
    PageName: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
aside {
  border-right: 2px dotted black;
  margin-right: 50px;
}

nav {
  width: 200px;
  display: flex;
  flex-direction: column;
}
</style>