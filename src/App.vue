<template>
    <div>
        <Header></Header>
        <router-view></router-view>
        <!-- 这样写是可以的,但是如果后期有很多的页面都不需要显示Footer,那么这里就会写很长 -->
        <!-- <Footer v-show="$route.path !== '/login' && $route.path !== '/register'"></Footer> -->
        <Footer v-show="!$route.meta.isHidden"></Footer>
    </div>
</template>

<script>
    import Header from '@/components/Header'
    import Footer from '@/components/Footer'

    export default {
        name:'App',
        components:{
            Header,
            Footer
        },
        mounted(){
            this.$store.dispatch('getCategoryList')
        }
    }
</script>

<style>

</style>