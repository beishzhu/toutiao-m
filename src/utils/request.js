/**
 * 封装 axios 请求模块
 */
import axios from "axios"
import store from '@/store'
import JSONbig from 'json-bigint'
const request = axios.create({
  // baseURL: "http://ttapi.research.itcast.cn/" // 基础路径
  baseURL: "http://toutiao-app.itheima.net/", // 基础路径
  transformResponse: [function (data) {
    // transformResponse 允许自定义原始的响应数据（字符串）
    try {
      // 如果转换成功则返回转换的数据结果
      return JSONbig.parse(data);
    } catch (error) {
      // 如果转换失败，则包装为统一数据格式并返回
      return data
    }
  }],
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  const {
    user
  } = store.state
  // 在发送请求之前做些什么
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // console.log(config);
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});




// 响应拦截器

export default request
