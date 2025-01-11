<template lang="pug">
div.balloon(
  :style="style"
  @click="touched"
)
  div.balloon_container(v-if="message")
    p.balloon_row(
      v-for="(text, index) in splitMessage"
      :key="index"
    )
      span(ref="typingText" style="white-space: pre-wrap") {{ displayedText[index] || '' }}
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface Props {
  style?: Record<string, string>
  message: string
  delay: number
}

type EmitEvents = {
  (e: 'typing'): void
  (e: 'typed-line'): void 
  (e: 'typed-all'): void
  (e: 'touched'): void
}

const props = defineProps({
  style: { type: Object },
  message: { type: String, required: true },
  delay: { type: Number, default: 70 }
})
const emit = defineEmits<EmitEvents>()

const lines = ref<number>(1)
const displayedText = ref<string[]>([])
const currentLine = ref<number>(0)
const currentChar = ref<number>(0)

const splitMessage = computed(() => {
  lines.value = 0
  return props.message.split('\n')
})

const messageLines = computed(() => {
  return splitMessage.value.slice(0, lines.value)
})

// すべての空白文字を判定する正規表現
const WHITESPACE_REGEX = /[\s\u00A0\u1680\u180E\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]/

const typeNextChar = () => {
  if (currentLine.value >= splitMessage.value.length) return

  const line = splitMessage.value[currentLine.value]
  if (!displayedText.value[currentLine.value]) {
    displayedText.value[currentLine.value] = ''
  }

  if (currentChar.value < line.length) {
    const char = line[currentChar.value]
    const isSpace = WHITESPACE_REGEX.test(char)
    displayedText.value[currentLine.value] += char
    currentChar.value++
    
    isSpace ? emit('typed-line') : emit('typing')
    setTimeout(typeNextChar, props.delay)
  } else {
    emit('typed-line')
    currentChar.value = 0
    currentLine.value++
    if (currentLine.value < splitMessage.value.length) {
      setTimeout(() => {
        lines.value++
        typeNextChar()
      }, props.delay * 4)
    } else {
      emit('typed-all')
    }
  }
}

const touched = () => {
  emit('touched')
}

watch(() => props.message, () => {
  currentLine.value = 0
  currentChar.value = 0
  displayedText.value = []
  typeNextChar()
}, { immediate: true })
</script>

<style lang="sass" scoped>
@use './css/_variables' as *

.balloon
  background: #ffffff
  border-radius: 6px
  box-shadow: 0 2px 3px rgba(10, 10, 10, .1)
  box-sizing: border-box
  cursor: pointer
  padding: .5em 1.25em
  pointer-events: auto
  font-size: 20px
  min-height: 4.8em
  line-height: 1.6

  @include touch
    font-size: 14px
    min-height: 3.5em
    padding: 4px 8px

  &_row
    margin: 0
    padding: 0
    letter-spacing: .05em
</style>
