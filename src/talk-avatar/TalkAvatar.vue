<template lang="pug">
#TalkAvatar
  div.avatar_row
    div.avatar_column-balloon
      transition
        message-balloon(
          v-show="isMsgShow"
          :msg-text="msgText"
          :msg-speed="msgSpeed"
          :msg-wait="msgWait"
          :balloon-style="balloonStyle"
          @typing="talking"
          @typed-line="talkedLine"
          @typed-all="talkedAll"
          @touched="msgTouched"
        )
    figure.avatar_column-img
      avatar-image(
        ref="avatar"
        :srcset="images"
        @touched="imgTouched"
      )
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import MessageBalloon from './MessageBalloon.vue'
import AvatarImage from './AvatarImage.vue'

interface Props {
  srcset: string | string[]
  msgText: string
  msgSpeed?: number
  msgWait?: number
  balloonStyle?: Record<string, string>
  imgSrc?: string[] // deprecated
}

const props = withDefaults(defineProps<Props>(), {
  srcset: '',
  msgText: '',
  msgSpeed: 70,
  msgWait: 300
})

type EmitEvents = {
  'talked-line': []
  'talked-all': []
  'msg-touched': []
  'img-touched': []
}

const emit = defineEmits<EmitEvents>()
const avatar = ref<InstanceType<typeof AvatarImage> | null>(null)
const isMsgShow = ref(true)

const images = computed(() => {
  if (!(props.srcset && props.srcset.length)) return props.imgSrc
  if (typeof props.srcset === 'string') return props.srcset.split(',').map(src => src.trim())
  return props.srcset
})

const talking = () => {
  isMsgShow.value ? avatar.value?.talking() : avatar.value?.talked()
}

const talkedLine = () => {
  avatar.value?.talked()
  emit('talked-line')
}

const talkedAll = () => {
  avatar.value?.talked()
  emit('talked-all')
}

const msgTouched = () => {
  isMsgShow.value = false
  emit('msg-touched')
}

const imgTouched = () => {
  emit('img-touched')
}
</script>

<style lang="sass" scoped>
@use './css/_variables' as *

#TalkAvatar
  bottom: 0
  display: flex
  justify-content: center
  left: 0
  padding: 16px
  position: fixed
  pointer-events: none
  right: 0

  @include touch
    padding: 4px

.avatar
  &_row
    align-items: flex-end
    display: flex
    max-width: 960px
    width: 100%

  &_column
    &-balloon
      flex: 1

    &-img
      margin: 0

      @include desktop
        height: 128px
        width: 128px

      @include touch
        height: 64px
        width: 64px
</style>
