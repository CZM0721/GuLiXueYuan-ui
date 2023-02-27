import request from '@/utils/request'

export default{
    // 获取课程大纲基本信息
    getPublishInfo(id) {
        return request({
            url: `/eduservice/course/getPublishInfo/`+ id,
            method: 'get',
          })
    },

     // 获取课程大纲基本信息
     publishCourse(obj) {
        return request({
            url: `/eduservice/course/publishCourse`,
            method: 'post',
            data: obj,
        })
    },
}