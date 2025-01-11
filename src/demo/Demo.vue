<template lang="pug">
div.demo-page
  div.demo-content
    talk-avatar(
      :srcset="avatarImages"
      :message="message"
      :delay="delay"
      @talked-all="onTalkedAll"
    )
  
  div.demo-controls
    div.message-input
      textarea(
        v-model="messageInput"
        placeholder="メッセージを入力"
      )
    div.delay-input
      label 文字送り速度（ms）：
      input(
        type="number"
        v-model.number="delay"
        min="10"
        max="1000"
        step="10"
      )
    button.send-button(
      @click="sendMessage"
    ) 送信
</template>

<script setup lang="ts">
import { ref } from 'vue'

const messageInput = ref('')
const message = ref('Hello world!\nI am talk avatar. This is demonstration.')
const delay = ref(70)
const avatarImages = ref([
  `${import.meta.env.BASE_URL}/img/masaki_default.png`,
  `${import.meta.env.BASE_URL}/img/masaki_talking.png`,
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

.delay-input
  display: flex
  align-items: center
  gap: 8px
  
  input
    width: 80px
    padding: 4px
    border: 1px solid #ddd
    border-radius: 4px

.send-button
  padding: 0 20px
</style>
