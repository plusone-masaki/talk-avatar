# TalkAvatar
![](./static/talk-avatar.gif)

> This TalkAvatar speaks text while lip syncing.

## Build Setup

``` bash
# install dependencies
npm install plusone-masaki/talk-avatar

# show demonstration at localhost:8080
npm run demo 

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Usage

1. Import the TalkAvatar component directly from your Vue component file:
```ecmascript 6
import { TalkAvatar } from 'talk-avatar'
```

2. Register it as your Vue component:
```ecmascript 6
const MyComponent = {
  // ...
  components: { TalkAvatar }
}

or

import Vue from 'vue'
Vue.use(TalkAvatar)
```

3. Use TalkAvatar in your Vue component's template:
```html
<talk-avatar message="Hello world!" imgSrc="[./default.png, ./talking.png]" />
```

## Props

`msg-text`
* type: `String`
* required

`msg-speed`
* type: `Number`

`msg-wait`
* type: `Number`

`balloon-style`
* type: `Object`

`img-src`
* type: `String || Array`

## Events

`talked-line`

`talked-all`

`msg-touched`

`img-touched`
