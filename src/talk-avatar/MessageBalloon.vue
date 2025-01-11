<template lang="pug">
div.balloon(
  :style="style"
  @click="touched"
)
  div.balloon_container(v-if="message")
    p.balloon_row(
      v-for="(text, index) in lines"
      :key="index"
    )
      span(
        v-html="displayedText[index] ?? ''"
        ref="typingText"
        style="white-space: pre-wrap"
      )
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

// すべての空白文字を判定する正規表現
const WHITESPACE_REGEX = /[\s\u00A0\u1680\u180E\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]/

// URLを検出する正規表現
const URL_REGEX = /^https?:\/\/[^\s<>]+/

interface Props {
  style?: Record<string, string>
  message: string
  delay: number
}

type EmitEvents = {
  (e: 'typing'): void
  (e: 'talked-space'): void
  (e: 'typed-line'): void 
  (e: 'typed-all'): void
  (e: 'touched'): void
}

const props = defineProps<Props>()
const emit = defineEmits<EmitEvents>()

const lines = computed(() => props.message.split('\n'))
const displayedText = ref<string[]>([])
const currentLine = ref<number>(0)
const currentChar = ref<number>(0)
const isLink = ref<boolean>(false)

const typeNextChar = () => {
  if (currentLine.value >= lines.value.length) return

  const line = lines.value[currentLine.value]
  if (!displayedText.value[currentLine.value]) {
    displayedText.value[currentLine.value] = ''
  }

  if (currentChar.value < line.length) {
    const char = line[currentChar.value]
    const isSpace = WHITESPACE_REGEX.test(char)
    const urlMatch = URL_REGEX.exec(line.substring(currentChar.value))
    if (urlMatch) {
      isLink.value = true
      displayedText.value[currentLine.value] +=
        `<a href="${urlMatch[0]}" target="_blank" rel="noopener noreferrer" onclick="event => event.stopPropagation()">`
    }

    displayedText.value[currentLine.value] += char
    
    if (isSpace) {
      isLink.value = false
      displayedText.value[currentLine.value] += '</a>'
      emit('talked-space')
    } else {
      emit('typing')
    }

    currentChar.value++
    setTimeout(typeNextChar, props.delay)
  } else {
    if (isLink.value) {
      isLink.value = false
      displayedText.value[currentLine.value] += '</a>'
    }
    emit('typed-line')
    currentChar.value = 0
    currentLine.value++
    if (currentLine.value < lines.value.length) {
      setTimeout(typeNextChar, props.delay * 4)
    } else {
      emit('typed-all')
    }
  }
}

const touched = (e: PointerEvent) => {
  if (!(e.target instanceof HTMLAnchorElement)) emit('touched')
}

watch(() => props.message, () => {
  currentLine.value = 0
  currentChar.value = 0
  displayedText.value = []
  typeNextChar()
}, { immediate: true })
</script>

<style lang="sass" scoped>
@use './css/_variables' as v

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

  @include v.touch
    font-size: 14px
    min-height: 3.5em
    padding: 4px 8px

  &_row
    margin: 0
    padding: 0
    letter-spacing: .05em

:deep(a)
  color: #0066cc
  text-decoration: none
  
  &:hover
    text-decoration: underline
</style>
