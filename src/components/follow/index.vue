<template>
  <van-button v-if="isFllowed" :loading="loading" class="follow-btn" round size="small" @click="addfllowUser">已关注</van-button>
  <van-button v-else :loading="loading" class="follow-btn" type="info" color="#3296fa" round size="small" icon="plus" @click="addfllowUser">关注</van-button>
</template>

<script>
import { followUser, deleteFollowUser } from '@/api/article'
export default {
  name: "fllowUser",
  model: {
    prop: 'isFllowed',
    event: 'upodate-is_fllow'
  },
  props: {
    // isFllowed: {
    isFllowed: {
      type: Boolean,
      required: true
    },
    userId: {
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
    // 关注 和 取消关注用户
    async addfllowUser() {
      this.loading = true
      try {
        if (this.isFllowed) {
          // 取消关注
          await deleteFollowUser(this.userId)
        } else {
          // 关注
          await followUser(this.userId)
        }
        // this.$emit('upodate-is_fllow', !this.value)
        // this.$emit('input', !this.value)
        this.$emit('upodate-is_fllow', !this.isFllowed)
        // this.articleId = !this.articleId
      } catch (error) {
        console.log(error);
        const message = '关注用户失败,请稍后重试'
        if (error.response && error.response.status === 400) {
          message = '你不能关注自己'
        }
        this.$toast(message)
      }
      this.loading = false
    }
  }
}
</script>

<style scoped>
</style>
