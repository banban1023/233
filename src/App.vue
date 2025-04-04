<template>
  <div id="app">
    <WaterfallCard />
  </div>
</template>

<script>
import WaterfallCard from './components/WaterfallCard.vue'
export default {
  name: 'App',
  components: {
    WaterfallCard
  }
}
</script>

<style lang="less">
body {
  box-sizing: border-box;
  margin: 0;
}
#app {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-top: 10px;
}
</style>
