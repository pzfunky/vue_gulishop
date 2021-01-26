import Vue from 'vue'
// import App from './App.vue'
import App from '@/App'
//@是一个别名,是一个小名,代表的就是src的路径

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
