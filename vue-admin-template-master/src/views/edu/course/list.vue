<template>
    <div class="app-container">
      课程列表
  
      <!--查询表单-->
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="query.title" placeholder="课程名称"/>
        </el-form-item>

        <el-form-item>
          <el-input v-model="query.teacherName" placeholder="讲师名名称"/>
        </el-form-item>

        <el-form-item>
          <el-input v-model="query.subjectLevelTwo" placeholder="所属分类"/>
        </el-form-item>
  
        <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
        <el-button type="default" @click="resetData()">清空</el-button>
      </el-form>
  
      <!-- 表格 -->
      <el-table
        :data="list"
        border
        fit
        highlight-current-row>
  
        <el-table-column
          label="序号"
          width="70"
          align="center">
          <template slot-scope="scope">
            {{ (page.current - 1) * page.size + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="title" label="课程名称" />
  
        <el-table-column prop="teacherName" label="课程讲师"  />
  
        <el-table-column prop="lessonNum" label="课程课时" width="80" />

        <el-table-column prop="price" label="课程价格"  width="80" />

        <el-table-column prop="subjectLevelTwo" label="所属分类" />
  
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <router-link :to="'/course/info/'+scope.row.id">
              <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
            </router-link>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
  
      <!-- 分页 -->
      <el-pagination
        :current-page="page.current"
        :page-size="page.size"
        :total="page.total"
        style="padding: 30px 0; text-align: center;"
        layout="total, prev, pager, next, jumper"
        @current-change="getList"
      />
  
    </div>
  </template>
  <script>
  //引入调用teacher.js文件
  import course from '@/api/edu/course'
  
  export default {
      //写核心代码位置
      // data:{
      // },
      data() { //定义变量和初始值
          return {
            list:null,//查询之后接口返回集合
            page:{
                current:1,//当前页
                size:10,//每页记录数
                total:0,//总记录数
            },                     
            query:{}, //条件封装对象
            eduCourse:{}
          }
      },
      created() { //页面渲染之前执行，一般调用methods定义的方法
          //调用
          this.getList() 
      },
      methods:{
          //课程列表的方法
          getList() {
            course.getCourseInfoList(Object.assign({
                    current: this.page.current,
                    size: this.page.size
            }, this.query)).then(res=>{
                this.list = res.data.data.records
                this.page.total = res.data.data.total
            })
          },

          // 清空查询添加
          resetData() {
            this.query={}
          },

          //删除讲师的方法
          removeDataById(id) {
              this.$confirm('此操作将永久删除课程记录, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {  //点击确定，执行then方法
                  this.eduCourse.id = id
                  this.eduCourse.isDeleted=1
                  //调用删除的方法
                  course.deleteCourse(this.eduCourse).then(res=>{
                    this.$message.success("删除成功")
                    this.courseQuery={}
                    this.getList()
                  })
              })
          }
   
      }
  }
  </script>
  