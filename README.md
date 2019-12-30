# TalkAvatar
![](./static/talk-avatar.gif)

> メッセージを入力すると、アバターが喋ります。
> アバターには自分の好きな画像を設定することができ、
> 吹き出しのスタイルも変更可能です！

## インストール方法

``` bash
# インストール
npm install plusone-masaki/talk-avatar
```

## 使用方法

1. TalkAvatarをVueファイル内でインポートします。
```ecmascript 6
import { TalkAvatar } from 'talk-avatar'
```

2. コンポーネントの登録を行います。
```ecmascript 6
// ローカルコンポーネントとして登録
const MyComponent = {
  // ...
  components: { TalkAvatar }
}

or

// グローバルコンポーネントとして登録
import Vue from 'vue'
Vue.use(TalkAvatar)
```

3. TalkAvatarをテンプレート内で呼び出します。
```html
<talk-avatar message="Hello world!" :srcset="[./default.png, ./talking.png]" />
```

## Props

`msg-text`
* type: `String`
* default: ''

`msg-speed`
* type: `Number`

`msg-wait`
* type: `Number`

`balloon-style`
* type: `Object`

`srcset`
* type: `[Array, String]`

## Events

`talked-line`

`talked-all`

`msg-touched`

`img-touched`
