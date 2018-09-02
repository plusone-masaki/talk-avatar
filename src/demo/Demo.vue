<template>
  <div id="demo">
    <talk-avatar :src="img" :message="msg"></talk-avatar>
  </div>
</template>

<script>
  import {TalkAvatar} from '../talk-avatar'

  export default {
    name: "Demo",
    components: {TalkAvatar},
    data: function () {
      return {
        msg: 'Hello world!\n' +
          'I am talk avatar. This is demonstration.',
        img: [
          require('./img/masaki_default.png'),
          require('./img/masaki_talking.png')
        ]
      }
    }
  }
</script>

<style scoped>

</style>
