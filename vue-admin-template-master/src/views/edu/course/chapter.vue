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
                    <el-tree class="filter-tree" :data="chapterData" 
                            :props="defaultProps" default-expand-all
                            :filter-node-method="filterNode"  
                            ref="tree" 
                            @node-click="nodeClick">
                            <span class="custom-tree-node" slot-scope="{ node, data }">
                                <span v-if="data.index == 0" class="custom-tree-node">
                                    <span style="font-weight: bold;">{{ node.label }}</span>
                                    <el-button
                                        type="text"
                                        size="mini"
                                        @click="openVideo(data)">
                                        添加小结
                                    </el-button> 
                                </span>
                                <span v-else class="custom-tree-node" slot-scope="{ node, data }">
                                    <span>{{ node.label }}</span>
                                    <div>
                                        <el-button
                                            type="text"
                                            size="mini"
                                            @click="openUpdateVideo(data)">
                                            修改小结
                                        </el-button>
                                        <el-button
                                            type="text"
                                            size="mini"
                                            @click="delVideo(data)">
                                            删除小结
                                        </el-button>
                                    </div>
                                </span>
                            </span>  
                    </el-tree>
                </el-aside>

                <!-- 添加章节以及小结 -->
                <el-container>
                    <el-header></el-header>
                    <el-main>
                        <el-form ref="form" :model="chapterform" label-width="80px">
                            <el-form-item label="名称">
                                <el-input v-model="chapterform.title"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="addChapter()" plain>添加章节</el-button>
                                <el-button type="success" @click="updateChapter()" plain>修改章节</el-button>
                                <el-button type="danger"  @click="deleteChapter()" plain>删除章节</el-button>
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

        <!-- 添加小结的弹窗 -->
        <el-dialog title="小结信息" :visible.sync="dialogFormVisible" center>
            <el-form :model="videoFrom">
                <el-form-item label="章节ID" :label-width="formLabelWidth">
                    <el-input v-model="videoFrom.chapterId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="章节名称" :label-width="formLabelWidth">
                    <el-input v-model="videoFrom.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="小结名称" :label-width="formLabelWidth" >
                    <el-input v-model="videoFrom.title" autocomplete="off" placeholder="请输入小结名称"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" :label-width="formLabelWidth">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addVideo()">添加小结</el-button>
            </div>
        </el-dialog>

        <!-- 修改小结的弹窗 -->
        <el-dialog title="小结信息" :visible.sync="videoFormVisible" center>
            <el-form :model="videoFrom">
                <el-form-item label="小结ID" :label-width="formLabelWidth" >
                    <el-input v-model="videoFrom.id" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="小结名称" :label-width="formLabelWidth" >
                    <el-input v-model="videoFrom.title" autocomplete="off" placeholder="请输入小结名称"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" :label-width="formLabelWidth">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateVideo()">修改小结</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import chapter from "@/api/edu/chapter"
import video from "@/api/edu/video"
export default {
    data() {
        return {
            chapterData:[],// 章节树的数据
            chapterform: {
                id:"",
                title: "",
                courseId:this.$route.params.id,
            },// 课程章节数据
            videoFrom: {
                title: "",
                courseId:this.$route.params.id,
            }, //小结数据
            saveBtnDisabled: false, // 保存按钮是否禁用
            defaultProps: {
                children: 'children',
                label: 'title'
            },
            dialogFormVisible:false,//添加小结弹窗配置
            videoFormVisible:false,//修改小结弹窗配置
            formLabelWidth:'120px',
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
            if(data.index == 0) {
                this.chapterform.id = data.id
                this.chapterform.title = data.title
            }
        },

        // 添加章节
        addChapter(){
            console.log(this.chapterform.title)
            if(!this.chapterform.title.trim()){
                this.$message.warning("名称不能为空")
                return
            }
            this.chapterform.id = ""
            chapter.addOrUpdateChapter(this.chapterform).then(res =>{
                this.$message.success("添加成功")
                this.loginData()
            })
        },

        // 修改章节
        updateChapter(){
            if(!this.chapterform.title.trim()){
                this.$message.warning("名称不能为空")
                return
            }
            chapter.addOrUpdateChapter(this.chapterform).then(res =>{
                this.$message.success("修改成功")
                this.loginData()
            })
        },

        // 删除章节
        deleteChapter(){
            if(this.chapterform.id){
                this.$confirm('此操作将删除——'+this.chapterform.title+', 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    chapter.delChapter(this.chapterform.id).then(() => {
                        this.loginData()
                        this.$message.success("删除成功")
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            }
        },

        // 打开添加小结弹窗事件
        openVideo(data){
            console.log(data);
            this.videoFrom.chapterId = data.id
            this.videoFrom.name = data.title
            this.dialogFormVisible = true
        },

        // 添加小结
        addVideo(){
            if(!this.videoFrom.title.trim()){
                this.$message.warning("小结名称不能为空!!!")
                return
            }
            video.addOrUpdateVideo(this.videoFrom).then(res =>{
                this.$message.success("添加成功!!!")
                this.dialogFormVisible = false
                this.loginData()
            })
        },

        // 打开修改小结弹窗事件
        openUpdateVideo(data){
            this.videoFrom = {}
            this.videoFrom.id = data.id
            this.videoFrom.title = data.title
            this.videoFormVisible = true
        },

        // 修改小结
        updateVideo(){
            if(!this.videoFrom.title.trim()){
                this.$message.warning("小结名称不能为空")
                return
            }
            video.addOrUpdateVideo(this.videoFrom).then(res =>{
                this.$message.success("修改成功")
                this.videoFormVisible = false
                this.loginData()
            })
        },

        // 删除小结
        delVideo(data){
            this.$confirm('此操作将删除——'+data.title+'该小结, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                video.delVideo(data.id).then(() => {
                    this.loginData()
                    this.$message.success("删除成功")
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },

        previous() {
            console.log('previous')
            this.$router.push({ path: '/course/info/'+this.$route.params.id })
        },

        next() {
            console.log('next')
            this.$router.push({ path: '/course/publish/'+this.$route.params.id })
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

.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 20px;
}

#container{
    margin: auto;
    text-align: center;
}
</style>