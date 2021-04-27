<template>
  <div class="update-photo">
    <img class="img" :src="img" ref="image">
    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
import { uploadUserPhoto } from '@/api/user'
export default {
  name: "update-photo",
  props: {
    img: {
      type: [Object, String],
      required: true
    }
  },
  data() {
    return {
      cropper: null
    }
  },
  mounted() {
    const image = this.$refs.image;
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  },
  methods: {
    onConfirm() {
      // 基于服务端的裁切使用 getData 方法
      // console.log(this.cropper.getData());
      this.cropper.getCroppedCanvas().toBlob(blob => {
        // console.log(blob);

        // 发送请求
        this.uploadUserPhoto(blob)

      }
      )
    },
    async uploadUserPhoto(blob) {
      this.$toast.loading({
        message: '上传中...',
        forbidClick: true, // 禁用背景点击
        duration: 0, // 持续展示 toast
      })
      try {
        // 注意这里请求头的 Content-Type 是	multipart/form-data
        const formData = new FormData()
        formData.append('photo', blob)
        const { data } = await uploadUserPhoto(formData)
        // console.log(data);
        // 更新图片
        this.$emit('update-photo', data.data.photo)
        // 关闭图层
        this.$emit('close')
        // 提示更新成功
        this.$toast('头像更新成功')
      } catch (error) {
        this.$toast.fail('更新失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.update-photo {
  height: 100%;
  background-color: #000;
  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .cancel,
    .confirm {
      display: flex;
      width: 90px;
      height: 90px;
      font-size: 30px;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
.img {
  display: block;
  max-width: 100%;
}
</style>
