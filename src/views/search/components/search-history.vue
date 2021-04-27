<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDelete">
        <span @click="$emit('clear-history-text')">完全删除</span>
        &nbsp;&nbsp;
        <span @click="isDelete=false">完成</span>
      </div>
      <van-icon v-else name="delete-o" @click="isDelete=true" />
    </van-cell>
    <van-cell :title="item" v-for="(item,index) in searchHistory" :key="index" @click="onHistoryClick(item,index)">
      <van-icon v-show="isDelete" name="close" />
    </van-cell>

  </div>
</template>

<script>
export default {
  name: "SearchHistory",
  props: {
    searchHistory: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isDelete: false
    }
  },
  methods: {
    onHistoryClick(item, index) {
      if (this.isDelete) {
        // 1.如果是删除状态，就删除该历史记录
        this.searchHistory.splice(index, 1)
      } else {
        // 2.触发搜索
        this.$emit('search', item)
      }
    }

  }
}
</script>

<style scoped>
</style>
