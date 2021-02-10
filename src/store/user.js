//这是user模块的vuex模块
import { reqUserRegister, reqGetCode, reqUserLogin, reqGetUserInfo, reqUserLogout} from '@/api'
import {getUserTempId} from '@/utils/userabout'

//vuex当中的4个核心概念
const state = {
    //存数据
    //getUserTempId这个函数专门用来生成用户的临时标识
    userTempId:getUserTempId(),
    code:'',
    token:localStorage.getItem('TOKEN_KEY'),    //第一次登录的时候,我们先初始化
    userInfo:{} //根据token获取用户信息
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
    },

    //用户登录,获取token
    async userLogin({commit},userInfo){
        const result = await reqUserLogin(userInfo)
        if(result.code === 200){
            commit('RECEIVE_TOKEN',result.data.token)
            //获取到token后,需要存储到localstorage中,因为token在一定时间后会过期,也不能随意更改
            localStorage.setItem('TOKEN_KEY',result.data.token)
        }else{
            return Promise.reject(new Error('failed'))
        }
    },

    //根据token请求获取用户信息
    async getUserInfo({commit}){
        const result = await reqGetUserInfo()
        if(result.code === 200){
            commit('RECEIVE_USERINFO',result.data)
            // console.log(result.data);
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },

    //清除用户的token信息
    async clearToken({commit}){
        commit('RESET_TOKEN')
        //当token过期,需要把过期的token清除,state和localStorage都要清除
        localStorage.removeItem('TOKEN_KEY')
    },

    //退出登录
    async userLogout({commit}){
        const result = await reqUserLogout()
        if(result.code === 200){
            //退出成功 ,清空数据state中的token和userInfo localStorage中的token
            commit('RESET_USER')
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
    },
    RECEIVE_TOKEN(state,token){
        state.token = token
    },
    RECEIVE_USERINFO(state,userInfo){
        // console.log(userInfo);
        state.userInfo = userInfo
        // console.log(state.userInfo);
    },
    //token过期
    RESET_TOKEN(state){
        state.token = ''
    },
    //清空用户信息及token
    RESET_USER(state){
        state.token = ''
        state.userInfo = {}
        localStorage.removeItem('TOKEN_KEY')
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