<template>
    <el-container class="home-container">
        <el-aside width="200px">
            <AsideMenu></AsideMenu>
        </el-aside>
        <el-container>
            <el-header>
                <el-button type="primary" size="small" round @click="logout">退出</el-button>
            </el-header>
            <el-main>
                <!-- 用于缓存组件 -->
                <keep-alive>
                    <router-view v-if="isKeepAlive"></router-view>
                </keep-alive>

                <!-- 用于不缓存组件 -->
                <router-view  v-if="!isKeepAlive"></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import AsideMenu from '@/components/asideMenu/AsideMenu.vue';

export default {
    methods: {
        logout() {
            //防止能回退到上一个页面
            this.$router.replace("/login")
        }
    },
    computed:{
        isKeepAlive(){
            return this.$route.meta.keepAlive
        }
    },
    components: {
        AsideMenu
    }
}
</script>

<style lang="scss" scoped>
.home-container {
    min-height: 100vh;
}

.el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: right;
}

.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
}
</style>