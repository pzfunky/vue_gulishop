<template>
    <div>
        Search<br>
        params: {{this.$route.params.keyword}}-----------{{keyword}}<br>
        query: {{this.$route.query.keyword1}}------------{{keyword1}}

    </div>
</template>

<script>
    export default {
        name:'Search',
        props:['keyword','keyword1'],
    }
</script>

<style>

</style>