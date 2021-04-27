/**
 * 用户相关的请求模块
 */
import request from "@/utils/request"
// import store from '@/store/index'
/**
 * 用户登录
 */
export const login = data => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}

/**
 * 发送验证码
 */
export const sendMsg = mobile => {
  return request({
    method: 'get',
    url: `/v1_0/sms/codes/${mobile}`,
  })
}
// 获取用户个人资料

export const getUserInfo = () => {
  return request({
    method: 'get',
    url: '/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}

/**
 * 获取用户频道请求列表
 */
export const getUserInfoList = () => {
  return request({
    method: 'get',
    url: '/v1_0/user/channels',
  })
}

// 获取用户个人资料
export const getUserProfile = target => {
  return request({
    method: 'GET',
    url: '/v1_0/user/profile'
  })
}

// 编辑用户个人资料
// /v1_0/user/profile
export const editUserProfile = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}

// 更新用户头像
export const uploadUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data
  })
}
