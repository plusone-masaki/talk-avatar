<template>
  <div id="TalkAvatar">
    <div class="avatar_row">
      <div class="avatar_column-balloon">
        <transition>
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
        </transition>
      </div>
      <figure class="avatar_column-img">
        <avatar-image
          :img-src="imgSrc"
          @touched="imgTouched"
          ref="avatar"
        />
      </figure>
    </div>
  </div>
</template>

<script>
  import MessageBalloon from './MessageBalloon'
  import AvatarImage from './AvatarImage'

  export default {
    components: { MessageBalloon, AvatarImage },

    /**
     * @var Array imgSrc
     * @var String msgText
     * @var Number msgSpeed
     * @var Number msgWait
     */
    props: {
      imgSrc: { type: Array, required: true },
      msgText: { type: String, required: true },
      msgSpeed: { type: Number, default: 70 },
      msgWait: { type: Number, default: 300 }
    },

    /**
     * @var bool isMsgShow
     */
    data: function () {
      return {
        isMsgShow: true
      }
    },

    /**
     * @method msgSay
     */
    computed: {
      msgSay() {
        this.isMsgShow = true
        return this.msgText
      }
    },

    /**
     * @method talking
     * @event talked-line
     * @event talked-all
     * @event msg-touched
     * @event img-touched
     */
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
  @import "css/ress.min.css";
  @import 'css/_valiables';

  #TalkAvatar {
    bottom: 0;
    display: flex;
    justify-content: center;
    left: 0;
    padding: 16px;
    position: fixed;
    pointer-events: none;
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
