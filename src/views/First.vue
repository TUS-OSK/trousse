<template>
  <div class="first-page" :class="{ main : $route.name === 'main' }">
    <load-page pageName="first" :isLoading="!isLoaded"/>
    <div class="contents" v-if="pageState">
      <my-header />
      <router-view />
    </div>
  </div>
</template>

<script>
import MyHeader from '@/components/MyHeader.vue'
import LoadPage from '@/components/LoadPage.vue'

export default {
  name: 'first',
  components: {
    MyHeader,
    LoadPage
  },
  data() {
    return {
      pageState: false,
      isLoaded: false
    }
  },
  created() {
    setTimeout(() => {
      this.pageState = true
    }, 300)
    setTimeout(() => {
      this.isLoaded = true
    }, 600)
  }
}
</script>

<style scoped>
 .first-page  {
  height: 100%;
  width: 100%;
  background-color: #b97085;
}

.first-page .header-page {
  position: sticky;
  top: 0;
}

.first-page.main {
  padding-top: 160px;
}

</style>
