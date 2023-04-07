<template>
    <div>
        <BrandCrumb></BrandCrumb>

        <el-input @change="searchStudent" placeholder="请输入学生姓名" suffix-icon="el-icon-search" v-model="search">
        </el-input>

        <el-table :data="tableData" border style="width: 100%">
            <el-table-column  width="100px" prop="avatar" label="头像" align="center">
                <template slot-scope="scope">
                    <el-avatar shape="square" size="large" :src="scope.row.avatar"></el-avatar>
                </template>
            </el-table-column>
            <el-table-column header-align="center" prop="name" label="姓名">
            </el-table-column>
            <el-table-column header-align="center" prop="age" label="年龄">
            </el-table-column>
            <el-table-column header-align="center" prop="gender" label="性别">
            </el-table-column>
            <el-table-column header-align="center" prop="majorId.name" label="专业">
            </el-table-column>
            <el-table-column header-align="center" prop="classId.name" label="班级">
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
    //生命周期调用getStudents函数
    created() {
        this.getStudents()
    },
    //侦听pageData的数据变化，执行请求操作
    watch: {
        pageData: {
            deep: true,
            handler() {           
                this.getStudents()
            }
        }
    },
    methods: {
        //获取学生数据(分页)
        async getStudents() {
            //通过axios发送请求(将分页和搜索学生的参数汇合成一个对象,将判断交给了后端来处理)
            const res = await this.$api.students.get({ ...this.pageData, value: this.search });
            if (res.code) {
                this.tableData = res.data.rows;
                this.total = res.data.total;
            }            
        },
        //搜索学生(姓名)
        searchStudent() {
            this.getStudents()
        },
        //删除学生数据
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

                const res = this.$api.students.delete({ _id })//可以触发简写
                //删除成功后重新获取最新的学生数据                  
                this.getStudents()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        //编辑学生数据(动态路由)
        handleEdit(_id) {
            this.$router.push(`/home/studentsUpdate/${_id}`)
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