<template>
    <div class="app-container">
      <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />
  
      <el-tree
        ref="tree2"
        :data="data2"
        :props="defaultProps"
        :filter-node-method="filterNode"
        class="filter-tree"
        default-expand-all
      />
  
    </div>
</template>

<script>
import subject from '@/api/edu/subject.js'
export default {
    data() {
        return {
            data2:[],
            defaultProps: {
                children: 'children',
                label: 'title'
            }
        }
    },
    created() {
    },
    mounted() {
        this.getTree()
    },
    watch:{
        filterText(val) {
            this.$refs.tree2.filter(val)
        }
    },
    methods: {

        // 获取树
        getTree(){
            subject.getSubjectTree().then(res=>{
                console.log(res)
                this.data2 = res.data.data
                console.log(this.data2)
            })
        },

        filterNode(){
            if (!value) return true
            return data.label.indexOf(value) !== -1
        }
    },
}
</script>

<style>

</style>