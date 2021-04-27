<template>
  <div class="search-suggess">
    <van-cell icon="search" v-for="(text,index) in searchList" :key="index" @click="$emit('search',text)">
      <div slot="title" v-html="lightHeight(text)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggessions } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: "SearchSuggess",
  // 子组件接收父组件传递过来的数据
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      searchList: [] // 搜索联想结果数据
    }
  },
  // 子组件监听父组件搜索框内容的变化
  watch: {
    searchText: {
      // handler(value) {
      //   console.log(value)
      //   this.loadSearchSuggess(value) // 调用搜索请求
      // },
      handler: debounce(function (value) {
        // console.log(value)
        this.loadSearchSuggess(value)
      }, 200),
      immediate: true // 该回调将会在侦听开始之后被立即调用
    }
  },
  methods: {
    // 文章联想请求
    async loadSearchSuggess(q) {
      try {
        const { data } = await getSearchSuggessions(q)
        // console.log(data);
        this.searchList = data.data.options
      } catch (error) {
        this.$toast('获取数据失败,清稍后再试')
      }
    },

    // 搜索匹配到的字符高亮
    lightHeight(text) {
      const hilightSearchStr = `<span class="active">${this.searchText}</span>` // 高亮的字符
      const reg = new RegExp(this.searchText, 'ig') // 正则表达式
      return text.replace(reg, hilightSearchStr)  // 替换为高亮的字符
    }

  }
}
</script>

<style scoped lang="less">
.search-suggess {
  /deep/ span.active {
    color: purple;
  }
}
</style>
