<template>
  <div class="input-box">
    <div class="author">
      <input type="text"
             placeholder="姓名*"
             v-model="name">
      <input type="text"
             placeholder="邮箱*"
             v-model="email">
      <input type="text"
             class="site"
             placeholder="网站地址"
             v-model="site">
    </div>
    <textarea v-model="text"
              :placeholder="placeholder"></textarea>
    <div class="tools">
      <div class="emoji-box"
           @click.stop><span class="emoji-btn"
              @click="toogleshowEmoji()">表情 <i class="iconfont icon-emoji"></i></span>
        <div class="emoji-list"
             v-if="showEmojiFlag">
          <div class="triangle"></div>
          <span class="item"
                v-for="(item,index) in emojiList"
                :key="index"
                @click="insertEmoji(item)">{{item}}</span>
        </div>
      </div>
      <div class="btns">
        <button :disabled="!enable"
                class="btn primary"
                @click="submit">评论</button>
        <button class="btn default"
                @click="close">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '请输入评论'
    }
  },
  data () {
    return {
      name: '',
      email: '',
      site: '',
      text: '',
      showEmojiFlag: false,
      emojiList: ['😃', '😂', '😅', '😉', '😌', '😔', '😓', '😢', '😍', '😘', '😜', '😡', '😤', '😭', '😱', '😳', '😵', '🌚', '🙏', '👆', '👇', '👌', '🤘', '👍', '👎', '💪', '👏', '🌻', '🌹', '💊', '🚩', '🐶', '❤️', '💔', '💩', '👻']
    }
  },
  computed: {
    enable () {
      return !!this.text.trim() && this.name.trim() && this.email.trim()
    }
  },
  mounted () {
    document.body.addEventListener('click', this.hideEmoji)
  },
  methods: {
    submit () {
      this.$emit('submit', {
        content: this.text,
        author: {
          name: this.name,
          email: this.email,
          site: this.site
        }
      });
    },
    close () {
      this.$emit('close')
    },
    toogleshowEmoji () {
      this.showEmojiFlag = !this.showEmojiFlag
      //   window.addEventListener('click', this.hideEmoji)
    },
    hideEmoji () {
      this.showEmojiFlag = false;
      //   window.removeEventListener('click', this.hideEmoji)
    },
    insertEmoji (item) {
      this.text += item;
    }
  },
  beforeDestroy () {
    document.body.removeEventListener('click', this.hideEmoji)
  }

}
</script>

<style lang="scss" scoped>
.input-box {
  position: relative;
  background: $module-bg-opacity-5;
  border-radius: $radius/2;
  .author {
    display: flex;
    margin-bottom: 1rem;
    input {
      flex: 1;
      margin-right: 1rem;
      border-bottom: $border;
      &.site {
        margin-right: 0;
      }
    }
  }
  textarea {
    width: 100%;
    height: 90px;
    padding: $box-padding-md;
    font-size: $font-size-small;
    resize: none;
    background: $body-bg;
    border-radius: 4px;
  }
  .tools {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .emoji-box {
      position: relative;
      .emoji-list {
        z-index: $z-index-header;
        position: absolute;
        width: 330px;
        padding: 5px;
        background: $white;
        border-radius: 4px;
        top: 2.5rem;
        box-shadow: $box-shadow-thin;
        .triangle {
          position: absolute;
          top: -0.7rem;
          left: 15%;
          width: 0;
          height: 0;
          transform: translate(-50%, -50%);
          border: 0.8rem solid transparent;
          border-bottom-color: #fff;
        }
        .item {
          font-size: 1.4rem;
          width: 32px;
          text-align: center;
          display: inline-block;
          cursor: pointer;
          line-height: 28px;
        }
      }
    }
    .btns {
      button {
        margin-right: $gap;
      }
    }
  }
}
</style>