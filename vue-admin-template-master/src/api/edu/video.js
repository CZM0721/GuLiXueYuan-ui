import request from '@/utils/request'

export default{

    // 添加或修改小结
    addOrUpdateVideo(data) {
        return request({
            url: `/eduservice/edu-video/addOrUpdateVideo`,
            method: 'post',
            data: data,
          })
    },

    delVideo(id) {
        return request({
            url: `/eduservice/edu-video/delVideoById/`+id,
            method: 'delete',
        })
    },
}