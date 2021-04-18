/**
 * 封装 axios 请求模块
 */
import axios from "axios"
import store from '@/store'
const request = axios.create({
  // baseURL: "http://ttapi.research.itcast.cn/" // 基础路径
  baseURL: "http://toutiao-app.itheima.net/" // 基础路径
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
