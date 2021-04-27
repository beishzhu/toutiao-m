<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" left-arrow title="黑马头条"></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="loading" class="loading-wrap">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div v-else-if="article.title" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{article.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image class="avatar" slot="icon" round fit="cover" :src="article.aut_photo" />
          <div slot="title" class="user-name">{{article.aut_name}}</div>
          <div slot="label" class="publish-date">{{article.pubdate | relativeTime}}</div>
          <!-- 
								1.传递props
								:is-fllowed="article.is_followed" 
								2.修改自定义事件
								@upodate-is_fllow="article.is_followed = $event"
								简写方法：在组件上使用 v-model
								value="article.is_followed"
								@input="article.is_followed = $event"
					  -->
          <fllow-user class="follow-btn" :userId="article.aut_id" v-model="article.is_followed" />
          <!-- $event 是子组件中发送过来的事件参数 -->
          <!-- <fllow-user class="follow-btn" :userId="article.aut_id" :is-fllowed="article.is_followed" @upodate-is_fllow="article.is_followed = $event" /> -->
          <!-- 这两行已被封装成组件了 -->
          <!-- <van-button v-if="article.is_followed" :loading="isLoading" class="follow-btn" round size="small" @click="addfllowUser">已关注</van-button>
          <van-button v-else :loading="isLoading" class="follow-btn" type="info" color="#3296fa" round size="small" icon="plus" @click="addfllowUser">关注</van-button> -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content markdown-body" v-html="article.content" ref="article-content"></div>
        <van-divider>正文结束</van-divider>

        <!-- 评论列表 -->
        <comment-list :source="article.art_id" :list="CommentLists" @onload_success="commentCount = $event.total_count" @replay-comment="onReplay"></comment-list>
        <!-- <comment-list :source="article.art_id" @onload_success="commentCount = $event.total_count"></comment-list> -->
        <!-- /评论列表 -->

        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button class="comment-btn" type="default" round size="small" @click="isPropShow = true">写评论</van-button>
          <van-icon name="comment-o" :info="commentCount" color="#777" />
          <!-- 收藏文章 -->
          <collect-article v-model="article.is_collected" :articleId="article.art_id"></collect-article>
          <!-- <van-icon color="#777" name="star-o" /> -->
          <!-- <van-icon color="#777" name="good-job-o" /> -->
          <!-- 文章点赞 -->
          <like-article v-model="article.attitude" :articleId="article.art_id"></like-article>
          <van-icon name="share" color="#777777"></van-icon>
          <!-- 发布评论 -->
          <van-popup v-model="isPropShow" position="bottom">
            <!-- <comment-post :target="article.art_id" @post-success="onPostSuccess" :list="CommentLists" ></comment-post> -->
            <comment-post :target="article.art_id" @post-success="onPostSuccess"></comment-post>
          </van-popup>
          <!-- /发布评论 -->
        </div>
        <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div v-else-if="errorStatus === 404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticlesByid">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->

    </div>

    <!-- 评论回复 -->
    <van-popup v-model="isReplayShow" position="bottom" style="height:100%">
      <!-- <comment-post :target="article.art_id" @post-success="onPostSuccess" :list="CommentLists" ></comment-post> -->
      <comment-replay v-if="isReplayShow" :comment="commentReplays" @close="isReplayShow = false"></comment-replay>
    </van-popup>
    <!-- /评论回复 -->

  </div>
</template>

<script>
import { getArticleById } from '@/api/article'
import { ImagePreview } from 'vant'
import fllowUser from '@/components/follow'
import CollectArticle from '@/components/collect-article'
import LikeArticle from '@/components/like-item'
import CommentList from './components/comment-list'
import CommentPost from './components/comment-post'
import CommentReplay from './components/comment-replay'

export default {
  name: 'ArticleIndex',
  components: { fllowUser, CollectArticle, LikeArticle, CommentList, CommentPost, CommentReplay },
  // 父组件给所有子组件传参
  provide: function () {
    return {
      articleId: this.articleId
    }
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      article: {}, //文章详情
      loading: true, // 文章加载项
      errorStatus: 0, // 加载失败的状态
      isLoading: false, // 关注按钮加载状态
      commentCount: 0,
      isPropShow: false,
      CommentLists: [], // 评论列表
      isReplayShow: false, // 评论回复
      commentReplays: {} // 评论回复对象数据
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadArticlesByid()
  },
  mounted() { },
  methods: {
    async loadArticlesByid() {
      this.loading = true
      try {
        const { data } = await getArticleById(this.articleId)
        console.log(data);
        // 测试加载文章加载失败
        // if (Math.random() > 0.2) {
        //   return JSON.parse('fasdfasdfa')
        // }
        this.article = data.data
        // 获取dom容器节点
        setTimeout(() => {
          this.previewImage()
          // console.log(this.$refs['article-content']);
        }, 0);
        // this.loading = false
      } catch (error) {
        // this.loading = false
        if (error.response && error.response.status === 404) {
          this.errorStatus = 404
        }
        // this.$toast('文章详情获取失败,请稍后再试')
      }
      // 不管成功还是失败都要关闭加载状态
      this.loading = false
    },
    // 图片预览功能
    previewImage() {
      // 获取dom容器
      const container = this.$refs['article-content']
      // 获取dom容器中的所有img节点
      const imgs = container.querySelectorAll('img')
      const images = []
      // 遍历所有 img 节点，给每个节点注册点击事件
      imgs.forEach((img, index) => {
        images.push(img.src)
        img.onclick = () => {
          // 调用vant的图片预览组件
          ImagePreview({
            images,
            startPosition: index,
          })
        }
      });

    },
    // 发布评论成功
    onPostSuccess(data) {
      // 关闭发布弹层
      this.isPropShow = false
      this.CommentLists.unshift(data.new_obj)
    },

    // 评论回复
    onReplay(comment) {
      this.commentReplays = comment
      this.isReplayShow = true
    }
  }
}
</script>

<style scoped lang="less">
@import './github-markdown.css';
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    /deep/ .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
