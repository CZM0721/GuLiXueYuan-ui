import request from '@/utils/request'

export default{
    // 添加课程信息
    saveCoursec(obj) {
        return request({
            url: `/eduservice/course/saveCourse`,
            method: 'post',
            data:obj,
          })
    },

    // 获取课程信息
    getCourseInfo(id) {
        return request({
            url: `/eduservice/course/getCourse/`+ id,
            method: 'get',
          })
    },

    // 修改课程信息
    updateCoursec(obj) {
        return request({
            url: `/eduservice/course/updateCourse`,
            method: 'post',
            data:obj,
        })
    },
}