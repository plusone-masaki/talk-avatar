import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AvatarImage from '../src/talk-avatar/AvatarImage.vue'

describe('AvatarImage', () => {
  it('画像が正しく表示される', () => {
    const srcset = ['avatar.png']
    const wrapper = mount(AvatarImage, {
      props: {
        srcset
      }
    })
    expect(wrapper.find('img').attributes('src')).toBe(srcset[0])
  })

  it('クリックイベントが正しく発行される', async () => {
    const wrapper = mount(AvatarImage, {
      props: {
        srcset: ['avatar.png']
      }
    })
    await wrapper.find('img').trigger('click')
    expect(wrapper.emitted('touched')).toBeTruthy()
  })

  it('talking状態が正しく切り替わる', async () => {
    const wrapper = mount(AvatarImage, {
      props: {
        srcset: ['avatar.png']
      }
    })
    const vm = wrapper.vm as any
    vm.talking()
    expect(vm.state).toBe('talking')
    vm.talked()
    expect(vm.state).toBe('talked')
  })
}) 