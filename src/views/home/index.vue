<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button class="search-btn" slot="title" type="info" size="small" round icon="search">搜索</van-button>
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 频道列表 -->
    <van-tabs class="chanel-tabs" v-model="active" animated swipeable>
      <van-tab v-for="channel in channels" :key="channel.id" :title="channel.name">
        <!-- 频道文章列表 -->
        <article-list :channel="channel"></article-list>
      </van-tab>

      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn" @click="isChanelEditDilog=true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>

    <!-- 编辑频道对话框 -->
    <van-popup close-icon-position="top-left" v-model="isChanelEditDilog" closeable position="bottom" :style="{ height: '100%' }">
      <chanel-edit :my-channels="channels" :active="active" @change-chanel="changeChanel"></chanel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserInfoList } from '@/api/user'
import articleList from './components/article-list'
import ChanelEdit from './components/chanel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/store/storage'
export default {
  name: 'HomeIndex',
  components: { articleList, ChanelEdit },
  props: {},
  data() {
    return {
      active: 0,
      channels: [], // 频道列表
      isChanelEditDilog: false
    }
  },
  computed: { ...mapState(['user']) },
  watch: {},
  created() {
    this.loadChannels()
  },
  mounted() { },
  methods: {
    async loadChannels() {
      try {
        // const { data } = await getUserInfoList()
        // this.channels = data.data.channels
        // console.log(data)
        let channels = []
        // 获取频道列表数据
        // 1.判断用户是否已登陆
        if (this.user) {
          // 如果已登陆 直接请求用户频道数据
          const { data } = await getUserInfoList()
          channels = data.data.channels
        } else {
          // 2.用户没有登陆 获取本地存储的频道数据
          const localChannels = getItem('TOUTIAO_CHANELS')
          // 3.如果本地存储有数据就直接用
          if (localChannels) {
            channels = localChannels
          } else {
            // 4.本地存储没有数据就请求默认数据来使用
            const { data } = await getUserInfoList()
            channels = data.data.channels
          }
        }
        this.channels = channels
      } catch (error) {
        console.log(error)
        this.$toast('获取频道列表数据失败123456', error)
      }
    },
    // 更新激活的频道项目
    changeChanel(index, isChanelEditDilog = true) {
      this.active = index
      this.isChanelEditDilog = isChanelEditDilog
    }
  },
}
</script>

<style scoped lang="less">
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
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
      position: fixed;
      z-index: 1;
      left: 0;
      right: 0;
      top: 92px;
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
