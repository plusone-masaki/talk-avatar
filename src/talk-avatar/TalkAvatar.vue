<template>
  <div id="TalkAvatar">
    <div class="avatar_row">
      <div class="avatar_column-balloon">
        <message-balloon
          v-show="isMsgShow"
          :msg-text="msgSay"
          :msg-speed="msgSpeed"
          :msg-wait="msgWait"
          @typing="talking"
          @typed-line="talkedLine"
          @typed-all="talkedAll"
          @touched="msgTouched"
        />
      </div>
      <div class="avatar_column-img">
        <avatar-image
          :img-src="imgSrc"
          @touched="imgTouched"
          ref="avatar"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import MessageBalloon from './MessageBalloon'
  import AvatarImage from './AvatarImage'

  export default {
    components: { MessageBalloon, AvatarImage },
    props: {
      msgText: { type: String, required: true },
      msgSpeed: { type: Number, default: 70 },
      msgWait: { type: Number, default: 300 },
      imgSrc: { type: [String, Array], required: true }
    },
    data: function () {
      return {
        isMsgShow: true
      }
    },
    computed: {
      msgSay() {
        this.isMsgShow = true
        return this.msgText
      }
    },
    methods: {
      talking() {
        const avatar = this.$refs.avatar
        this.isMsgShow ? avatar.talking() : avatar.talked()
      },
      talkedLine() {
        this.$emit('talked-line')
      },
      talkedAll() {
        this.$refs.avatar.talked()
        this.$emit('talked-all')
      },
      msgTouched() {
        this.isMsgShow = false
        this.$emit('msg-touched')
      },
      imgTouched() {
        this.$emit('img-touched')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'scss/valiables';

  #TalkAvatar {
    bottom: 0;
    display: flex;
    justify-content: center;
    left: 0;
    padding: 16px;
    position: fixed;
    right: 0;

    @include touch {
      padding: 4px;
    }
  }

  .avatar {
    &_row {
      align-items: flex-end;
      display: flex;
      width: 960px;
    }

    &_column {
      &-balloon {
        flex: 1;
      }

      &-img {
        @include desktop {
          height: 128px;
          width: 128px;
        }

        @include touch {
          height: 64px;
          width: 64px;
        }
      }
    }
  }
</style>
