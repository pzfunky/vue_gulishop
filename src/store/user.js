//这是user模块的vuex模块
import {getUserTempId} from '@/utils/userabout'
//vuex当中的4个核心概念
const state = {
    //存数据
    //getUserTempId这个函数专门用来生成用户的临时标识
    userTempId:getUserTempId()
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
export default {
    state,
    actions,
    mutations,
    getters,
}