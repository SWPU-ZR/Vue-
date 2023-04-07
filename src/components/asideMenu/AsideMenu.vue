<template>
    <!-- element组件中的router属性，将index作为路由跳转路径 ,default-active设置默认选中的路由组件的index-->
    <el-menu :router="true"  :default-active="$route.path" background-color="#545c64" text-color="#fff"
        active-text-color="#ffd04b">

        <template v-for="item in menus">
            <!-- 根据是否有children来显示相应的一级菜单 -->
            <el-submenu v-if="item.children" :key="item._id" :index="item._id">
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span>{{ item.title }}</span>
                </template>
                <template v-for="child in item.children">
                    <el-menu-item v-if="child.title" :key="child._id" :index="'/home/' + child.path">
                        {{ child.title }}
                    </el-menu-item>
                </template>
            </el-submenu>

            <el-menu-item v-else :index="item.path">
                <i :class="item.icon"></i>
                <span slot="title">{{ item.title }}</span>
            </el-menu-item>

        </template>

    </el-menu>
</template>

<script>
import { mapState } from "vuex"
export default {
    computed: {
        ...mapState(["menus"])
    }
    ,
    methods: {

    }
}
</script>

<style lang="scss" scoped>
.el-menu {
    border-right: none;
}
</style>