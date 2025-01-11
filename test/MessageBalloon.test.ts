import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MessageBalloon from '../src/talk-avatar/MessageBalloon.vue'

describe('MessageBalloon', () => {
  it('メッセージが正しく表示される', async () => {
    const message = 'こんにちは'
    const wrapper = mount(MessageBalloon, {
      props: {
        message,
        delay: 0
      }
    })
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 100))
    expect(wrapper.text()).toContain('こんにちは')
  })

  it('URLが正しくリンクに変換される', async () => {
    const message = 'こんにちは https://example.com'
    const wrapper = mount(MessageBalloon, {
      props: {
        message,
        delay: 0
      }
    })
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 100))
    const html = wrapper.html()
    expect(html).toContain('<a href="https://example.com"')
  })

  it('スペース文字でtalked-spaceイベントが発行される', async () => {
    const message = 'Hello World'
    const wrapper = mount(MessageBalloon, {
      props: {
        message,
        delay: 0
      }
    })
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 100))
    const events = wrapper.emitted()
    expect(events['talked-space']).toBeTruthy()
  })
}) 