<template>
  <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :error.sync="error" error-text="请求失败，店家重新加载" :immediate-check="false">
    <comment-item v-for="(item,index) in list" :key="index" :title="item.content" :comment="item" @replay-comment="$emit('replay-comment',$event)" />
  </van-list>
</template>

<script>
import { getCommentList } from '@/api/comment'
import CommentItem from './comment-item'
export default {
  name: "commentList",
  components: { CommentItem },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      // 自定义prop 数据验证
      validator(value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      limit: 20,
      offset: null,
      error: false
    };
  },
  created() {
    this.loading = true // 当慢速网络的时候要先开启这个加载
    this.onLoad()
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      try {
        //  1 获取请求数据
        const { data } = await getCommentList({
          type: this.type, // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source.toString(), // 源id，文章id或评论id
          offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
        })
        // console.log(data);
        const { results } = data.data
        this.list.push(...results)
        // 向父组件传递评论总数
        this.$emit('onload_success', data.data)
        // 2. 关闭loading
        this.loading = false
        // 3.判断加载的数据是否完成
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
        this.$toast('评论加载失败,请稍后再试')
      }
    }
  }
};
</script>

<style scoped>
</style>
