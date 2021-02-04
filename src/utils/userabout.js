//这个文件是和用户相关的一些工具函数
import { v4 as uuidv4 } from "uuid"

//生成用户的临时标识
export function getUserTempId(){
    //先从localStorage当中去获取用户的临时标识
    //localStorage获取不到数据返回null
    let userTempId = localStorage.getItem('USERTEMPID_KEY')
    //如果获取到了,直接返回使用
    if(!userTempId){
        //如果没有获取到,再通过uuid重新创建,并且存储到localStorage
        userTempId = uuidv4()
        localStorage.setItem('USERTEMPID_KEY',userTempId)
    }
    return userTempId
}