<template>
  <img class="avatar_image" :src="img" :alt="alt" @click="touched">
</template>

<script>
const RESET = 0

export default {
  /**
   * @var Array imgSrc
   */
  props: {
    srcset: { type: Array, required: true },
    alt: { type: String, default: '' },
  },

  /**
   * @var {string} img
   * @var {number} imgNum
   */
  data () {
    return {
      img: this.srcset[RESET],
      imgNum: RESET,
    }
  },

  /**
   * @method talking
   * @method talked
   * @event touched
   */
  methods: {
    talking () {
      if (!this.srcset[++this.imgNum]) this.imgNum = RESET
      this.img = this.srcset[this.imgNum]
    },
    talked () {
      this.img = this.srcset[RESET]
    },
    touched () {
      this.$emit('touched')
    },
  },
}
</script>

<style lang="sass" scoped>
.avatar_image
  cursor: pointer
  pointer-events: auto
  width: 100%
</style>
