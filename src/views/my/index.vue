<template>
  <div class="my-contant">
    <!-- 登录后的页面头部 -->
    <div v-if="user" class="user-info login-btn">
      <div class="base-info">
        <div class="left">
          <van-image fit="cover" class="avatar" round :src="userInfo.photo" />
          <span class="text">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button round size="mini" to="user/profile">编辑资料</van-button>
        </div>
      </div>
      <div class="data-status">
        <div class="data-item">
          <div class="count">{{ userInfo.art_count }}</div>
          <div class="text">头条</div>
        </div>
        <div class="data-item">
          <div class="count">{{ userInfo.follow_count }}</div>
          <div class="text">关注</div>
        </div>
        <div class="data-item">
          <div class="count">{{ userInfo.fans_count }}</div>
          <div class="text">粉丝</div>
        </div>
        <div class="data-item">
          <div class="count">{{ userInfo.like_count }}</div>
          <div class="text">获赞</div>
        </div>
      </div>
      <!--  -->
    </div>
    <!-- 未登录页面头部 -->
    <div v-else class="header">
      <div class="login-btn">
        <img src="~@/assets/mobile.png" alt="" />
        <span @click="$router.push('/login')" class="text">登录 / 注册</span>
      </div>
    </div>

    <!-- 宫格导航 -->
    <div class="grid-nav">
      <van-grid clickable :column-num="2">
        <van-grid-item class="grid-item">
          <i slot="icon" class="toutiao toutiao-shoucang"></i>
          <span slot="text" class="text">收藏</span>
        </van-grid-item>
        <van-grid-item class="grid-item">
          <i slot="icon" class="toutiao toutiao-lishi"></i>
          <span slot="text" class="text">历史</span>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 消息通知 -->
    <van-cell title="消息通知" is-link></van-cell>
    <van-cell title="小智同学" is-link></van-cell>
    <van-cell
      @click="onLogout"
      v-if="user"
      title="退出登录"
      class="logout-sell"
      clickable
    ></van-cell>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  data() {
    return {
      userInfo: {},
    }
  },
  computed: {
    ...mapState(['user']),
  },
  created() {
    if (this.user) {
      this.getUserInfo()
    }
  },
  methods: {
    // 退出登录
    onLogout() {
      // 1.清除登录状态(vuex容器的vser +本地存储的user)
      this.$dialog
        .confirm({
          title: '确定退出吗?',
        })
        .then(() => {
          // 确认
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // 取消
          console.log('取消执行这里')
        })
    },
    // 获取用户个人信息
    async getUserInfo() {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
        console.log(data)
        console.log(123)
      } catch (error) {
        this.$toast('获取数据失败')
      }
    },
  },
}
</script>

<style scoped lang="less">
.header {
  height: 361px;
  background: url('~@/assets/banner.png') no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .login-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    img {
      width: 132px;
      height: 132px;
      margin-bottom: 15px;
    }
    .text {
      font-size: 28px;
      color: #fff;
    }
  }
}

.user-info {
  color: #fff;
  background: url('~@/assets/banner.png') no-repeat;
  background-size: cover;
  .base-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 231px;
    padding: 76px 32px 23px;
    box-sizing: border-box;

    .left {
      display: flex;
      align-items: center;
      .avatar {
        width: 132px;
        height: 132px;
        margin-right: 23px;
        border: 4px solid #fff;
      }
      span.text {
        font-size: 30px;
      }
    }
    .right {
    }
  }
  .data-status {
    display: flex;
    .data-item {
      flex: 1;
      height: 130px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .count {
        font-size: 36px;
      }
      .text {
        font-size: 23px;
      }
    }
  }
}
.grid-nav {
  .grid-item {
    height: 141px;
    i.toutiao {
      font-size: 45px;
    }
    i.toutiao-shoucang {
      color: #eb5253;
    }
    i.toutiao-lishi {
      color: #ff9d1d;
    }
    .text {
      font-size: 28px;
    }
  }
}
.logout-sell {
  color: red;
  text-align: center;
}
</style>
