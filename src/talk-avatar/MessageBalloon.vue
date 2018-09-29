<template>
  <div
    class="balloon"
    :style="balloonStyle"
    @click="touched"
  >
    <div class="balloon_container" v-if="msgText">
      <p class="balloon_row" v-for="(text, index) in messageLines">
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
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueTyper from 'vue-typer'

  Vue.use(VueTyper)

  const RESET = 0
  const START = 1

  export default {
    /**
     * @var balloonStyle
     * @var msgText
     * @var msgSpeed
     * @var msgWait
     */
    props: {
      balloonStyle: { type: Object },
      msgText: { type: String, required: true },
      msgSpeed: { type: Number },
      msgWait: { type: Number }
    },

    /**
     * @var lines
     */
    data: function () {
      return { lines: START }
    },

    /**
     * @method splitMessage
     * @method messageLines
     */
    computed: {
      splitMessage() {
        this.lines = RESET
        this.$nextTick(() => {
          this.lines++
        })
        return this.msgText.split('\n')
      },
      messageLines() {
        return this.splitMessage.slice(0, this.lines)
      }
    },

    /**
     * @method typedLine
     * @method nextLine
     * @event typing
     * @event typed-line
     * @event typed-all
     * @event touched
     */
    methods: {
      typing() {
        this.$emit('typing')
      },
      typedLine() {
        this.$emit('typed-line')
        this.splitMessage.length > this.lines
          ? setTimeout(this.nextLine, this.msgWait)
          : this.$emit('typed-all')
      },
      touched() {
        this.$emit('touched')
      },
      nextLine() {
        this.lines++
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "css/_valiables";

  .balloon {
    background: #ffffff;
    border-radius: 6px;
    box-shadow: 0 2px 3px rgba(10, 10, 10, .1);
    cursor: pointer;
    padding: .5em 1.25em;
    pointer-events: auto;

    font-size: 20px;
    min-height: 4.8em;
    line-height: 1.6;

    @include touch {
      font-size: 14px;
      min-height: 3.5em;
      padding: 4px 8px;
    }

    &_row {
      margin: 0;
      padding: 0;
      letter-spacing: .05em;
    }
  }
</style>
