<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item,index) in title" :key="index" >{{ item }}</el-breadcrumb-item>        
    </el-breadcrumb>
</template>

<script>
export default {
computed:{
    title(){
        return this.$route.meta.title
    }
}
}
</script>

<style lang="scss" scoped>
.el-breadcrumb {
    padding-bottom: 20px;
    border-bottom: 1px solid #c0c4cc;
    margin-bottom: 20px;
}
</style>