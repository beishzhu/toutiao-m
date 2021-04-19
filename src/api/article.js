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
