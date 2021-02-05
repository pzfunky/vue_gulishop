//这是user模块的vuex模块
import { reqUserRegister, reqGetCode} from '@/api'
import {getUserTempId} from '@/utils/userabout'

//vuex当中的4个核心概念
const state = {
    //存数据
    //getUserTempId这个函数专门用来生成用户的临时标识
    userTempId:getUserTempId(),
    code:''
}
const actions = {
    //与组件当中用户对接,一般是异步发请求,提交mutations
    async userRegister({commit},userInfo){
        //reqUserRegister的返回结果为promise,所以需要await来直接拿到promise的执行结果
        const result = await reqUserRegister(userInfo)
        const result1 = reqUserRegister(userInfo)
        //这个是promise的执行结果
        console.log(result);
        //这个是promise
        console.log(result1);
        if(result.code === 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },

    //注册用户获取验证码
    async getCode({commit},phone){
        const result = await reqGetCode(phone)
        if(result.code === 200){
            commit('RECEIVE_CODE',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    }
}
const mutations = {
    //直接修改数据
    RECEIVE_CODE(state,code){
        state.code = code
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