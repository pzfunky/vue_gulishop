//引入并声明使用插件
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import routes from './routes'


//修改push方法
const originPush = VueRouter.prototype.push
VueRouter.prototype.push = function(location,onResolved,onRejected){
    if(onRejected === undefined && onRejected === undefined){
        return originPush.call(this,location).catch(()=>{})
    }else{
        return originPush.call(this,location,onResolved,onRejected)
    }
}

//修改replace方法
const originReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function(location,onResolved,onRejected){
    if(onRejected === undefined && onRejected === undefined){
        return originReplace.call(this,location).catch(()=>{})
    }else{
        return originReplace.call(this,location,onResolved,onRejected)
    }
}

//需要向外暴露一个路由器对象
export default new VueRouter({
    routes,  //配置路由
    //配置滚动行为
    scrollBehavior (to, from, savedPosition) {
        // ...
        return {x:0,y:0}
    }
})