// 请求所有频道列表数据

import request from '@/utils/request'

export const getAllChanels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}


// 批量修改用户频道列表数据
export const addUserChanel = (channel) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}

// 批量删除用户频道列表数据
export const deleteUserChanel = channelId => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${channelId}`
  })
}
