import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN' // 引入中文文件
Vue.use(VeeValidate)

//错误信息本地化
VeeValidate.Validator.localize('zh_CN',{
    message:{
        ...zh_CN.messages,
        is:(field) => `${field}必须与密码相同`   //修改内置规则的message
    },

    attributes:{    //给校验的field属性映射中文名称
        phone:'手机号',
        code:'验证码',
        password:'登录密码',
        email:'邮箱'
    }
})