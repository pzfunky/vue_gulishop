//引入并声明使用插件
import store from '@/store'
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
const router = new VueRouter({
    routes,  //配置路由
    //配置滚动行为
    scrollBehavior (to, from, savedPosition) {
        // ...
        return {x:0,y:0}
    }
})

//注册全局前置导航守卫,用来对token校验(根据token获取用户信息)
router.beforeEach(async(to,from,next) => {
    //to 跳转目的地的路由对象
    //from 从哪跳转的路由对象
    //next() 是一个函数 根据参数不同功能不同 如果直接调next,代表无条件放行
    //next('/'),代表强制跳转到指定路径
    //next(false)代表什么都不做,原地不动

    //第一步:守卫拦截住,先去获取用户的token和用户信息
    let token = store.state.user.token
    //刷新后,有token没有userInfo信息,userInfo此时是一个空对象,所以获取条件为userInfo.name
    let userInfo = store.state.user.userInfo.name
    // console.log(token);
    // console.log(userInfo);

    if(token){
        //如果token是存在的,代表用户登陆过
        if(to.path === '/login'){
            //用户已经登录了,没必要跳转到登录页
            next('/')
        }else{
            //如果用户已经登陆,但是跳转的不再是登录页,那么我们需要看用户信息是否获取
            //用过用户信息已经获取,
            if(userInfo){
                console.log('跳转成功',userInfo);
                next()
            }else{
                //用户已经登录,但是没有获取用户信息,在这里就需要请求用户信息
                try {
                    //代表获取用户信息成功,用户信息拿到就无条件放行
                    await store.dispatch('getUserInfo')   //根据用户token获取用户信息
                    let userInfo1 = store.state.user.userInfo
                    console.log('getUserInfo '+userInfo)
                    console.log('getUserInfo '+userInfo1)
                    console.log(userInfo1)
                    next()
                } catch (error) {
                    //获取用户信息失败,代表token可能过期,把用户的过期token清理掉,重新跳转到登录页面
                    alert('获取用户信息失败!请重新登录!'+error.message)
                    store.dispatch('clearToken')
                    //让用户重新登陆
                    next('/login')
                }
            }
        }
    }else{
        //用户根本没登录
        //目前我们什么都不做,直接放行,后期要添加功能
        //如果用户访问交易相关 支付相关 个人中心相关 那么跳转到登录页面

        let targetPath = to.path
        if(targetPath.indexOf('/trade') !== -1 || targetPath.indexOf('/pay') !== -1 || targetPath.startsWith('/center')){
            next('/login?redirect='+targetPath)     //想要回到之前想去的地方
            
        }else{
            next()
        }
    }
})

export default router