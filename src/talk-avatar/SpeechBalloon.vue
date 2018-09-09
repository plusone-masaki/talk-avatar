<template>
  <div class="box">
    <vue-typer
      v-if="msgText"
      :text="msgText"
      :typeDelay="msgSpeed"
      :repeat="0"
      @typed="typed"
      @typed-char="typing"
    />
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueTyper from 'vue-typer'

  Vue.use(VueTyper)

  export default {
    props: {
      msgText: { type: String, required: true },
      msgSpeed: { type: Number, default: 70 }
    },
    methods: {
      typed() {
        this.$emit('typed')
      },
      typing() {
        this.$emit('typing')
      }
    }
  }
</script>

<style scoped>
  @media (min-width: 769px) {
    .box {
      font-size: 20px;
      min-height: 7rem;
      line-height: 1.6;
    }
  }

  @media (max-width: 768px) {
    .box {
      font-size: 14px;
      min-height: 3.5rem;
      padding: 4px 8px;
    }
  }
</style>
