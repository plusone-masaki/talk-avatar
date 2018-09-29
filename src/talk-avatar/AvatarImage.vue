<template>
  <img class="avatar_image" :src="img" @click="touched">
</template>

<script>
  const RESET = 0

  export default {
    /**
     * @var Array imgSrc
     */
    props: {
      imgSrc: { type: Array, required: true }
    },

    /**
     * @var img: string
     * @var imgNum: number
     */
    data: function () {
      return {
        img: this.imgSrc[RESET],
        imgNum: RESET
      }
    },

    /**
     * @method talking
     * @method talked
     * @event touched
     */
    methods: {
      talking() {
        if (!this.imgSrc[++this.imgNum]) {
          this.imgNum = RESET
        }
        this.img = this.imgSrc[this.imgNum]
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
  .avatar_image {
      cursor: pointer;
      pointer-events: auto;
    width: 100%;
  }
</style>
