<template>
    <!-- 头部 -->
    <header class="header">
        <!-- 头部的第一行 -->
        <div class="top">
            <div class="container">
                <div class="loginList">
                    <p>尚品汇欢迎您！</p>
                    <p v-if="$store.state.user.userInfo.name">
                        <span>欢迎您:</span>
                        <a href="javascript:;">{{$store.state.user.userInfo.name}}</a>
                        <a href="javascript:;" @click="logout">退出登录</a>                        
                    </p>
                    <p v-else>
                        <span>请</span>
                        <router-link to="/login">登录</router-link>
                        <!-- <a href="###">登录</a> -->
                        <router-link to="/register">免费注册</router-link>
                        <!-- <a href="###" class="register">免费注册</a> -->
                    </p>
                </div>
                <div class="typeList">
                    <!-- <a href="###">我的订单</a> -->
                    <router-link to="/center">我的订单</router-link>
                    <router-link to="/shopCart">我的购物车</router-link>
                    <!-- <a href="###">我的购物车</a> -->
                    <a href="###">我的尚品汇</a>
                    <a href="###">尚品汇会员</a>
                    <a href="###">企业采购</a>
                    <a href="###">关注尚品汇</a>
                    <a href="###">合作招商</a>
                    <a href="###">商家后台</a>
                </div>
            </div>
        </div>
        <!--头部第二行 搜索区域-->
        <div class="bottom">
            <h1 class="logoArea">
                <router-link to="/home" class="logo" title="尚品汇">
                    <img src="./images/logo.png" alt="">
                </router-link>
                <!-- <a class="logo" title="尚品汇" href="###" target="_blank">
                    <img src="./images/logo.png" alt="">
                </a> -->
            </h1>
            <div class="searchArea">
                <form action="###" class="searchForm">
                    <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword"/>
                    <button class="sui-btn btn-xlarge btn-danger" type="button" @click="toSearch()">搜索</button>
                </form>
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        name:'Header',
        data(){
            return {
                keyword:''
            }
        },
        mounted(){
            this.$bus.$on('clearKeyword',this.clearKeyword)
        },
        methods:{
            clearKeyword(){
                this.keyword = ''
            },
            toSearch(){    
                let location = {
                    name:'search',
                    params:{ keyword:this.keyword || undefined},
                    // query:{ keyword1:this.keyword.toUpperCase() }
                }   
                //跳转之前,要合并原来过来时候带的params参数
                if(this.$route.params){
                    location.query = this.$route.query
                }         
                //如果是home跳search,用push
                //如果是search跳search,replace
                if(this.$route.path !== '/home'){
                    this.$router.replace(location)
                }else{
                    this.$router.push(location)
                }
            },
            async logout(){
                try {
                    await this.$store.dispatch('userLogout')
                    alert('退出成功!')
                    this.$router.push('/home')
                } catch (error) {
                    alert('退出失败!')
                }
            }
            /**
             * 一,路由传参种类:params参数和query参数
             * params参数是属于路径的一部分,路由当中匹配的时候,是要照顾到这个参数的
             * query参数是在路径的后面,以?分割,?后面的a = b & c = d 就是query参数
             *      query参数不属于路径,不会影响匹配路由规则
             * 
             * 二,路由路径带参数的三种写法
             * 1 字符串写法
             *      this.$router.push('/search/' + this.keyword + '?keyword1=' + this.keyword.toUpperCase())
             * 2 模板字符串
             *      this.$router.push(`/search/${this.keyword}?keyword1=${this.keyword.toUpperCase()}`)
             * 3 对象写法 
             * 
             */
        }
    }
</script>

<style lang='less' scoped>
    .header {
        &>.top {
            background-color: #eaeaea;
            height: 30px;
            line-height: 30px;

            .container {
                width: 1200px;
                margin: 0 auto;
                overflow: hidden;

                .loginList {
                    float: left;

                    p {
                        float: left;
                        margin-right: 10px;

                        .register {
                            border-left: 1px solid #b3aeae;
                            padding: 0 5px;
                            margin-left: 5px;
                        }
                    }
                }

                .typeList {
                    float: right;

                    a {
                        padding: 0 10px;

                        &+a {
                            border-left: 1px solid #b3aeae;
                        }
                    }

                }

            }
        }

        &>.bottom {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .logoArea {
                float: left;

                .logo {
                    img {
                        width: 175px;
                        margin: 25px 45px;
                    }
                }
            }

            .searchArea {
                float: right;
                margin-top: 35px;

                .searchForm {
                    overflow: hidden;

                    input {
                        box-sizing: border-box;
                        width: 490px;
                        height: 32px;
                        padding: 0px 4px;
                        border: 2px solid #ea4a36;
                        float: left;

                        &:focus {
                            outline: none;
                        }
                    }

                    button {
                        height: 32px;
                        width: 68px;
                        background-color: #ea4a36;
                        border: none;
                        color: #fff;
                        float: left;
                        cursor: pointer;

                        &:focus {
                            outline: none;
                        }
                    }
                }
            }
        }
    }
</style>