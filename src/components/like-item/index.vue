<template>
  <van-icon :loading="loading" :color="value=== 1 ? 'red':'#777'" :name="value===1 ? 'good-job': 'good-job-o'" @click="onLike" />

</template>

<script>
import { likeArticle, dislikeArticle } from '@/api/article'
export default {
  name: "LikeArticle",
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return { loading: false }
  },
  methods: {
    async onLike() {
      this.loading = true
      try {
        let status = -1
        if (this.value === 1) {
          // 如果有value 已点赞 取消点赞
          await dislikeArticle(this.articleId)
        } else {
          // 点赞
          await likeArticle(this.articleId)
          status = 1
        }
        this.$emit('input', status)
        this.$toast.success(this.value === 1 ? '取消点赞' : '点赞成功')
      } catch (error) {

      }
      this.loading = false
    }
  }
}
</script>

<style scoped>
</style>
