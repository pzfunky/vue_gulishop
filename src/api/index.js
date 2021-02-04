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