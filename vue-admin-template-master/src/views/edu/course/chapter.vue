<template>
    <div class="app-container">
        <h2 style="text-align: center;">发布新课程</h2>
        <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
            <el-step title="填写课程基本信息" />
            <el-step title="创建课程大纲" />
            <el-step title="提交审核" />
        </el-steps>

        <div id="container">
            <!-- 中间内容 -->
            <el-container style="height: 500px; border: 1px solid #eee;">
                <!-- 左边课程大纲 -->
                <el-aside width="50%" style="background-color: rgb(238, 241, 246)">
                    <el-input placeholder="输入关键字进行过滤" v-model="filterText">
                    </el-input>

                    <el-tree class="filter-tree" :data="chapterData" :props="defaultProps" default-expand-all
                        :filter-node-method="filterNode" ref="tree" @node-click="nodeClick">
                    </el-tree>
                </el-aside>

                <!-- 添加章节以及小结 -->
                <el-container>
                    <el-header>
                        <!-- <el-row>
                            <el-button type="primary" plain>主要按钮</el-button>
                            <el-button type="success" plain>成功按钮</el-button>
                            <el-button type="danger" plain>危险按钮</el-button>
                        </el-row> -->
                    </el-header>
                    <el-main>
                        <el-form ref="form" :model="chapterform" label-width="80px">
                            <el-form-item label="名称">
                                <el-input v-model="chapterform.title"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="addChapter()" plain>添加章节</el-button>
                                <el-button type="success" @click="updateChapter()" plain>修改</el-button>
                                <el-button type="danger"  @click="del()" plain>删除</el-button>
                            </el-form-item>
                        </el-form>
                    </el-main>
                </el-container>
            </el-container>
        </div>
        <el-form label-width="120px">
            <el-form-item>
                <el-button @click="previous">上一步</el-button>
                <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import chapter from "@/api/edu/chapter"
export default {
    data() {
        return {
            chapterData:[],// 章节树的数据
            chapterform: {
                courseId:this.$route.params.id,
            },// 课程章节数据
            saveBtnDisabled: false, // 保存按钮是否禁用
            defaultProps: {
                children: 'children',
                label: 'title'
            }
        }
    },
    created() {
        console.log(this.$route.params.id)
        this.loginData()
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
    methods: {
        // 加载数据
        loginData() {
            chapter.getChapter(this.$route.params.id).then(res => {
                this.chapterData = res.data.data;
            })
        },

        // 点击节点
        nodeClick(data){
            console.log(data)
        },

        // 添加章节
        addChapter(){
            console.log(this.chapterform.title)
            if(!this.chapterform.title.trim()){
                this.$message.warning("名称不能为空!!!")
                return
            }
            // chapter.addChapter(this.chapterform).then(res =>{
            //     this.$message.success("添加成功!!!")
            //     this.loginData()
            // })
        },

        // 添加小结
        updateChapter(){},

        // 删除
        del(){},

        previous() {
            console.log('previous')
            this.$router.push({ path: '/course/info/1' })
        },
        next() {
            console.log('next')
            this.$router.push({ path: '/course/publish/1' })
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        }
    }
}
</script>

<style >
.app-container {
    margin: auto;
}

#container{
    margin: auto;
    text-align: center;
}
</style>