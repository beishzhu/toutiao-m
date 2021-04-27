<template>
  <van-icon :loading="loading" :color="value? 'red':'#777'" :name="value ? 'star': 'star-o'" @click="onCollect" />
</template>

<script>
import { collectArticle, deleteCollectArticle } from '@/api/article'
export default {
  name: "CollectArticle",
  props: {
    value: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async onCollect() {
      this.loading = true
      try {
        if (this.value) {
          // 已收藏 取消收藏
          await deleteCollectArticle(this.articleId)

        } else {
          // 未收藏 添加收藏
          await collectArticle(this.articleId)
        }
        // 收藏成功或取消收藏 向父组件发送修改事件
        this.$emit('input', !this.value)
        this.$toast.success(this.value ? '取消收藏' : '收藏成功')
      } catch (error) {
        this.$toast.fail('操作失败,请重试')
      }
      this.loading = false
    }
  }
}
</script>

<style scoped>
</style>
