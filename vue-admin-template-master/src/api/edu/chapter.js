import request from '@/utils/request'

export default{
    // 获取章节树
    getChapter(id) {
        return request({
            url: `/eduservice/edu-chapter/getChapter/${id}`,
            method: 'get',
          })
    },

    // 添加或修改章节
    addOrUpdateChapter(data) {
        return request({
            url: `/eduservice/edu-chapter/addOrUpdateChapter`,
            method: 'post',
            data: data,
          })
    },

    // 删除章节
    delChapter(id) {
        return request({
            url: `/eduservice/edu-chapter/delChapter/${id}`,
            method: 'delete',
          })
    },
}
