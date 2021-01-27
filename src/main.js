import Vue from 'vue'
// import App from './App.vue'
import App from '@/App'
//@是一个别名,是一个小名,代表的就是src的路径
import router from '@/router/index'

//引入需要全局注册的组件
import TypeNav from '@/components/TypeNav'
Vue.component('TypeNav',TypeNav)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router  //我们所有的组件内部都可以使用this.$router 和 this.$route
}).$mount('#app')
