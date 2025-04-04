import Vue from 'vue'
import App from './App.vue'
import './utils/vant-ui'
import './mock/waterfall' // 引入 mock 数据

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
