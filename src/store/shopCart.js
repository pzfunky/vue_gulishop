//这是shopCart模块的vuex模块

import { reqAddOrUpdateShopCart, reqShopCartInfo } from "@/api"

//vuex当中的4个核心概念
const state = {
    //存数据
    shopCartInfo:[]
}
const actions = {
    //与组件当中用户对接,一般是异步发请求,提交mutations
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        const result = await reqAddOrUpdateShopCart(skuId,skuNum)
        //不能用这个写法,因为这样async函数返回的promise永远成功,不合常理,但是可行
        // if(result.code === 200){
        //     return 'ok'
        // }else{
        //     return 'failed'
        // }
        if(result.code === 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }

    },
    async getshopCartInfo({commit}){
        const result = await reqShopCartInfo()
        if(result.code === 200){
            commit('RECEIVE_SHOPCARTINFO',result.data) 
        }
        
    }
}
const mutations = {
    //直接修改数据
    RECEIVE_SHOPCARTINFO(state,shopCartInfo){
        state.shopCartInfo = shopCartInfo
    }


}
const getters = {
    //用来简化数据操作
    cartInfo(state){
        return state.shopCartInfo[0] || {}
    }
}
export default {
    state,
    actions,
    mutations,
    getters,
}