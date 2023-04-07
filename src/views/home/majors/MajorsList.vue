<template>
    <div>
        <BrandCrumb></BrandCrumb>

        <el-table :data="majors"  border style="width: 100%">
            <el-table-column prop="_id" label="编号">
            </el-table-column>
            <el-table-column prop="name" label="专业名称">
            </el-table-column>

            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="handleDelete(scope.row._id)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="pageData.currentPage" :page-sizes="[7, 9]" :page-size="pageData.pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>

        <el-dialog title="修改专业" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <el-form :model="major" label-width="80px">
                <el-form-item label="专业名称">
                    <el-input v-model="major.name"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="updateMajor">确 定</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
       
    </div>
</template>

<script>
import BrandCrumb from '@/components/brandcrumb/BrandCrumb.vue';
//注意！！
//主仓库跟模块同时存在时，需要对辅助函数进行重命名
import { mapActions,mapState } from 'vuex';//获取主仓库里的数据和方法(辅助函数)
import { createNamespacedHelpers } from "vuex";//获取模块里的数据和方法(辅助函数)
const { mapState:majorsState, mapActions:majorsActions } = createNamespacedHelpers("majors")
export default {
    data() {
        return {
            dialogVisible: false,
            major: {},  
            pageData:{
                currentPage:1,
                pageSize:5
            }          
        }
    },
    //通过计算属性接收仓库模块里的state
    computed: {
        ...majorsState(["majors","total"])//调用辅助函数
    },
    components: {
        BrandCrumb
    },
    created() {
        this.getMajors()
    },
    //侦听pageData的数据变化，执行请求操作
    watch: {
        pageData: {            
            deep: true,
            handler() {           
                this.getMajors()
            }
        }
    },
    methods: {    
        //用辅助函数添加一个getMajorsAsync方法
        ...majorsActions(["getMajorsAsync"]),
        getMajors() {
            //调用getMajorsAsync方法
            this.getMajorsAsync(this.pageData)
        },
        async handleDelete(_id) {
            const res = await this.$api.majors.delete({ _id })
            //删除成功后重新获取最新的专业数据  
            if (res.code) {
                this.getMajors()
            }
        },
        //显示表单弹窗(注意要解构出属性的值，不能直接传对象，容易造成页面数据出现bug)
        handleEdit(item) {
            // this.major=item 这是浅拷贝，容易数据混乱
            this.major = { ...item }//深拷贝(单层深拷贝)                
            this.dialogVisible = true//当弹窗被激活时，又重新把该专业对象赋值给major                                            
        },
        //用于确定是否修改数据
        async updateMajor() {
            const res = await this.$api.majors.update(this.major)
            if (res.code) {
                this.$message({
                    type: 'success',
                    message: '修改成功!'
                });
                this.dialogVisible = false
                this.getMajors()
            } else {
                this.$message({
                    message: '当前数据已经不存在,请重新选择!',
                    type: 'warning'
                });
            }
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
        },
        //获取页面大小(element自带的方法)
        handleSizeChange(val) {
            this.pageData.pageSize = val
        },
        //获取当前页面(element自带的方法)
        handleCurrentChange(val) {
            this.pageData.currentPage = val
        }

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
</style>