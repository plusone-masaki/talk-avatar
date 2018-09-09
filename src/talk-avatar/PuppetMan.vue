<template>
  <div class="image" :class="imageSize" @click="touched">
    <img :src="img">
  </div>
</template>

<script>
  const RESET = 0

  export default {
    props: {
      imgSrc: { type: [String, Array], required: true },
      isMobile: { type: Boolean }
    },
    data: function () {
      return {
        img: Array.isArray(this.imgSrc) ? this.imgSrc[0] : this.imgSrc,
        imgCount: RESET
      }
    },
    computed: {
      imageSize() {
        return this.isMobile ? 'is-64x64' : 'is-128x128'
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
        this.$emit('touched')
      }
    }
  }
</script>

<style scoped>
  image {
    width: 100%;
  }
</style>
