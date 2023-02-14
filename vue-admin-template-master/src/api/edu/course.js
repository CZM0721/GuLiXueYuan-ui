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
}