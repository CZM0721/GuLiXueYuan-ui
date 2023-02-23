import request from '@/utils/request'

export default{
    // 获取章节树
    getChapter(id) {
        return request({
            url: `/eduservice/edu-chapter/getChapter/${id}`,
            method: 'get',
          })
    },

    // 添加章节
    addChapter(data) {
        return request({
            url: `/eduservice/edu-chapter/addOrUpdateChapter`,
            method: 'post',
            data: data,
          })
    },
}
