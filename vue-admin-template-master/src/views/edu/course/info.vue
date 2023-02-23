<template>
    <div class="app-container">
        <h2 style="text-align: center;">发布新课程</h2>
        <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;"></el-steps>
        <el-steps :active="1" align-center>
            <el-step title="编辑课程基本信息" description=""></el-step>
            <el-step title="编写大纲" description=""></el-step>
            <el-step title="最终发布" description=""></el-step>
        </el-steps>
        <el-form label-width="120px">
            <el-form-item label="课程标题">
                <el-input v-model="courseInfo.title" placeholder="请填写课程标题"></el-input>
            </el-form-item>
            <!-- 所属分类 TODO -->
            <el-form-item label="所属分类">
                <el-select v-model=" courseInfo.subjectParentId" filterable placeholder="请选择" @change="getTowClassify()">
                    <el-option v-for="item in oneClassifyData" :key="item.title" :label="item.title" :value="item.id">
                    </el-option>
                </el-select>
                <el-select v-model="courseInfo.subjectId" filterable placeholder="请选择">
                    <el-option v-for="item in twoClassifyData" :key="item.title" :label="item.title" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>

            <!-- 课程讲师 TODO -->
            <el-form-item label="课程讲师">
                <el-select v-model="courseInfo.teacherId" placeholder="请选择">
                    <el-option v-for="item in teacherData" :key="item.value" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="总课时">
                <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right"
                    placeholder="请填写课程的总课时数" />
            </el-form-item>

            <!-- 课程简介 TODO -->
            <el-form-item label="课程简介">
                <el-input v-model="courseInfo.description" placeholder="请填写课程简介"></el-input>
            </el-form-item>

            <!-- 课程封面 TODO -->
            <el-form-item label="课程封面">
                <el-upload class="avatar-uploader" :action="BASE_API+'/eduoss/fileoss/uploadOssFile'"
                    :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="courseInfo.cover" :src="courseInfo.cover" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>

            <el-form-item label="课程价格">
                <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="请输入课程的价格" />
            </el-form-item>

            <el-form-item>
                <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdata">保存并下一步</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import course from "@/api/edu/course"
import teacher from "@/api/edu/teacher"
import subject from "@/api/edu/subject"
export default {
    data() {
        return {
            saveBtnDisabled: false,// 保存按钮是否禁用
            courseInfo: {
                title: '',
                subjectId: '',
                subjectParentId: '',
                teacherId: '',
                lessonNum: 0,
                description: '',
                cover: '',
                price: 0
            },
            oneClassify: '',
            oneClassifyData: {},//所属分类一级分类
            twoClassifyData: {},//所属分类二级分类
            teacherData: {},//讲师数据
            BASE_API:process.env.BASE_API,
        }
    },
    created() {
        // 获取讲师数据
        teacher.getAllTeacher().then(res => {
            if (res.data.items) {
                this.teacherData = res.data.items
            }
        })

        // 获取课程分类数据
        subject.getSubjectByParentId('0').then(res => {
            this.oneClassifyData = res.data.data
            // 设置默认值
            // this.oneClassify = this.oneClassifyData[0].id
        })
    },
    methods: {

        // 保存课程基本信息
        saveOrUpdata() {
            console.log(this.courseInfo);
            this.$message.success("添加成功")
            course.saveCoursec(this.courseInfo).then(res => {
                console.log(res);
                console.log(res.data.id)
                this.$message.success("添加成功")
                this.$router.push({ path: '/course/chapter/'+res.data.id})
            })
        },

        // 根据一级分类查找二级分类
        getTowClassify() {
            // 清空二级分类的内容
            this.twoClassifyData = {}
            this.courseInfo.subjectId = ''
            // 获取课程分类数据
            subject.getSubjectByParentId(this.courseInfo.subjectParentId).then(res => {
                this.twoClassifyData = res.data.data
                // 设置默认值
                // this.courseInfo.subjectId = this.oneClassifyData[0].id
            })
        },

        handleAvatarSuccess(res, file) {
            console.log(res);
            this.courseInfo.cover = res.data.url
            // this.imageUrl = URL.createObjectURL(file.raw);
        },

        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }

    },
}
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 300px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 300px;
    height: 178px;
    display: block;
}
</style>