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
                            <el-radio label="1">男</el-radio>
                            <el-radio label="0">女</el-radio>
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
                        <el-button type="primary" @click="addStudent">确认新增</el-button>
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
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers("majors")
export default {
    components: {
        BrandCrumb
    },
    //代替了created生命周期函数，用于激活时就执行该生命周期函数
    //解决了路由缓存时出现的bug
    activated() {
        this.getMajors()
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
            handler() {
                //只要专业改变就要将之前的班级清空
                this.form.classId = ""
                this.getClassesByMid()
            }
        }
    },
    methods: {
        ...mapActions(["getMajorsAsync"])
        ,
        async addStudent() {
            const res = await this.$api.students.add(this.form);
            //添加成功，弹出提示(element自带的提示框)
            if (res.code) {
                this.$message({
                    message: '添加成功！',
                    type: 'success'
                });
                this.majors = [],
                    this.classes = [],
                    this.form = {}
                this.$router.push("/home/studentsList")
            } else {
                this.$message.error('添加失败！');
            }
        },
        //获取所有专业数据
        getMajors() {
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
/* 当使用UI框架组件进行局部样式设置时，局部样式可能无法作用到组件内部的标签上
    所以要用样式穿透来解决！ */

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