<template>
    <el-card class="register-card">
        <div slot="header" class="clearfix">
            <span>用户注册</span>
        </div>

        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
                <router-link to="/login">取消</router-link>
            </el-form-item>
        </el-form>

    </el-card>
</template>

<script>

export default {
    data() {
        var validateUsername = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入用户名'));
            } else {
                if (this.ruleForm.password !== '') {
                    this.$refs.ruleForm.validateField('password');
                }
                callback();
            }
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };

        return {
            ruleForm: {
                username: "",
                password: '',
                checkPass: '',
            },
            rules: {
                username: [
                    { validator: validateUsername, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        submitForm(ruleForm) {
            this.$refs[ruleForm].validate(async (valid) => {
                if (valid) {
                    const res = await this.$api.users.register(this.ruleForm)
                    if (res.code) {
                        this.$message({
                            message: '注册成功！',
                            type: 'success'
                        });
                    }else{
                        this.$message.error('注册失败!');
                    }
                } else {            
                    return false;
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.register-card {
    width: 500px;
    margin: 100px auto;
}
</style>