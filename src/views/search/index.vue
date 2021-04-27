<template>
  <div class="search-cont">
    <!-- 顶部搜索栏 -->
    <form action="/" class="fromFiex">
      <van-search v-model="searchText" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel" @focus="isResultShow=false" background="#3296fa" />
    </form>
    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :search-text="searchText" />
    <!-- 联想内容 -->
    <search-suggess v-else-if="searchText" :search-text="searchText" @search="onSearch" />

    <!-- 搜索历史记录 -->
    <search-history v-else :search-history="SearchHistoryText" @clear-history-text="SearchHistoryText = []" @search="onSearch" />
  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggess from './components/search-suggess'
import SearchResult from './components/search-result'
import { setItem, getItem } from '@/store/storage'

export default {
  components: {
    SearchHistory,
    SearchSuggess,
    SearchResult
  },
  name: "SearchIndex",
  data() {
    return {
      searchText: '',
      isResultShow: false, // 搜索结果
      SearchHistoryText: getItem('TOUTIAO_SEARCH_HISTORY') || []
    };
  },
  methods: {
    onSearch(val) {
      // console.log(val);
      // 渲染搜索历史记录
      this.isResultShow = true
      // 搜索记录
      this.searchText = val

      // 保存搜索记录 
      // 先判断搜索记录是否为重复，如果有重复就删掉旧的 再插入新的
      const index = this.SearchHistoryText.indexOf(val)
      if (index !== -1) {
        // 找到当前记录已有值
        this.SearchHistoryText.splice(index, 1)
      }
      // 倒序排：最新的排在最前面
      this.SearchHistoryText.unshift(val)
    },
    onCancel() {
      this.$router.back()
    },
  },
  watch: {
    // 把搜索记录保存到本地存储
    SearchHistoryText(value) {
      console.log(123);
      setItem('TOUTIAO_SEARCH_HISTORY', value)
    }
  }
}
</script>

<style scoped lang="less">
.van-search__action {
  color: #fff;
}
.search-cont {
  padding-top: 108px;
  .fromFiex {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1;
  }
}
</style>
