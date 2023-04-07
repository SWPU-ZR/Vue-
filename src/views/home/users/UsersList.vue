<template>
    <div>
        <BrandCrumb></BrandCrumb>

        <el-input @change="searchUser" placeholder="请输入用户姓名" suffix-icon="el-icon-search" v-model="search">
        </el-input>

        <el-table :data="tableData" border style="width: 100%">
            <el-table-column header-align="center" prop="_id" label="编号">
            </el-table-column>
            <el-table-column header-align="center" prop="username" label="姓名">
            </el-table-column>
            <el-table-column header-align="center" prop="password" label="密码">
            </el-table-column>

            <el-table-column fixed="right" label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.row._id)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row._id)">删除</el-button>
                </template>
            </el-table-column>


        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="pageData.currentPage" :page-sizes="[7, 9]" :page-size="pageData.pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
    </div>
</template>

<script>
import BrandCrumb from '@/components/brandcrumb/BrandCrumb.vue';

export default {

    data() {
        return {
            tableData: [],
            pageData: {
                currentPage: 1,
                pageSize: 7
            },
            total: 0,
            search: ""
        }
    },
    //生命周期调用getUsers函数
    created() {
        this.getUsers()
    },
    //侦听pageData的数据变化，执行请求操作
    watch: {
        pageData: {
            deep: true,
            handler() {           
                this.getUsers()
            }
        }
    },
    methods: {
        //获取用户数据(分页)
        async getUsers() {
            //通过axios发送请求(将分页和搜索用户的参数汇合成一个对象,将判断交给了后端来处理)
            const res = await this.$api.users.get({ ...this.pageData, value: this.search });
            if (res.code) {
                this.tableData = res.data.rows;
                this.total = res.data.total;
            }            
        },
        //搜索用户(姓名)
        searchUser() {
            this.getUsers()
        },
        //删除用户数据
        handleDelete(_id) {
            this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                const res = this.$api.users.deleteUser({ _id })//可以触发简写
                //删除成功后重新获取最新的用户数据                  
                this.getUsers()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        //编辑用户数据(动态路由)
        handleEdit(_id) {
            this.$router.push(`/home/usersUpdate/${_id}`)
        },
        //获取页面大小(element自带的方法)
        handleSizeChange(val) {
            this.pageData.pageSize = val
        },
        //获取当前页面(element自带的方法)
        handleCurrentChange(val) {
            this.pageData.currentPage = val
        }
    },
    components: {
        BrandCrumb
    }
}
</script>

<style lang="scss" scoped>
.el-pagination {
    padding-top: 20px;
    border-top: 1px solid #c0c4cc;
    margin-top: 20px;
    text-align: center;
}

.el-input {
    width: 250px;
}
</style>