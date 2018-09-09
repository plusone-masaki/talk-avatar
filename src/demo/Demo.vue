<template>
  <div id="demo">
    <button @click="say('hello')">say 'hello'</button>
    <talk-avatar
      :message="message"
      :talkSpeed="50"
      :imgSrc="images"
    />
  </div>
</template>

<script>
  import { TalkAvatar } from '../talk-avatar'

  export default {
    name: "Demo",
    components: { TalkAvatar },
    data: function () {
      return {
        message: 'Hello world!\n' +
          'I am talk avatar. This is demonstration.',
        images: [
          require('./img/masaki_default.png'),
          require('./img/masaki_talking.png')
        ]
      }
    },
    methods: {
      say(mes) {
        this.message = mes
      }
    }
  }
</script>
