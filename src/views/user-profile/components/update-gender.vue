<template>
  <div class="gender">
    <van-picker title="标题" show-toolbar :columns="columns" :default-index="value" @confirm="onConfirm" @cancel="$emit('close')" @change="onChange" />
  </div>
</template>

<script>
import { editUserProfile } from '@/api/user'
export default {
  name: "UpdateGender",
  props: {
    value: {
      type: Number,
      required: true
    },
  },
  data() {
    return {
      columns: ['男', '女'],
      localGender: this.value
    }
  },
  methods: {
    // 确定
    async onConfirm() {
      this.$toast.loading({
        message: '修改中...',
        forbidClick: true, // 禁用背景点击
        duration: 0, // 持续展示 toast
      })
      try {
        const localGender = this.localGender
        await editUserProfile({ gender: localGender })
        // 更新父组件昵称
        this.$emit('input', localGender)
        // 关闭弹层
        this.$emit('close')
        // 提示更新成功
        this.$toast('更新成功')
      } catch (error) {
        this.$toast.fail('修改失败')
      }
    },
    // 值发生改变
    onChange(picker, value, index) {
      // console.log(picker, value, index);
      this.localGender = index
    }
  }
}
</script>

<style scoped>
</style>
