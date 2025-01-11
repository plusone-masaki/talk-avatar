import { App } from 'vue'
import TalkAvatarComponent from './TalkAvatar.vue'

export const TalkAvatar = TalkAvatarComponent

export default {
  install(app: App) {
    app.component('talk-avatar', TalkAvatarComponent)
  }
}
