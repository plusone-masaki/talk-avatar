<template>
  <div id="TalkAvatar" class="container">
    <div class="columns is-mobile is-gapless">
      <div class="column">
        <div class="box">
          <vue-typer
            v-if="message"
            :text="message"
            :typeDelay="msgSpeed"
            :repeat="0"
            @typed="lipClose"
            @typed-char="lipSync"
          />
        </div>
      </div>
      <div class="image" :class="[isSP ? 'is-64x64' : 'is-128x128']" @click="rndChat">
        <img :src="img">
      </div>
    </div>
  </div>
</template>

<style scoped>
  * {
    box-sizing: border-box;
  }

  #TalkAvatar {
    bottom: 0;
    font-size: 14px;
    left: 0;
    max-width: 960px;
    padding: 4px;
    position: fixed;
    right: 0;
  }

  .columns {
    align-items: flex-end;
  }

  image {
    margin-right: 8px;
    width: 100%;
  }

  @media (min-width: 769px) {
    #TalkAvatar {
      font-size: 20px;
      padding: 16px;
    }

    .box {
      height: 7rem;
      line-height: 1.6;
    }
  }

  @media (max-width: 768px) {
    .box {
      height: 3.5rem;
      padding: 4px 8px;
    }
  }
</style>

<script>
  import Vue from 'vue'
  import VueTyper from 'vue-typer'
  import Bulma from 'bulma'

  Vue.use(VueTyper);
  Vue.use(Bulma);

  const RESET = 0;

  export default {
    props: {
      msgText: {
        type: String,
        required: true
      },
      msgRand: {
        type: Array
      },
      msgSpeed: {
        type: Number,
        default: 70
      },
      imgSrc: {
        type: [String, Array],
        required: true
      }
    },
    data: function () {
      return {
        message: this.msgText,
        img: Array.isArray(this.imgSrc) ? this.imgSrc[0] : this.imgSrc,
        imgLength: Array.isArray(this.imgSrc) ? this.imgSrc.length : 0,
        imgCount: RESET,
      }
    },
    computed: {
      isSP: () => {
        return window.parent.screen.width <= 768
      },
    },
    methods: {
      lipClose: function () {
        this.img = this.imgSrc[RESET]
      },
      lipSync: function () {
        if (this.imgLength <= ++this.imgCount) {
          this.imgCount = RESET;
        }
        this.img = this.imgSrc[this.imgCount];
      },
      rndChat: function () {
        if (this.msgRand) {
          this.message = this.msgRand[Math.floor(Math.random() * this.msgRand.length)]
        } else {
          this.message = this.msgText
        }
      }
    }
  }
</script>
