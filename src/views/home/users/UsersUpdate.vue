<template>
    <div>
        <BrandCrumb></BrandCrumb>

        <el-row :gutter="20">        
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="用户姓名">
                        <el-input v-model="form.username"></el-input>
                    </el-form-item>
                    <el-form-item label="用户密码">
                        <el-input v-model="form.password"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="updateUser">确认修改</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>            
        </el-row>


    </div>
</template>

<script>
import BrandCrumb from '@/components/brandcrumb/BrandCrumb.vue';
export default {
    components: {
        BrandCrumb
    },
    created() {        
        this.getUserById()
    },
    data() {
        return {
            form:{}          
        }
    },
    methods: {
        //通过动态路由用户id获取该用户的数据
        async getUserById() {
            const res = await this.$api.users.getById(this.$route.params)
            //有值才进行赋值操作
            if (res.code && res.data) {                
                this.form = res.data
            } else {
                this.$message({
                    message: '当前数据已经不存在,请重新选择!',
                    type: 'warning'
                });
            }
        },
        async updateUser() {                       
            const res = await this.$api.users.updateUser(this.form)                        
            if (res.code) {
                this.$message({
                    message: '修改成功!',
                    type: 'success'
                });
                this.$router.push("/home/usersList")
            }
        }
    }
}
</script>

<style scoped>
.el-input{
    width: 200px;
}
</style>