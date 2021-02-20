//这是trade模块的vuex模块
import { reqTradeInfo } from "@/api"

//vuex当中的4个核心概念
const state = {
    //存数据
    tradeInfo:{}
}
const actions = {
    //与组件当中用户对接,一般是异步发请求,提交mutations
    async getTradeInfo({commit}){
        const result = await reqTradeInfo()
        if(result.code === 200){
            commit('RECEIVE_TRADEINFO',result.data)
        }
    }
}
const mutations = {
    //直接修改数据
    RECEIVE_TRADEINFO(state,tradeInfo){
        state.tradeInfo = tradeInfo
    }
}
const getters = {
    //用来简化数据操作
    detailArrayList(state){
        return state.tradeInfo.detailArrayList || []
    }
}
export default {
    state,
    actions,
    mutations,
    getters,
}