<template>
  <div class="comment-replay">

    <van-nav-bar :title="comment.reply_count > 0 ? `${comment.reply_count}条评论` :'暂无评论'">
      <van-icon slot="left" name="cross" @click="$emit('close')" />
    </van-nav-bar>
    <div class="comment-heard">
      <comment-item :comment="comment"></comment-item>
      <!-- 全部评论 -->

      <van-cell>全部回复</van-cell>
      <comment-list :source="comment.com_id" type='c' :list="commentList"></comment-list>
    </div>
    <!-- 写评论 -->
    <div class="post-wrap">
      <van-button class="post-btn" size="mini" round @click="isCommentshow = true">写评论</van-button>
    </div>
    <!-- 评论内容 -->
    <van-popup v-model="isCommentshow" position="bottom">
      <comment-post :target="comment.com_id" @post-success="onPostComment"></comment-post>
    </van-popup>

  </div>
</template>

<script>
import CommentItem from './comment-item'
import CommentList from './comment-list'
import CommentPost from './comment-post'
export default {
  name: "comment-replay",
  components: { CommentItem, CommentList, CommentPost },

  props: {
    comment: { type: Object, required: true },
  },

  data() {
    return {
      isCommentshow: false,
      commentList: []
    }
  },
  methods: {
    onPostComment(data) {
      // 0 更新评论统计数
      this.comment.reply_count++
      // 1. 关闭弹层
      this.isCommentshow = false
      // 2.把数据放放评论列表顶部
      this.commentList.unshift(data.new_obj)
    }
  }
}
</script>

<style scoped lang="less">
.comment-heard {
  position: fixed;
  top: 100px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto; // 滚动
}
.post-wrap {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 88px;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .post-btn {
    width: 40%;
  }
}
</style>
