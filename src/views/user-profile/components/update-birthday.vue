<template>
  <div class="birthday-update">
    <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" @cancel="$emit('close')" @confirm="onConfirm" />
  </div>
</template>

<script>
import { editUserProfile } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: "update-birthday",
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: '修改中...',
        forbidClick: true, // 禁用背景点击
        duration: 0, // 持续展示 toast
      })
      try {
        const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
        await editUserProfile({ birthday: currentDate })
        // 更新父组件昵称
        this.$emit('input', currentDate)
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
