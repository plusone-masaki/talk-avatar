<template lang="pug">
img.avatar_image(
  :src="props.srcset[index]"
  ref="imgRef"
  @click="touched"
)
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

interface Props {
  srcset: string[]
}

const props = defineProps({
  srcset: { type: Array, required: true }
})

type EmitEvents = {
  'touched': []
}

type ImageState = 'talking' | 'talked'

const emit = defineEmits<EmitEvents>()

const imgRef = ref<HTMLImageElement | null>(null)
const index = ref<number>(0)
const state = ref<ImageState>('talked')

const touched = () => {
  emit('touched')
}

const talking = () => {
  state.value = 'talking'
  updateImage()
}

const talked = () => {
  state.value = 'talked'
  updateImage()
}

const updateImage = () => {
  if (!props.srcset.length) return
  
  if (state.value === 'talking') {
    index.value = (index.value + 1) % props.srcset.length
  } else {
    index.value = 0
  }
}

onMounted(() => {
  if (imgRef.value) {
    imgRef.value.draggable = false
  }
})

watch(() => props.srcset, (newSrcset) => {
  if (newSrcset.length) {
    index.value = 0
  }
})

defineExpose({
  talking,
  talked
})
</script>

<style lang="sass" scoped>
.avatar_image
  cursor: pointer
  pointer-events: auto
  width: 100%
</style>
