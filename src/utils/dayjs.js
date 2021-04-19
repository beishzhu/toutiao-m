import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' // 加载中文语言包
dayjs.locale('zh-cn') // 全局使用
import relativeTime from 'dayjs/plugin/relativeTime'
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
dayjs.extend(relativeTime)
// dayjs() 获取当前最新时间
// console.log(dayjs().format('YYYY-MM-DD'));
