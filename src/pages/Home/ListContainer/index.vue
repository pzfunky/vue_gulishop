<template>
        <!--列表-->
    <div class="list-container">
        <div class="sortList clearfix">
            <div class="center">
                <!--banner轮播-->
                <!-- <div class="swiper-container" id="mySwiper" ref="bannerSwiper">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="item in bannerList" :key="item.id">
                            <img :src="item.imgUrl" />
                        </div>
                    </div> -->
                    <!-- 如果需要分页器 -->
                    <!-- <div class="swiper-pagination"></div> -->

                    <!-- 如果需要导航按钮 -->
                    <!-- <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>
                </div> -->
                <Slideloop :bannerList="bannerList"></Slideloop>
            </div>
            <div class="right">
                <div class="news">
                    <h4>
                        <em class="fl">尚品汇快报</em>
                        <span class="fr tip">更多 ></span>
                    </h4>
                    <div class="clearix"></div>
                    <ul class="news-list unstyled">
                        <li>
                            <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                        </li>
                        <li>
                            <span class="bold">[公告]</span>备战开学季 全民半价购数码
                        </li>
                        <li>
                            <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                        </li>
                        <li>
                            <span class="bold">[公告]</span>备战开学季 全民半价购数码
                        </li>
                        <li>
                            <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                        </li>
                    </ul>
                </div>
                <ul class="lifeservices">
                    <li class=" life-item ">
                        <i class="list-item"></i>
                        <span class="service-intro">话费</span>
                    </li>
                    <li class=" life-item ">
                        <i class="list-item"></i>
                        <span class="service-intro">机票</span>
                    </li>
                    <li class=" life-item ">
                        <i class="list-item"></i>
                        <span class="service-intro">电影票</span>
                    </li>
                    <li class=" life-item ">
                        <i class="list-item"></i>
                        <span class="service-intro">游戏</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">彩票</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">加油站</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">酒店</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">火车票</span>
                    </li>
                    <li class=" life-item ">
                        <i class="list-item"></i>
                        <span class="service-intro">众筹</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">理财</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">礼品卡</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">白条</span>
                    </li>
                </ul>
                <div class="ads">
                    <img src="./images/ad1.png" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import Swiper from 'swiper'
    // import 'swiper/css/swiper.css'  //一般在main中引入
    export default {
        name:'ListContainer',
        //挂载完成以后去实例化swiper
        //在这是不行的,因为实例化的时候,页面显示还不一定成功
        //按道理来说挂载完成,页面的dom结构就算形成完成,在此去实例化应该是可以的
        //但是这个页面当中结构的swiper-slide,是根据请求回来的数据,动态创建生成的
        //所以,我们必须得保证请求数据回来之后,再去实例化
        //setTimeout是解决方法之一,但是不完美
        mounted(){
            this.$store.dispatch('getBannerList')
        },
        // watch:{
        //     bannerList:{
        //         handler(){
        //             this.$nextTick(function(){
        //                var mySwiper = new Swiper(this.$refs.bannerSwiper, {
        //                     // observeParents:true,
        //                     observer:true,
        //                     loop: true, // 循环模式选项
        //                     // 如果需要分页器
        //                     pagination: {
        //                         el: '.swiper-pagination',
        //                     },
        //                     // 如果需要前进后退按钮
        //                     navigation: {
        //                         nextEl: '.swiper-button-next',
        //                         prevEl: '.swiper-button-prev',
        //                     },
        //                     autoplay:{
        //                         delay:1000,
        //                         disableOnInteraction:false, //解决滑动后不能轮播的问题
        //                     }
        //                }) 
        //             })
        //         }
        //     }
        // },
        computed:{
            ...mapState({
                bannerList:state => state.home.bannerList
            })
        }
    }
    
        
</script>

<style lang='less' scoped>
    .list-container {
        width: 1200px;
        margin: 0 auto;

        .sortList {
            height: 464px;
            padding-left: 210px;

            .center {
                box-sizing: border-box;
                width: 740px;
                height: 100%;
                padding: 5px;
                float: left;
            }

            .right {
                float: left;
                width: 250px;

                .news {
                    border: 1px solid #e4e4e4;
                    margin-top: 5px;

                    h4 {
                        border-bottom: 1px solid #e4e4e4;
                        padding: 5px 10px;
                        margin: 5px 5px 0;
                        line-height: 22px;
                        overflow: hidden;
                        font-size: 14px;

                        .fl {
                            float: left;
                        }

                        .fr {
                            float: right;
                            font-size: 12px;
                            font-weight: 400;
                        }
                    }

                    .news-list {
                        padding: 5px 15px;
                        line-height: 26px;

                        .bold {
                            font-weight: 700;
                        }
                    }
                }

                .lifeservices {
                    border-right: 1px solid #e4e4e4;
                    overflow: hidden;
                    display: flex;
                    flex-wrap: wrap;

                    .life-item {
                        border-left: 1px solid #e4e4e4;
                        border-bottom: 1px solid #e4e4e4;
                        margin-right: -1px;
                        height: 64px;
                        text-align: center;
                        position: relative;
                        cursor: pointer;
                        width: 25%;

                        .list-item {
                            background-image: url(../../../assets/images/icons.png);
                            width: 61px;
                            height: 40px;
                            display: block;
                        }

                        .service-intro {
                            line-height: 22px;
                            width: 60px;
                            display: block;
                        }

                        &:nth-child(1) {
                            .list-item {
                                background-position: 0px -5px;
                            }
                        }

                        &:nth-child(2) {
                            .list-item {
                                background-position: -62px -5px;
                            }
                        }

                        &:nth-child(3) {
                            .list-item {
                                background-position: -126px -5px;
                            }
                        }

                        &:nth-child(4) {
                            .list-item {
                                background-position: -190px -5px;
                            }
                        }

                        &:nth-child(5) {
                            .list-item {
                                background-position: 0px -76px;
                            }
                        }

                        &:nth-child(6) {
                            .list-item {
                                background-position: -62px -76px;
                            }
                        }

                        &:nth-child(7) {
                            .list-item {
                                background-position: -126px -76px;
                            }
                        }

                        &:nth-child(8) {
                            .list-item {
                                background-position: -190px -76px;
                            }
                        }

                        &:nth-child(9) {
                            .list-item {
                                background-position: 0px -146px;
                            }
                        }

                        &:nth-child(10) {
                            .list-item {
                                background-position: -62px -146px;
                            }
                        }

                        &:nth-child(11) {
                            .list-item {
                                background-position: -126px -146px;
                            }
                        }

                        &:nth-child(12) {
                            .list-item {
                                background-position: -190px -146px;
                            }
                        }
                    }
                }

                .ads {
                    margin-top: 5px;

                    img {
                        opacity: 0.8;
                        transition: all 400ms;

                        &:hover {
                            opacity: 1;
                        }
                    }
                }
            }
        }
    }
</style>