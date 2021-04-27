<template>
  <div class="article-list">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" :success-text="refreshSuccessText" :success-duration="1500">
      <van-list v-model="loading" :error.sync="error" error-text="请求失败，点击重新加载" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <article-item v-for="(article,index) in list" :key="index" :article="article" ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api/article'
import ArticleItem from '@/components/article-item'
// import request from 'request'
export default {
  components: { ArticleItem },
  props: {
    channel: { type: Object, required: true }
  },
  name: 'articleList',
  data() {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中 loading 状态
      finished: false, // 请求数据加载结束的状态
      timestamp: null, // 请求获取下一页数据的时间戳
      error: false, // 请求数据失败的状态
      refreshing: false, // 下拉刷新状态
      refreshSuccessText: "刷新成功"// 下拉刷新失败
      // 文章列表请求参数 如果写在之这里 不会实施更新的 ，不要写这里
    }
  },
  created() {
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      // 1.请求获取数据
      try {
        const { data } = await getArticleList({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })

        // 模拟请求错误的数据
        // if (Math.random() > 0.5) {
        //   JSON.parse('DSFASFASDF')
        // }

        console.log(data);
        // 2. 把数据添加到 list 数组中
        const { results } = data.data
        this.list.push(...results)
        // 3. 设置本次加载的结束状态
        this.loading = false
        // 4.判断数据是否加载结束
        if (results.length) {
          // 更新获取下一页数据的时间挫
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (error) {
        console.log('请求失败', error);
        this.loading = false // 关闭 loading 效果
        this.error = true // 开启错误提示
      }
    },

    // 下拉刷新事件
    async onRefresh() {
      try {
        // 1. 请求获取数据
        const { data } = await getArticleList({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        })
        // 模拟请求错误的数据
        // if (Math.random() > 0.5) {
        //   JSON.parse('DSFASFASDF')
        // }
        // 2. 将数据追加到顶部
        const { results } = data.data
        this.list.unshift(...results)
        // 3. 关闭下拉刷新的 loading 状态
        this.refreshing = false
        // 4. 提示刷新成功的条数
        this.refreshSuccessText = `刷新成功,更新了${results.length}条数据`
      } catch (error) {
        // 刷新失败
        this.refreshing = false // 关闭加载页面
        this.refreshSuccessText = "刷新失败了"
        console.log(error);
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  // 设置记住列表的滚动位置 每个文章列表滚动的位置 互不影响
  height: 79vh;
  overflow: auto;
}
</style>

