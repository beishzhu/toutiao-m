import request from "@/utils/request"

// 请求文章列表数据
export const getArticleList = params => {
  return request({
    method: 'GET',
    // url: '/v1_1/articles',
    url: '/v1_1/articles',
    params
  })
}

// 获取文章详情列表
export const getArticleById = article_id => {
  return request({
    method: 'GET',
    url: `/v1_0/articles/${article_id}`,
    article_id
  })
}

// 关注用户
export const followUser = target => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target
    }
  })
}

// 取消关注用户
export const deleteFollowUser = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${target}`
  })
}

// 添加收藏文章
export const collectArticle = target => {
  return request({
    method: "POST",
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
}

// 取消收藏文章
export const deleteCollectArticle = target => {
  return request({
    method: "DELETE",
    url: `/v1_0/article/collections/${target}`
  })
}

// 点赞文章
export const likeArticle = target => {
  return request({
    method: "POST",
    url: '/v1_0/article/likings',
    data: {
      target
    }
  })
}

// 取消点赞文章
export const dislikeArticle = target => {
  return request({
    method: "DELETE",
    url: `/v1_0/article/likings/${target}`
  })
}
