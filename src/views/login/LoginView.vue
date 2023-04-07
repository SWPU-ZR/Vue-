<template>
    <div>
        <el-card class="login-card">
            <div slot="header" class="clearfix">
                <span>用户登录</span>
            </div>

            <el-form ref="form" :model="form" label-width="40px">
                <el-form-item label="账号">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>

                <el-form-item label="密码">
                    <el-input type="password" v-model="form.password"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="login">登录</el-button>
                    <router-link to="/register">没有账号？去注册吧!</router-link>
                </el-form-item>

            </el-form>
        </el-card>


    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                username: "admin",
                password: 123
            }
        }
    },
    methods: {
        async login() {
            const res = await this.$api.users.login(this.form)
            if (res.code) {
                //将后端返回的token保存在本地存储中
                localStorage.user_token = res.token
                this.$message({
                    type: 'success',
                    message: '登录成功!'
                });
                this.$router.replace("/home")
            } else {
                this.$message.error("账号或密码错误，请重新登陆！")
            }

        }
    }
}
</script>

<style lang="scss" scoped>
.login-card {
    width: 500px;
    margin: 100px auto;
}
</style>