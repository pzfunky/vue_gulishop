//这个文件是对axios进行二次封装
//额外的让axios发请求的时候,具有其他功能

//配置基础路径和超时限制

//添加进度条信息 nprogress

//返回的响应不再需要从data属性当中拿数据,而是响应就是我们要的数据

//统一处理请求错误,具体请求也可以选择处理或不处理

import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'

//以后只要是对axios二次封装,不会在axios身上直接去封装,而是创建一个新的axios实例进行封装
//axios.create()创建一个新的和axios具有相同功能的一个实例
const service = axios.create({
    baseURL:'/api',     //设置当前项目中所有接口路径的公共路径部分,基础路径
    timeout:20000   //当ajax请求超过设置的时间就会报错
})

//添加进度条信息功能 nprogress
//以后如果想对axios添加额外的功能或者是给请求头添加额外的信息
//必然用到axios的请求拦截器和相应拦截器

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么

    NProgress.start()   //开启进度条

    //请求头内部需要添加临时标识,后期每个请求都会带上这个临时标识
    let userTempId = store.state.user.userTempId
    
    if(userTempId){
      config.headers.userTempId = userTempId
    }
    
    //登录成功后请求头内部添加token后期每个请求都会带上
    let token = store.state.user.token
    if(token){
      config.headers.token = token
    }

    return config;
  }, function (error) {
    // 对请求错误做些什么
    //请求拦截器中一般不写失败的回调
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    //我们也可以添加额外的功能或者对响应报文进行处理

    NProgress.done()   //关闭进度条
    return response.data;
  }, function (error) {
    // 对响应错误做点什么

    NProgress.done()   //关闭进度条
    //可以统一处理错误
    alert('发送请求失败!'+ error.message || '未知错误')
    // return Promise.reject(error);
    //也可以不让后面处理这个错误,终端promise链
    return new Promise(()=>{})  //返回的是pending状态的promise,代表中断promise链,后期也就没办法处理了
  });

export default service    //把封装好的axios实例暴露出其.后面去用