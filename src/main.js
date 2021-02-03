import Vue from 'vue'
// import App from './App.vue'
import App from '@/App'
//@是一个别名,是一个小名,代表的就是src的路径
import router from '@/router/index'
import store from '@/store'
import '@/mock/mockServer'  //引入mock 让数据生效
import 'swiper/css/swiper.css' //引入swiper的css文件

// import '@/api' 测试
// import {reqCategoryList} from '@/api'
// console.log(reqCategoryList());

//引入需要全局注册的组件
import TypeNav from '@/components/TypeNav'
Vue.component('TypeNav',TypeNav)
import Slideloop from '@/components/Slideloop'
Vue.component('Slideloop',Slideloop)
import Pagination from '@/components/Pagination'
Vue.component('Pagination',Pagination)

Vue.config.productionTip = false

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this   //安装总线,代表任意组件内部可以通过this.$bus访问到vm实例
  },
  render: h => h(App),
  router,  //我们所有的组件内部都可以使用this.$router 和 this.$route
  store
}).$mount('#app')
