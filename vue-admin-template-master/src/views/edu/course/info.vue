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
export default {
    data() {
        return {
            saveBtnDisabled: false,// 保存按钮是否禁用
            courseInfo: {
                title: '',
                subjectId: '',
                teacherId: '',
                lessonNum: 0,
                description: '',
                cover: '',
                price: 0
            },
            teacherData: {},
        }
    },
    created() {
        // 获取讲师数据
        teacher.getAllTeacher().then(res => {
            console.log(res.data.items);
            if(res.data.items){
                this.teacherData = res.data.items
            }
        })
    },
    methods: {
        saveOrUpdata() {
            console.log(this.courseInfo);
            this.$message.success("添加成功")
            course.saveCoursec(this.courseInfo).then(res => {
                console.log(res);
                this.$message.success("添加成功")
            })
            this.$router.push({ path: '/course/chapter/1' })
        }
    },
}
</script>

<style>

</style>