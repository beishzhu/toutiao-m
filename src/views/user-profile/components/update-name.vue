<template>
  <div class="update-name">
    <van-nav-bar title="设置昵称" left-text="取消" right-text="完成" @click-left="$emit('close')" @click-right="UpdateUserProfile"></van-nav-bar>
    <van-field class="nick-name" v-model.trim="localName" autosize rows="2" type="textarea" maxlength="7" placeholder="请输入昵称" show-word-limit />
  </div>
</template>

<script>
import { editUserProfile } from '@/api/user'
export default {
  name: "UpdateName",
  props: {
    value: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      localName: this.value
    }
  },
  methods: {
    async UpdateUserProfile() {
      this.$toast.loading({
        message: '修改中...',
        forbidClick: true, // 禁用背景点击
        duration: 0, // 持续展示 toast
      })
      try {
        const localName = this.localName
        if (!localName.length) {
          // 没有输入名称 
          return this.$toast('昵称不能为空')
        }
        // 调试失败场景
        // if (Math.random() > 0.1) {
        //   JSON.parse('456789fsdafas ')
        // }
        const { data } = await editUserProfile({ name: localName })
        console.log(data);
        // 更新父组件昵称
        this.$emit('input', localName)
        // 关闭弹层
        this.$emit('close')
        // 提示更新成功
        this.$toast('更新昵称成功')
      } catch (error) {
        this.$toast.fail('修改失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.update-name {
  .nick-name {
    margin: 20px;
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
  }
}
</style>
