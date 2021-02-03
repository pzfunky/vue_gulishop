import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'
import user from './user'
import search from './search'
import detail from './detail'
import shopCart from './shopCart'
Vue.use(Vuex)
//这是总的vuex模块

//vuex当中的4个核心概念
const state = {
    //存数据
}
const actions = {
    //与组件当中用户对接,一般是异步发请求,提交mutations
}
const mutations = {
    //直接修改数据
}
const getters = {
    //用来简化数据操作
}
export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters,    
    //modules代表模块化
    modules:{
        home,
        user,
        search,
        detail,
        shopCart
    }
})