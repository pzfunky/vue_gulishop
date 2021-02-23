module.exports = {
    lintOnSave: false,  //禁用eslint
    devServer:{
        proxy:{
            "/api":{
                //转发的目标服务器地址
                target:"http://182.92.128.115"
            }
        },
        disableHostCheck: true, // 解决域名访问本地运行地址时出现Invalid Host header的问题 
    }
}