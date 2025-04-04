<template>
  <div id="app">
      <WaterfallCard />
  </div>
</template>

<script>
import { Toast } from 'vant'
import WaterfallCard from './components/WaterfallCard.vue'
export default {
  name: 'App',
  components: {
    WaterfallCard
  },
  data () {
    return {
      count: 0,
      isLoading: false
    }
  },
  methods: {
    onRefresh () {
      setTimeout(() => {
        Toast('刷新成功')
        this.isLoading = false
        this.count++
      }, 1000)
    }
  }
}
</script>

<style lang="less">
body {
  box-sizing: border-box;
  margin: 0;
  height: 100vh;
  padding-top: 10px;
  background-color: #f5f5f5;
  #app {
  }
}
</style>
