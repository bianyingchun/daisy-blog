<template>
  <div class="message-wraper">
    <barrage class="barrage"
             ref="barrage"
             :list="messageList" />
    <div class="input-box">
      <div class="select-btn">
        <span class="iconfont inner-btn">A</span>
        <div class="selection">
          <div class="font-size">
            <div class="title">字号</div>
            <div class="content">
              <div v-for="(item,index) in styleOption.fontsize"
                   :key="index"
                   :class="['item',{'active':currentStyle.fontsize === item.value}]"
                   @click="currentStyle.fontsize=item.value">{{item.text}}</div>
            </div>
          </div>
          <div class="color">
            <div class="title">颜色</div>
            <div class="content">
              <div :class="['item',{'active':currentStyle.color === item}]"
                   v-for="item in styleOption.color"
                   :key="item"
                   :style="{'background-color':item}"
                   @click="currentStyle.color=item"></div>
            </div>

          </div>
        </div>
      </div>
      <input type="text"
             placeholder="说点什么吧"
             v-model.trim="content"
             @keypress.enter="addMessage"
             :style="{color:currentStyle.color}">
      <button type="button"
              class="submit-btn"
              @click="addMessage">发送</button>
    </div>
  </div>
</template>

<script>
import Barrage from '~/components/widget/barrage.vue'
import { MESSAGE_ADD, MESSAGE_LIST } from '~/constants/api'
export default {
  async asyncData (context) {
    let messageList = []
    try {
      const res = await context.app.$request(MESSAGE_LIST, 'get', {});
      messageList = res.result;
    } catch (err) {
      console.log(err)
    }
    return {
      messageList
    }
  },
  data () {
    return {
      content: '',
      posting: false,
      currentStyle: {
        fontsize: '16px',
        color: '#ffffff'
      },
      styleOption: {
        fontsize: [
          {
            text: '小',
            value: '16px'
          }, {
            text: '中',
            value: '20px',
          },
          {
            text: '大',
            value: '24px'
          }
        ],
        color: [
          '#ffffff',
          '#616e88',
          '#8BC34A',
          '#FF8F00',
          '#f48fb1',
          '#98867f'
        ]
      }
    }
  },
  components: {
    Barrage
  },
  mounted () {
    console.log(this.$data)
  },
  methods: {
    async addMessage () {
      if (this.posting) return
      this.posting = true;
      const message = {
        content: this.content,
        style: this.currentStyle
      }
      try {
        const res = await this.$request(MESSAGE_ADD, 'post', message)
        this.messageList.push(res.result)
        this.content = ''
      } catch (err) {
        console.log(err)
      } finally {
        this.posting = false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.message-wraper {
  position: relative;
  height: 100vh;
  width: 100vw;
  padding-top: 100px;
  box-sizing: border-box;
  background: #cddae2;
  position: relative;
  color: #fff;

  .input-box {
    position: absolute;
    left: 50%;
    bottom: 30px;
    display: flex;
    line-height: 40px;
    height: 40px;
    width: 400px;
    transform: translateX(-50%);
    border-radius: 4px;
    border: 1px solid #616e88;
    // background: #ffc64f;
    .select-btn {
      &:hover {
        .selection {
          display: block;
        }
        .inner-btn {
          color: #616e88;
        }
      }
      position: relative;
      height: 100%;
      cursor: pointer;
      .inner-btn {
        height: 100%;
        display: inline-block;
        text-align: center;
        padding: 0 10px;
        font-weight: bold;
      }
      .selection {
        position: absolute;
        width: 250px;
        bottom: 38px;
        left: 0;
        color: #616e88;
        padding: 10px;
        border-radius: 4px;
        display: none;
        box-shadow: 1px 1px 10px 1px #b7becc;
        > div {
          margin-bottom: 10px;
          .title {
          }
        }
        .font-size {
          .item {
            border-radius: 4px;
            display: inline-block;
            margin-right: 10px;
            width: 40px;
            line-height: 30px;
            text-align: center;

            // background: #fff;
            &.active {
              color: #fff;
              background: #616e88;
            }
          }
        }
        .color {
          .item {
            border-radius: 2px;
            width: 25px;
            height: 25px;
            box-sizing: border-box;
            display: inline-block;
            margin-right: 10px;
            border: 2px solid transparent;
            &.active {
              border-color: #263221;
              box-shadow: 0 0 1px 1px #fff;
            }
          }
        }
      }
    }
    input {
      flex: 1;
      background: transparent;
      height: 100%;
      color: #fff;
    }
    .submit-btn {
      padding: 0 15px;
      color: #fff;
      background: #616e88;
      border-radius: 0 4px 4px 0;
    }
  }
}
</style>