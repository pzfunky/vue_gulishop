//这个文件写得都是函数,我们叫接口请求函数
//以后,我们的每个接口都对应了一个函数,如果想要拿相关接口的数据,只需要调用相关的接口请求函数
import request from './ajax'
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