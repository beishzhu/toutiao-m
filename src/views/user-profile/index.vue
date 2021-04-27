<template>
  <div class="user-profile">
    <van-nav-bar title="个人信息" class="page-nav-bar" left-arrow @click-left="$router.back()"></van-nav-bar>
    <!-- 上传头像 -->
    <input type="file" ref="file" hidden @change="onFileChange">
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image class="head" fit="cover" round :src="user.photo" />
    </van-cell>
    <van-cell title="昵称" :value="user.name" is-link @click="isShowNickName=true" />
    <van-cell title="性别" :value="user.gender === 0 ? '男' : '女'" is-link @click="isShowGender=true" />
    <van-cell title="生日" :value="user.birthday" is-link @click="isShowBirthday=true" />

    <!-- 昵称弹出层 -->
    <van-popup v-model="isShowNickName" style="height:100%" position="bottom">
      <update-name v-if="isShowNickName" v-model="user.name" @close="isShowNickName = false"> </update-name>
    </van-popup>

    <!-- 性别弹出层 -->
    <van-popup v-model="isShowGender" position="bottom">
      <update-gender v-if="isShowGender" v-model="user.gender" @close="isShowGender = false"> </update-gender>
    </van-popup>

    <!-- 生日弹出层 -->
    <van-popup v-model="isShowBirthday" position="bottom">
      <!-- <update-birthday v-if="isShowBirthday" @close="isShowBirthday = false" v-model="user.birthday"> </update-birthday> -->
      <update-birthday v-if="isShowBirthday" @close="isShowBirthday = false" v-model="user.birthday" />
    </van-popup>

    <!-- 头像弹出层 -->
    <van-popup v-model="isShowPhoto" position="bottom" style="height:100%">
      <!-- <update-birthday v-if="isShowBirthday" @close="isShowBirthday = false" v-model="user.birthday"> </update-birthday> -->
      <update-photo v-if="isShowPhoto" :img="img" @close="isShowPhoto=false" @update-photo="user.photo=$event" />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name'
import UpdateGender from './components/update-gender'
import UpdateBirthday from './components/update-birthday'
import UpdatePhoto from './components/update-photo'

export default {
  name: "UserProfile",
  components: { UpdateName, UpdateGender, UpdateBirthday, UpdatePhoto },
  data() {
    return {
      user: {},
      isShowNickName: false,
      isShowGender: false,
      isShowBirthday: false,
      isShowPhoto: false,
      img: null
    }
  },
  created() {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile() {
      try {
        const { data } = await getUserProfile()
        console.log(data);
        this.user = data.data
      } catch (error) {

      }
    },
    onFileChange() {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 基于问斩搞对象获取blob数据
      this.img = window.URL.createObjectURL(file)
      this.isShowPhoto = true
      // file-input 如果选了同一个文件 不会触发 chang 事件
      // 解决办法就是每次使用完毕 把他的 value 清空
      this.$refs.file.value = ''
    }
  }
}
</script>

<style scoped lang="less">
.van-popup {
  background-color: #f1f1f1;
}
.head {
  width: 60px;
  height: 60px;
}
</style>
