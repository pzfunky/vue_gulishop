import {reqCategoryList} from '@/api'
//这是home的vuex模块

//vuex当中的4个核心概念
const state = {
    //存数据
    categoryList:[]
}
const actions = {
    //与组件当中用户对接,一般是异步发请求,提交mutations
    async getCategoryList({commit}){
        const result = await reqCategoryList()
        // console.log(result);
        // console.log(commit);
        if(result.code === 200){
            commit('RECEIVE_CATEGORYLIST',result.data)
        }
    }
}
const mutations = {
    //直接修改数据
    RECEIVE_CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    }
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