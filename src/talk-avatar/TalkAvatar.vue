<template>
  <div id="TalkAvatar">
    <el-row type="flex" align="bottom" :gutter="16">
      <el-col>
        <el-card
          shadow="always"
          :body-style="{ padding: [isMD() ? '20px 32px' : '8px'] }"
          @click="console.log('test')"
        >
          <vue-typer
            :text="text"
            :repeat="0"
            @typed-char="lipSync"
          />
        </el-card>
      </el-col>
      <img class="el-image" :src="img" alt="avatar">
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
  * {
    box-sizing: border-box;
  }

  #TalkAvatar {
    bottom: 0;
    display: flex;
    font-size: 14px;
    justify-content: center;
    left: 0;
    padding: 4px;
    position: fixed;
    right: 0;
  }

  .el-row {
    width: 960px;
  }

  .el-image {
    height: 60px;
    margin-right: 8px;
    width: 60px;
  }

  @media (min-width: 768px) {
    #TalkAvatar {
      font-size: 20px;
      padding: 16px;
    }
    .el-image {
      height: 120px;
      width: 120px;
    }
    .el-card {
      height: 136px;
      line-height: 1.6;
    }
  }
</style>

<script>
  import Vue from 'vue'
  import VueTyper from 'vue-typer'
  import ElementUI from 'element-ui'
  import 'element-ui/lib/theme-chalk/index.css'

  Vue.use(VueTyper);
  Vue.use(ElementUI);

  const RESET = 0;

  export default {
    props: {
      message: {
        type: String,
        required: true
      },
      src: {
        type: [String, Array],
        required: true
      }
    },
    data: function () {
      return {
        text: this.message,
        img: Array.isArray(this.src) ? this.src[0] : this.src,
        imgLength: Array.isArray(this.src) ? this.src.length : 0,
        imgCount: RESET,
      }
    },
    methods: {
      isMD: () => {
        return window.parent.screen.width >= 768;
      },
      lipSync: function () {
        if (this.imgLength <= ++this.imgCount) {
          this.imgCount = RESET;
        }
        this.img = this.src[this.imgCount];
      },
    },
  }
</script>
