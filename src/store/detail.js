//这是detail模块的vuex模块
import { reqDetailInfo } from "@/api"

//vuex当中的4个核心概念
const state = {
    //存数据
    detailInfo:{}
}
const actions = {
    //与组件当中用户对接,一般是异步发请求,提交mutations
    async getDetailInfo({commit},skuId){
        const result = await reqDetailInfo(skuId)
        if(result.code === 200){
            commit('RECEIVE_DETAILINFO',result.data)
        }
    }
}
const mutations = {
    //直接修改数据
    RECEIVE_DETAILINFO(state,detailInfo){
        state.detailInfo = detailInfo
    }
}
const getters = {
    //用来简化数据操作
    categoryView(state){
        return state.detailInfo.categoryView || {}
    },
    skuInfo(state){
        return state.detailInfo.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.detailInfo.spuSaleAttrList || []
    },
}
export default {
    state,
    actions,
    mutations,
    getters,
}