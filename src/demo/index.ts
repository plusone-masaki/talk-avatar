import { createApp } from 'vue'
import App from './App.vue'
import TalkAvatar from '../talk-avatar'

const app = createApp(App)
app.use(TalkAvatar)
app.mount('#demo')
