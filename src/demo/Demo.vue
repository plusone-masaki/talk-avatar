<template>
  <div id="demo">
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
      integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU"
      crossorigin="anonymous"
    >
    <header class="header">
      <p class="title">Talk Avatar</p>
      <p class="subtitle">DEMO</p>
      <i class="far fa-comment-dots" />
    </header>
    <div class="field">
      <div class="control">
        <textarea
          v-model="inputMessage"
          class="message"
          cols="60"
          rows="5"
          placeholder="Please input any message and submit."
        />
      </div>
      <div class="control">
        <button class="submit" @click="say(inputMessage)">SAY</button>
      </div>
    </div>
    <talk-avatar
      :msgText="message"
      :msgSpeed="70"
      :srcset="images"
    />
  </div>
</template>

<script>
import { TalkAvatar } from '../talk-avatar'

export default {
  name: "Demo",
  components: { TalkAvatar },
  data () {
    return {
      message: 'Hello world!\n' +
        'I am talk avatar. This is demonstration.',
      inputMessage: '',
      images: [
        require('./img/masaki_default.png'),
        require('./img/masaki_talking.png'),
      ],
    }
  },
  methods: {
    say (mes) {
      this.message = mes
    },
  },
}
</script>

<style lang="sass" scoped>
  .header
    text-align: center
    padding: 20px

  .header .title
    font-size: 30px
    margin: 0

  .header .subtitle
    font-size: 25px
    margin-top: 0

  .far
    font-size: 200px

  .control
    text-align: center

  .control .message
    border: 0
    border-radius: 6px
    box-shadow: 0 0 0 3px orange
    font-size: 20px
    padding: 8px

  .control .submit
    margin-top: 30px
    background: #ffffff
    border: 0
    border-radius: 6px
    box-shadow: 0 0 0 3px cornflowerblue
    font-size: 20px
    height: 30px
    width: 120px
</style>
