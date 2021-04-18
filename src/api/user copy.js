/**
 * 用户相关的请求模块
 */
import request from "@/utils/request"
import store from '@/store/index'
/**
 * 用户登录
 */
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

/**
 * 发送验证码
 */
export const sendMsg = mobile => {
  return request({
    method: 'get',
    url: `/app/v1_0/sms/codes/${mobile}`,
  })
}
// 获取用户个人资料

export const getUserInfo = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/user',
    headers: {
      Authorization: `Bearer ${store.state.user.token}`
    }
  })
}
