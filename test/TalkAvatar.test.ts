import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TalkAvatar from '../src/talk-avatar/TalkAvatar.vue'

describe('TalkAvatar', () => {
  it('メッセージバルーンとアバター画像が表示される', () => {
    const wrapper = mount(TalkAvatar, {
      props: {
        message: 'こんにちは',
        srcset: 'avatar.png'
      }
    })
    expect(wrapper.find('.avatar_column-balloon').exists()).toBe(true)
    expect(wrapper.find('.avatar_column-img').exists()).toBe(true)
  })

  it('srcsetが文字列の場合、正しく配列に変換される', () => {
    const wrapper = mount(TalkAvatar, {
      props: {
        message: '',
        srcset: 'avatar1.png, avatar2.png'
      }
    })
    const vm = wrapper.vm as any
    expect(vm.images).toEqual(['avatar1.png', 'avatar2.png'])
  })

  it('メッセージが更新されたとき、バルーンが表示される', async () => {
    const wrapper = mount(TalkAvatar, {
      props: {
        message: '',
        srcset: 'avatar.png'
      }
    })
    await wrapper.setProps({ message: 'こんにちは' })
    const messageballoon = wrapper.find('.avatar_column-balloon')
    expect(messageballoon.isVisible()).toBe(true)
  })
}) 