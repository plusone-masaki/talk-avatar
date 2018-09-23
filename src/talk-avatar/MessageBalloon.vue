<template>
  <div
    class="balloon"
    :style="balloonStyle"
    @click="touched"
  >
    <p class="balloon_row" v-for="(text, index) in textLines">
      <vue-typer
        :text="text"
        :typeDelay="msgSpeed"
        :repeat="0"
        :key="index"
        @typed="typedLine"
        @typed-char="typing"
      />
    </p>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueTyper from 'vue-typer'

  Vue.use(VueTyper)

  const RESET = 1

  export default {
    props: {
      balloonStyle: { type: Object },
      msgText: { type: String, required: true },
      msgSpeed: { type: Number },
      msgWait: { type: Number }
    },
    data: function () {
      return { lines: RESET }
    },
    computed: {
      splitText() {
        this.lines = RESET
        return this.msgText.split('\n')
      },
      textLines() {
        return this.splitText.slice(0, this.lines)
      }
    },
    methods: {
      touched() {
        this.$emit('touched')
      },
      typing() {
        this.$emit('typing')
      },
      typedLine() {
        this.$emit('typedLine')
        this.splitText.length > this.lines
          ? setTimeout(this.nextLine, this.msgWait)
          : this.$emit('typedAll')
      },
      nextLine() {
        this.lines++
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "scss/valiables";

  .balloon {
    background: #ffffff;
    border-radius: 6px;
    box-shadow: 0 2px 3px rgba(10, 10, 10, .1);
    cursor: pointer;
    padding: 1.25rem;

    font-size: 20px;
    min-height: 7rem;
    line-height: 1.6;

    @include touch {
      font-size: 14px;
      min-height: 3.5rem;
      padding: 4px 8px;
    }

    &_row {
      margin: 0;
    }
  }
</style>
