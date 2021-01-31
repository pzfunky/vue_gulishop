import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'

//修改push方法
const originPush = VueRouter.prototype.push
VueRouter.prototype.push = function(location,onResolved,onRejected){
    if(onResolved === undefined && onRejected === undefined){
        return originPush.call(this,location).catch(()=>{})
    }else{
        return originPush.call(this,location,onResolved,onRejected)
    }
}
//修改replace方法
const originReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function(location,onResolved,onRejected){
    if(onResolved === undefined && onRejected === undefined){
        return originReplace.call(this,location).catch(()=>{})
    }else{
        return originReplace.call(this,location,onResolved,onRejected)
    }
}

//向外暴露一个路由器对象
export default new VueRouter({
    routes:[
        {
            path:'/home',
            component:Home
        },
        {
            path:'/search/:keyword?',   //?代表params参数可传可不传
            component:Search,
            name:'search',   //命名路由
            props:(route)=>{
                return {
                    keyword:route.params.keyword,
                }
            }
        },
        {
            path:'/login',
            component:Login
        },
        {
            path:'/register',
            component:Register
        },
        {
            path:'/',
            redirect:'/home'
        }
    ]
})