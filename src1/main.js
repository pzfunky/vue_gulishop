import Vue from 'vue'
import App from '@/App'
import router from '@/router/index'
import store from '@/store/index'
import 'swiper/css/swiper.css'

//引入需要全局注册的组件
import TypeNav from '@/components/TypeNav'
Vue.component('TypeNav',TypeNav)

Vue.config.productionTip = false    //关闭生产模式提示

new Vue({
    el:'#app',
    router,
    store,
    render:h => h(App)
})