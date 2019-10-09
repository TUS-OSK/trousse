<template>
  <div class="load-page" :class="{ action : isLoading }">
    <div class="ball">
      <div class="load-bar">
        <div class="load-bar2">
        </div>
      </div>
    </div>
    <div class="spreadBall" :class="{ end : isloaded }">
    </div>
    <div class="page-title">
      <strong>{{ pageName }}</strong>
    </div>
  </div>
</template>

<script>
export default {
  name: 'load-page',
  props: {
    pageName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isLoading: null,
      isLoaded: null
    }
  },
  created() {
    setTimeout(() => {
      this.isLoading = true
    }, 0)
    setTimeout(() => {
      this.isLoaded = true
    }, 1000)
  }
}
</script>

<style scoped>
@keyframes rotate1 {
  0% {
    transform: rotate(20deg)
  }
  50% {
    transform: rotate(200deg)
  }
  100% {
    transform: rotate(380deg)
  }
}

@keyframes rotate2 {
  20% {
    transform: rotate(30deg)
  }
  60% {
    transform: rotate(210deg)
  }
  100% {
    transform: rotate(390deg)
  }
}

.page-title {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  font-size: 30px;
}

.load-page {
  z-index: 900;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: white;
  transition: all 2s
}

.ball {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 0;
  width: 0;
  border-radius: 50%;
  background-color: rgb(201, 47, 119);
  transition: all .4s
}

.load-page.action > .ball {
  height: 95vh;
  width: 95vh;
}

.load-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(20deg);
  animation: rotate1 2s ease infinite;
  position: fixed;
  border-radius: 50%;
  height: 0;
  width: 0;
  border: 0px solid white;
  border-left-color: transparent;
  border-right-color: transparent;
  transition: all .4s
}

.load-page.action > .ball .load-bar {
  border: 1vh solid white;
  border-left-color: transparent;
  border-right-color: transparent;
  height: 85vh;
  width: 85vh;
}

.load-bar2 {
  transform: rotate(30deg);
  animation: rotate2 2s ease infinite;
  position: fixed;
  border-radius: 50%;
  height: 0;
  width: 0;
  border: 0px solid rgb(255, 227, 235);
  border-left-color: transparent;
  border-right-color: transparent;
  transition: all .4s
}
.load-page.action > .ball .load-bar2 {
  border: 3vh solid white;
  border-left-color: transparent;
  border-right-color: transparent;
  height: 70vh;
  width: 70vh;
}

</style>
