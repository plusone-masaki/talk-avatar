<template>
  <img class="avatar_image" :src="img" @click="touched">
</template>

<script>
  const RESET = 0

  export default {
    props: {
      imgSrc: { type: [String, Array], required: true }
    },
    data: function () {
      return {
        img: Array.isArray(this.imgSrc)
          ? this.imgSrc[0]
          : this.imgSrc,
        imgCount: RESET
      }
    },
    methods: {
      talking() {
        if (!this.imgSrc[++this.imgCount]) {
          this.imgCount = RESET
        }
        this.img = this.imgSrc[this.imgCount]
      },
      talked() {
        this.img = this.imgSrc[RESET]
      },
      touched() {
        this.$emit('img-touched')
      }
    }
  }
</script>

<style scoped>
  .avatar_image {
    width: 100%;
  }
</style>
