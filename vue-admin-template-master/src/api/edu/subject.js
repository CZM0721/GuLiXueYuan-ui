import request from '@/utils/request'

export default{
    // 获取课程树
    getSubjectTree() {
        return request({
            url: `/eduservice/subject/getSubjectTree`,
            method: 'get',
          })
    },

    // 根据父亲节点id查询
    getSubjectByParentId(parentId) {
        return request({
            url: `/eduservice/subject/getSubjectByParentId?parentId=`+parentId,
            method: 'get',
          })
    },
}
