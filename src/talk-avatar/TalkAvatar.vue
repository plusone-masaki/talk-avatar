<template>
  <div id="TalkAvatar" class="container">
    <div class="columns is-mobile is-gapless">
      <div class="column">
        <speech-balloon
          @typed="talked"
          @typing="talking"
          :msg-text="message"
          :msg-speed="talkSpeed"
        />
      </div>
      <puppet-man
        @touched="touched"
        :img-src="imgSrc"
        :is-mobile="isMobile"
        ref="puppet"
      />
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Bulma from 'bulma'
  import SpeechBalloon from './SpeechBalloon'
  import PuppetMan from './PuppetMan'

  Vue.use(Bulma)

  export default {
    components: { SpeechBalloon, PuppetMan },
    props: {
      message: { type: String, required: true },
      talkSpeed: { type: Number },
      imgSrc: { type: [String, Array], required: true }
    },
    computed: {
      isMobile() {
        return window.parent.screen.width <= 768
      }
    },
    methods: {
      talked() {
        this.$refs.puppet.talked()
      },
      talking() {
        this.$refs.puppet.talking()
      },
      touched() {
        this.$emit('touched')
      }
    }
  }
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }

  #TalkAvatar {
    bottom: 0;
    left: 0;
    max-width: 960px;
    padding: 4px;
    position: fixed;
    right: 0;
  }

  .columns {
    align-items: flex-end;
  }

  @media (min-width: 769px) {
    #TalkAvatar {
      padding: 16px;
    }
  }
</style>
