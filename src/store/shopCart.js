//这是shopCart模块的vuex模块

import { reqAddOrUpdateShopCart, reqShopCartInfo, reqUpdateCartIscheck, reqDeleteShopCart} from "@/api"

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
        
    },
    //修改购物车单个选中
    async updateCartIscheck({commit},{skuId,isChecked}){
        const result = await reqUpdateCartIscheck(skuId,isChecked)
        if(result.code === 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },

    //使用Promise.all 采用单个修改的接口去修改多个,但是真正不是这样坐的
    //真正就应该有一个修改多个的接口
    updateCartIscheckAll({commit,getters,dispatch},isChecked){
        let promises = []
        getters.cartInfo.cartInfoList.forEach(item => {
            if(item.isChecked === isChecked) return  //如果发现其中的每个购物车数据已经和要改变的状态一样,就不用请求改变了
            //本质还是通过调用上面的函数updateCartIscheck修改每一个来达到修改全部的效果,
            let promise = dispatch('updateCartIscheck',{skuId:item.skuId,isChecked})
            promises.push(promise)
        });
        return Promise.all(promises)
    },

    //删除单个
    async deleteShopCart({commit},skuId){
        const result = await reqDeleteShopCart(skuId)
        if(result.code === 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },

    //删除多个
    deleteShopCartAll({commit,getters,dispatch}){
        let promises = []
        getters.cartInfo.cartInfoList.forEach(item => {
            if(!item.isChecked) return 
            let promise = dispatch('deleteShopCart',item.skuId)
            promises.push(promise)
        });
        return Promise.all(promises)
    }
}
const mutations = {
    //直接修改数据
    RECEIVE_SHOPCARTINFO(state,shopCartInfo){
        state.shopCartInfo = shopCartInfo
    },



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