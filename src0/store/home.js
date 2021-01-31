import {reqCategoryList,reqBannerList,reqFloorList} from '@/api'
//这是home的vuex模块

//vuex当中的4个核心概念
const state = {
    //存数据
    categoryList:[],
    bannerList:[],
    floorList:[]
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
    },
    async getBannerList({commit}){
        const result = await reqBannerList()
        if(result.code === 200){
            commit('RECEIVE_BANNERLIST',result.data)
        }
    },
    async getFloorList({commit}){
        const result = await reqFloorList()
        if(result.code === 200){
            commit('RECEIVE_FLOORLIST',result.data)
        }
    },

}
const mutations = {
    //直接修改数据
    RECEIVE_CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    RECEIVE_BANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    RECEIVE_FLOORLIST(state,floorList){
        state.floorList = floorList
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