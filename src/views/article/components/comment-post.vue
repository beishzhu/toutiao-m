<template>
  <div class="comment-post">
    <van-field class="post-field" v-model.trim="message" rows="2" autosize type="textarea" maxlength="50" placeholder="请输入留言" show-word-limit />
    <van-button class="post-btn" @click="onLoadPostComment" :disabled="!message.length">发布</van-button>
  </div>
</template>

<script>
import { postComment } from '@/api/comment'
export default {
  name: 'CommentPost',
  components: {},
  inject: {
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created() { },
  mounted() { },
  methods: {
    // 发送文章评论
    async onLoadPostComment() {
      this.$toast.loading({
        message: '发布中...',
        forbidClick: true, // 禁用背景点击
        duration: 0, // 持续展示 toast
      })
      try {
        const { data } = await postComment({
          target: this.target.toString(),// 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）	,
          content: this.message,
          art_id: this.articleId ? this.articleId.toString() : this.articleId // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
        })
        console.log(data);
        this.$toast.success('发布成功')
        this.message = ''
        this.$emit('post-success', data.data)
      } catch (error) {
        this.loading = false
        this.$toast('发布失败,请重试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
