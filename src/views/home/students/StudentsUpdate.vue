<template>
    <div>
        <BrandCrumb></BrandCrumb>

        <el-row :gutter="20">
            <el-col :span="6">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="学生姓名">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="学生年龄">
                        <el-input v-model="form.age"></el-input>
                    </el-form-item>

                    <el-form-item label="学生性别">
                        <el-radio-group v-model="form.gender">
                            <el-radio :label="1">男</el-radio>
                            <el-radio :label="0">女</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="选择专业">
                        <el-select v-model="form.majorId" placeholder="请选择专业">
                            <el-option v-for="item in majors" :key="item._id" :label="item.name"
                                :value="item._id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选择班级">
                        <el-select v-model="form.classId" placeholder="请选择班级">
                            <el-option v-for="item in classes" :key="item._id" :label="item.name"
                                :value="item._id"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="updateStudent">确认修改</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </el-col>

            <el-col :span="6">
                <el-upload class="avatar-uploader" action="/api/images/upload" :show-file-list="false"
                    :on-success="handleAvatarSuccess">
                    <img v-if="form.avatar" :src="form.avatar" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-col>
        </el-row>


    </div>
</template>

<script>
import BrandCrumb from '@/components/brandcrumb/BrandCrumb.vue';
import { createNamespacedHelpers } from "vuex"
const { mapState, mapActions } = createNamespacedHelpers("majors")
export default {
    components: {
        BrandCrumb
    },
    created() {
        this.getMajors()
        this.getStudentById()
    },
    data() {
        return {
            form: {
                //vue检测不到对象新增的属性，所以要先占个位！
                classId: "",
                avatar: ""//用于保存学生上传的头像
            },
            classes: [],
        }
    },
    computed: {
        ...mapState(["majors"])
    },
    watch: {
        //侦听form.majorId属性的变化
        'form.majorId': {
            handler(newVal, oldVal) {
                //第一次侦听时判断是否需要清空
                if (oldVal) {
                    //只要专业改变就要将之前的班级清空
                    this.form.classId = ""
                    this.getClassesByMid()
                }
            }
        }
    },
    methods: {
        ...mapActions(["getMajorsAsync"])
        ,
        //通过动态路由学生id获取该学生的数据
        async getStudentById() {
            const res = await this.$api.students.getById(this.$route.params)
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
        async updateStudent() {
            const res = await this.$api.students.updateStudent(this.form)
            if (res.code) {
                this.$message({
                    message: '修改成功!',
                    type: 'success'
                });
                this.$router.push("/home/studentsList")
            }
        },
        //获取所有专业数据
        async getMajors() {
            this.getMajorsAsync({})
        },
        //根据专业id获取相应的班级数据
        async getClassesByMid() {
            const res = await this.$api.classes.getByMid({ majorId: this.form.majorId })
            if (res.code) {
                this.classes = res.data.rows
            }
        },
        //图片上传成功后进行预览
        handleAvatarSuccess(res) {
            this.form.avatar = res.data[0]
        },
    }
}
</script>

<style scoped>
.avatar-uploader>>>.el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader>>>.el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>