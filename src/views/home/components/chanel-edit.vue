<template>
  <div class="chanel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button class="edit-btn" type="danger" plain round size="mini" @click="isEdit = !isEdit">{{isEdit ? '完成':'编辑'}}</van-button>
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item class=" grid-item" v-for="(chanel, index) in myChannels" :key="index">
        <van-icon v-show="isEdit && !fiexChanels.includes(chanel.id)" slot="icon" name="clear"></van-icon>
        <span slot="text" class="text" :class="{active:index===active}" @click="onMyChanelClick(chanel,index)">{{chanel.name}}</span>
      </van-grid-item>
    </van-grid>
    <van-cell>
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item @click="addMyChanel(chanel)" icon="plus" class="grid-item" v-for="(chanel,index) in recommendChannels" :key="index" :text="chanel.name" />
    </van-grid>
  </div>
</template>

<script>
import { getAllChanels, addUserChanel, deleteUserChanel } from '@/api/chanel'
import { mapState } from 'vuex'
import { setItem } from '@/store/storage'
export default {
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  name: "chanel-edit",
  data() {
    return {
      allChanels: [], // 所有频道列表
      isEdit: false,
      fiexChanels: [0] // 固定频道不能被删除
    }
  },
  computed: {
    ...mapState(['user']),
    recommendChannels() {
      return this.allChanels.filter(chanel => {
        return !this.myChannels.find(chanels => {
          return chanels.id === chanel.id
        })
      })
    }
  },
  created() { this.loadAllChanels() },
  methods: {
    async loadAllChanels() {
      try {
        const { data } = await getAllChanels()
        console.log(data);
        this.allChanels = data.data.channels
      } catch (error) {
        console.log(error);
      }
    },
    // 从推荐频道 添加到 我的频道
    async addMyChanel(chanel) {
      this.myChannels.push(chanel)
      // console.log(chanel);
      // 频道数据持久化
      if (this.user) {
        try {
          // 1.登陆状态
          await addUserChanel({ id: chanel.id, seq: this.myChannels.length })
        } catch (error) {
          this.$toast('保存失败,请稍后重试')
        }
      } else {
        console.log(123);
        // 2.未登录状态 将频道数据保存到本地存储
        setItem('TOUTIAO_CHANELS', this.myChannels)
      }
    },

    // 我的频道 操作
    onMyChanelClick(chanel, index) {
      if (this.isEdit) {
        // 执行删除
        // 1. 如果点击删除的频道是 推荐 不让删除
        if (this.fiexChanels.includes(chanel.id)) {
          return
        }
        // 2.删除
        this.myChannels.splice(index, 1)
        // 3. 保留当前激活的频道不变
        if (index <= this.active) {
          this.$emit('change-chanel', this.active - 1, true)
        }
        // 删除数据持久化
        this.deleteChanels(chanel)
      } else {
        // console.log(chanel);
        this.$emit('change-chanel', index, false) //子组件向父组件传递数据
      }
    },

    // 删除频道数据持久化
    async deleteChanels(chanel) {

      // 登录状态
      try {
        if (this.user) {
          await deleteUserChanel(chanel.id)
        } else {
          // 未登录
          setItem('TOUTIAO_CHANELS', this.myChannels)
        }
      } catch (error) {
        this.$toast('操作失败,请稍后重试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.chanel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap; //设置不这行 一行展示
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
    }
  }

  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }

  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row; // 水平方向排列
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
