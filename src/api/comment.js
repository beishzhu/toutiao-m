import request from '@/utils/request'

// 获取评论请求
export const getCommentList = params => {
  return request({
    method: 'GET',
    url: '/v1_0/comments',
    params
  })
}

// 发送文章评论
export const postComment = data => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data
  })
}

// 对文章评论点赞
export const addComentLike = target => {
  return request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: {
      target
    }
  })
}

// 取消对文章评论点赞
export const deleteComentLike = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${target}`
  })
}
