<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container">
            <div @mouseleave="moveOutDiv" @mouseenter="isShow = true">
                <h2 class="all">全部商品分类</h2>
                <transition name="sort">
                <div class="sort" v-show="isShow">
                    <div class="all-sort-list2" @click="toSearch">
                        <div class="item" 
                            :class="{item_on:currentIndex === index}" 
                            v-for="(c1,index) in categoryList" 
                            :key="c1.categoryId"
                            @mouseenter="moveInItem(index)"                        
                        >
                            <h3>
                                <!-- a标签换成router-link会卡,因为组件标签太多了,导致内存当中的组件对象很多,所以效率不高 -->
                                <a href="javascript:;" 
                                    :data-categoryname="c1.categoryName"
                                    :data-category1id="c1.categoryId"
                                >{{c1.categoryName}}</a>
                                <!-- <router-link 
                                    :to="{
                                        name:'serach',
                                        query:{
                                            category1Id:c1.categoryId,
                                            categoryName:c1.categoryName
                                        }
                                    }"
                                >{{c1.categoryName}}</router-link> -->

                                <!-- 把声明式导航改为编程式导航 -->
                                <!-- 改为编程式导航,click事件点击后需要调用函数,同样每个a标签都添加了事件,内存中就会定义很多个函数,内存占用同样比较大,效率虽然比声明式导航强,但是还是不够好 -->
                                <!-- <a 
                                    href="javascript:;"
                                    @click="$router.push({
                                        name:'serach',
                                        query:{
                                            category1Id:c1.categoryId,
                                            categoryName:c1.categoryName
                                        }
                                    })"
                                >{{c1.categoryName}}</a> -->
                            </h3>
                            <div class="item-list clearfix">
                                <div class="subitem">
                                    <dl class="fore" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                                        <dt>
                                            <a href="javascript:;"
                                                :data-categoryname="c2.categoryName"
                                                :data-category2id="c2.categoryId"
                                            >{{c2.categoryName}}</a>
                                            <!-- <router-link 
                                                :to="{
                                                    name:'serach',
                                                    query:{
                                                        category2Id:c2.categoryId,
                                                        categoryName:c2.categoryName
                                                    }
                                                }"
                                            >{{c2.categoryName}}</router-link> -->
                                            <!-- <a 
                                                href="javascript:;"
                                                @click="$router.push({
                                                    name:'serach',
                                                    query:{
                                                        category2Id:c2.categoryId,
                                                        categoryName:c2.categoryName
                                                    }
                                                })"
                                            >{{c2.categoryName}}</a> -->
                                        </dt>
                                        <dd>
                                            <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                                <a href="javascript:;"
                                                    :data-categoryname="c3.categoryName"
                                                    :data-category3id="c3.categoryId"
                                                >{{c3.categoryName}}</a>
                                                <!-- <router-link 
                                                    :to="{
                                                        name:'serach',
                                                        query:{
                                                            category3Id:c3.categoryId,
                                                            categoryName:c3.categoryName
                                                        }
                                                    }"
                                                >{{c3.categoryName}}</router-link> -->
                                                <!-- <a 
                                                    href="javascript:;"
                                                    @click="$router.push({
                                                        name:'serach',
                                                        query:{
                                                            category3Id:c3.categoryId,
                                                            categoryName:c3.categoryName
                                                        }
                                                    })"
                                                >{{c3.categoryName}}</a> -->
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>                    
                    </div>
                </div>
                </transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
            
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import throttle from 'lodash/throttle'
    export default {
        name:'TypeNav',
        data(){
            return {
                currentIndex:-1,
                isShow:true
            }
        },
        methods:{
            toSearch(e){
                event = e || window.event
                let targetNode = event.target
                // console.log(targetNode);
                let data = targetNode.dataset
                // console.log(data);

                let {category1id,category2id,category3id,categoryname} = data

                //判断是不是a标签,categoryname存在就代表点击的是a标签
                if(categoryname){
                    let location = {
                        name:'search'
                    }
                    // console.log(location);
                    let query = {
                        categoryName:categoryname
                    }
                    // console.log(query);

                    //确定是几级id,哪个id存在就是第几级id
                    if(category1id){
                        query.category1Id = category1id
                    }
                    if(category2id){
                        query.category2Id = category2id
                    }
                    if(category3id){
                        query.category3Id = category3id
                    }

                    //找到所有query参数以后,把query放入loction中
                    location.query = query
                    // console.log(location);
                    //location对象构造完毕

                    //跳转之前,要合并原来过来时候带的params参数
                    if(this.$route.params){
                        location.params = this.$route.params
                    }
                    this.$router.push(location)
                }

            },
            //
            moveOutDiv(){
                this.currentIndex = -1
                //移出外部咱们自己添加的div，得去判断是在home页面移出还是在search页面移出
                if(this.$route.path !== '/home'){
                    //证明这个组件是在search里面的，需要让sort隐藏
                    this.isShow = false
                }  
            },
            //没节流的时候
            // moveInItem(index){
            //     this.currentIndex = index
            //     console.log(index);
            // }

            //节流后,传递的函数不能用箭头函数,因为箭头函数没有自己的this指向
            moveInItem:throttle(
                function(index){
                    this.currentIndex = index
                    // console.log(index)
                },
                20,
                { 'trailing': false }
            ),
        },
        mounted(){
            //在mounted中发请求,只要home和search一切换,home和search内部都会重新创建typeNav组件,每一次都要重新发请求,请求重复但是数据一样,没必要发那么多次,可以去app中发请求
            // this.$store.dispatch('getCategoryList')
            // console.log(mapState({
            //     categoryList:state => state.home.categoryList
            // }));
            // console.log(this.$store);

            //判断当前路径
            if(this.$route.path !== '/home'){
                this.isShow = false
            }            
        },
        computed:{
            // categoryList(){
            //     return this.$store.state.home.categoryList
            // }

            ...mapState({
                categoryList:state => state.home.categoryList
            })
        }
    }
</script>

<style lang='less' scoped>
        .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                &.sort-enter{
                    height: 0;
                    opacity: 0;
                }
                &.sort-enter-to{
                    height: 461px;
                    opacity: 1;
                }
                &.sort-enter-active{
                    transition: all .3s;
                }

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 590px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        &.item_on {
                            background-color: grey;
                            .item-list {
                                display: block;
                            }
                        }
                    }
                }
            }
        }
    }
</style>