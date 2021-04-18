<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar">
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 频道列表 -->
    <van-tabs class="chanel-tabs" v-model="active" animated swipeable>
      <van-tab
        v-for="chinner in channels"
        :key="chinner.id"
        :title="chinner.name"
        >{{ chinner.name }}的内容</van-tab
      >

      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import { getUserInfoList } from '@/api/user'
export default {
  name: 'HomeIndex',
  components: {},
  props: {},
  data() {
    return { active: 0, channels: [] }
  },
  computed: {},
  watch: {},
  created() {
    this.loadChannels()
  },
  mounted() {},
  methods: {
    async loadChannels() {
      try {
        const { data } = await getUserInfoList()
        this.channels = data.data.channels
        console.log(data)
      } catch (error) {
        this.$toast('获取频道列表数据失败')
      }
    },
  },
}
</script>

<style scoped lang="less">
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icovan-iconn {
      font-size: 32px;
    }
  }
  /deep/ .chanel-tabs {
    .van-tabs__wrap {
      height: 82px;
    }
    .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
      font-size: 30px;
      color: #777777;
    }
    .van-tab--active {
      color: #333;
    }
    .van-tabs__nav {
      padding: 0;
    }
    .van-tabs__line {
      width: 31px !important;
      height: 6px;
      bottom: 8px;
      background-color: #3296fa;
    }
    // 第一次用占位符
    .placeholder {
      width: 66px;
      height: 82px;
      flex-shrink: 0; //第一次使用
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      opacity: 0.902;
      i.toutiao {
        font-size: 33px;
      }
      &::before {
        content: '';
        width: 1px;
        height: 100%;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>
