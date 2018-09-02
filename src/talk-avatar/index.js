import TalkAvatarComponent from './TalkAvatar'

export const TalkAvatar = TalkAvatarComponent

export default {
  install(Vue) {
    Vue.component('talk-avatar', TalkAvatarComponent)
  }
}
