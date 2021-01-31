<template>
    <div class="swiper-container" id="mySwiper" ref="bannerSwiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in bannerList" :key="item.id">
                <img :src="item.imgUrl" />
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
    import Swiper from 'swiper'
    export default {
        name:'Slideloop',
        props:['bannerList'],
        watch:{
            bannerList:{
                immediate:true,
                handler(){
                    this.$nextTick(function(){
                       var mySwiper = new Swiper(this.$refs.bannerSwiper, {
                            // observeParents:true,
                            observer:true,
                            loop: true, // 循环模式选项
                            // 如果需要分页器
                            pagination: {
                                el: '.swiper-pagination',
                            },
                            // 如果需要前进后退按钮
                            navigation: {
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            },
                            autoplay:{
                                delay:1000,
                                disableOnInteraction:false, //解决滑动后不能轮播的问题
                            }
                       }) 
                    })
                }
            }
        },
    }
</script>

<style>

</style>