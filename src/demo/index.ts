import { createApp } from 'vue'
import Demo from './Demo.vue'
import TalkAvatar from '../talk-avatar'

const app = createApp(Demo)
app.use(TalkAvatar)
app.mount('#demo') 