import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Trade from '@/pages/Trade'
import Center from '@/pages/Center'
import GroupOrder from '@/pages/Center/GroupOrder'
import MyOrder from '@/pages/Center/MyOrder'

export default [
    {
        path:'/home',
        component:Home
    },
    {
        path:'/search/:keyword?',   //?代表我的params参数可传可不传
        component:Search,
        name:'search',   //命名路由
        //这个props是我们在路由组件当中操作params参数和query参数的简化方法
        // props:true  //会默认的把传递过来的params参数,额外的映射为组件当中的属性
        // props:{username:'lalala'}    //传递一个对象,传递的是额外你需要的静态数据,不需要就不用
        props:(route)=>{
            return {
                keyword:route.params.keyword,
                // keyword1:route.query.keyword1,
            }
        }
    },
    {
        path:'/login',
        component:Login,
        meta:{
            isHidden:true
        }
    },
    {
        path:'/register',
        component:Register,
        meta:{
            isHidden:true
        }
    },
    {
        path:'/',
        redirect:'/home'
    },
    {
        path:'/Detail/:goodsId',
        component:Detail
    },
    {
        path:'/addCartSuccess',
        component:AddCartSuccess
    },
    {
        path:'/shopcart',
        component:ShopCart
    },
    {
        path:'/trade',
        component:Trade
    },
    {
        path:'/pay',
        component:Pay
    },
    {
        path:'/paysuccess',
        component:PaySuccess
    },
    {
        path:'/center',
        component:Center,
        children:[
            {
                path:'myorder',
                component:MyOrder
            },
            {
                path:'grouporder',
                component:GroupOrder
            },
            {
                path:'/',
                redirect:'myorder'
            },
        ]
    }
]