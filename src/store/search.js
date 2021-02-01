import {reqSearchInfo} from '@/api/index'
//这是search模块的vuex模块

//vuex当中的4个核心概念
const state = {
    //存数据
    searchInfo:{}
}
const actions = {
    //与组件当中用户对接,一般是异步发请求,提交mutations
    async getSearchInfo({commit},searchParams){
        //searchParams这个参数,是用户dispatch时传递的参数
        //searchParams这个参数在actions的函数中只能放在{commit}后面
        const result = await reqSearchInfo(searchParams)
        if(result.code === 200){
            commit('RECEIVE_SEARCHINFO',result.data)
            // result.data.attrsList.forEach(item => {
            //     console.log(item.attrName);                
            // });
        }
    }
}
const mutations = {
    //直接修改数据
    RECEIVE_SEARCHINFO(state,searchInfo){
        state.searchInfo = searchInfo
    }
}
const getters = {
    //用来简化数据操作
    //为什么要getters,是因为我们获取的数据内部结构复杂,使用起来不方便
    //所以我们拿到复杂数据后,会先把这个数据先做计算,计算出来我们要直接用的数据,简化数据操作
    attrsList(state){
        return state.searchInfo.attrsList || [] //为了后期不出现假报错,所以要给一个空数组
    },
    goodsList(state){
        return state.searchInfo.goodsList || [] 
    },
    trademarkList(state){
        return state.searchInfo.trademarkList || [] 
    }
}
export default {
    state,
    actions,
    mutations,
    getters,
}