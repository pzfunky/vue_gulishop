module.exports = {
    lintOnSave: false,  //禁用eslint
    devServer:{
        proxy:{
            "/api":{
                //转发的目标服务器地址
                target:"http://182.92.128.115"
            }
        }
    }
}