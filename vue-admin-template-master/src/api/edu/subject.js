import request from '@/utils/request'

export default{
    getSubjectTree() {
        return request({
            url: `/eduservice/subject/getSubjectTree`,
            method: 'get',
          })
    },
}