<template>
  <div id="demo">
    <talk-avatar
      :msgText="'Hello world!\n' +
          'I am talk avatar. This is demonstration.'"
      :msgRand="[
        'Hello!',
        'Did you grasp the atmosphere?\n' +
        'That\'s all you learn.',
        'Do you understand my English?'
      ]"
      :msgSpeed="50"
      :imgSrc="img"
    />
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
