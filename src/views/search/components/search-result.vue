<template>
  <div class="search-result">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :error.sync="error" error-text="请求失败，点击重新加载">
      <van-cell v-for="(article,index) in list" :key="index" :title="article.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/api/search'
export default {
  name: "SearchResult",
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      list: [],
      error: false,
      loading: false,
      finished: false,
      page: 1,
      per_page: 20 // 每页数量
    };
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      // 1. 请求获取数据
      try {
        const { data } = await getSearchResults({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText // 搜索关键字
        })
        // // 测试加载失败的场景
        // if (Math.random() > 0.7) {
        //   JSON.parse('fasdfas')
        // }

        // 2. 把数据添加到list中
        // console.log(data);
        const { results } = data.data
        // console.log(results);
        this.list.push(...results)
        // 3. 关闭加载
        this.loading = false
        // 4.数据加载完成
        if (results.length) {
          this.page++ // 更新获取下一页的数据
        } else {
          this.finished = true
        }
      } catch (error) {
        this.loading = false
        this.error = true
      }
    },
  },
};
</script>

<style scoped>
</style>
