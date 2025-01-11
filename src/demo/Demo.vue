<template lang="pug">
div.demo-page
  div.demo-content
    talk-avatar(
      :srcset="avatarImages"
      :message="message"
      @talked-all="onTalkedAll"
    )
  
  div.demo-controls
    div.message-input
      textarea(
        v-model="messageInput"
        placeholder="メッセージを入力"
      )
    button.send-button(
      @click="sendMessage"
    ) 送信
</template>

<script setup lang="ts">
import { ref } from 'vue'

const messageInput = ref('')
const message = ref('Hello world!\nI am talk avatar. This is demonstration.')
const avatarImages = ref([
  '/img/masaki_default.png',
  '/img/masaki_talking.png',
])

const sendMessage = () => {
  message.value = messageInput.value
}

const onTalkedAll = () => {
  console.log('Finished talking')
}
</script>

<style lang="sass" scoped>
.demo-page
  padding: 20px

.demo-content
  margin-bottom: 20px

.demo-controls
  display: flex
  gap: 10px
  
.message-input
  flex: 1

  textarea
    width: 100%
    min-height: 60px

.send-button
  padding: 0 20px
</style>
