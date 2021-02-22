//这个文件写得都是函数,我们叫接口请求函数
//以后,我们的每个接口都对应了一个函数,如果想要拿相关接口的数据,只需要调用相关的接口请求函数
import request from './ajax'
import mockAjax from './mockAjax'
//请求三级分类列表数据
///api/product/getBaseCategoryList

//axios的使用 函数用法axios({}) 对象用法axios.get()
//三种参数 params参数 query参数 请求体参数

export const reqCategoryList = () => {
    return request({
        url:'/product/getBaseCategoryList',
        method:'get'
    })
}
// reqCategoryList()

//请求获取模拟接口的数据banner和floor
export const reqBannerList = () => {
    return mockAjax({
        url:'/banner',
        method:'get'
    })
}
export const reqFloorList = () => {
    return mockAjax({
        url:'/floor',
        method:'get'
    })
}

//请求获取search页面的数据
///api/list POST
//  {
//     "category3Id": "61",
//     "categoryName": "手机",
//     "keyword": "小米",
//     "order": "1:desc",
//     "pageNo": 1,
//     "pageSize": 10,
//     "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
//     "trademark": "4:小米"
//   }
  
export const reqSearchInfo = (searchParams) => {
    return request({
        url:'/list',
        method:'post',
        data:searchParams   //searchParams是用户搜索的参数,用户在发请求时传递过来
    })
}
//searchParams是一个对象,可以是空对象,但是必须传

//请求获取详情数据

export const reqDetailInfo = (skuId)=>{
    return request({
        url:`/item/${skuId}`,
        method:'get'
    })
}

//请求添加购物车(修改购物车数量)
export const reqAddOrUpdateShopCart= (skuId,skuNum) => {
    return request({
        url:`/cart/addToCart/${skuId}/${skuNum}`,
        method:'post'
    })
}

//请求获取购物车数据
export const reqShopCartInfo= () => {
    return request({
        url:'/cart/cartList/',
        method:'get'
    })
}

//请求修改购物车选中状态
export const reqUpdateCartIscheck= (skuId,isChecked) => {
    return request({
        url:`/cart/checkCart/${skuId}/${isChecked}`,
        method:'get'
    })
}

//删除单个商品
export const reqDeleteShopCart = (skuId)=>{
    return request({
        url:`/cart/deleteCart/${skuId}`,
        method:'DELETE'
    })
}

//注册
//参数是请求体 包含code phone password
export const reqUserRegister = (userInfo) => {
    return request({
        url:'/user/passport/register',
        method:'post',
        data:userInfo
    })
}

//请求获取用户注册验证码
export const reqGetCode = (phone) => {
    return request({
        url:`/user/passport/sendCode/${phone}`,
        method:'get',
    })
}

//请求用户登录
export const reqUserLogin = (userInfo) => {
    return request({
        url:`/user/passport/login`,
        method:'post',
        data:userInfo
    })
}

//根据token请求获取用户的信息
///user/passport/auth/getUserInfo 参数是token已经在请求头中添加 请求方式get
export const reqGetUserInfo = () => {
    return request({
        url:`/user/passport/auth/getUserInfo`,
        method:'get',
    })
}

//退出登录
export const reqUserLogout = () => {
    return request({
        url:'/user/passport/logout',
        method:'get',
    })
}

//请求获取用户的收货地址信息
export const reqUserAddressList = () => {
    return request({
        url:'/user/userAddress/auth/findUserAddressList',
        method:'get',
    })
}

//请求获取订单交易页面信息
export const reqTradeInfo = () => {
    return request({
        url:'/order/auth/trade',
        method:'get',
    })
}

//提交订单
export const reqSubmitOrder = (tradeNo,tradeInfo) => {
    return request({
        url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method:'POST',
        data:tradeInfo
    })
}

//请求获取支付信息
export const reqPayInfo = (orderId) => {
    return request({
        url:`/payment/weixin/createNative/${orderId}`,
        method:'get',
    })
}

//查询订单的支付状态
export const reqPayStatus = (orderId) => {
    return request({
        url:`/payment/weixin/queryPayStatus/${orderId}`,
        method:'get',
    })
}

//请求我的订单列表
export const reqMyOrderInfo = (page,limit) => {
    return request({
        url:`/order/auth/${page}/${limit}`,
        method:'get',
    })
}
