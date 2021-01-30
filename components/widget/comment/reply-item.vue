<template>
  <div class="reply-item">
    <img v-lazy="from.gavatar || 'http://p3.music.126.net/qXoj3GTwWWtDDETq72oovQ==/109951164107576105.jpg'"
         alt=""
         class="avatar">
    <div class="text">
      <div class="info">
        <span class="name">{{from.name}}</span>
        <comment-ua :ua="agent"
                    v-if="agent" />
        <span class="location">
          {{country}}-{{city}}
        </span>
      </div>
      <div class="content">回复 <span class="username">{{to.name}} </span>: {{content}}</div>
      <div class="op">
        <span class="date">{{create_at|dateFormat}}</span>
        <span @click="$emit('like')">赞 [{{likes}}]</span>
        <span @click="reply">回复</span>
      </div>
    </div>
  </div>
</template>

<script>
import CommentUa from './ua'
export default {
  props: {
    from: {
      type: Object,
      default: function () {
        return {
          gavatar: 'http://static.runoob.com/images/runoob-logo.png',
          name: '匿名用户',
          email: ''
        }
      }
    },
    content: {
      type: String,
      default: '我觉得生活还是实在的比较好，每天不停的恭维别人就好在舔别人的脚趾，我希望实现人生自由，每天可以做我喜欢的的事'
    },
    city: {
      type: String,
      default: '上海'
    },
    country: {
      type: String,
      default: '中国'
    },
    agent: String,
    to: Object,
    likes: Number,
    create_at: String
  },
  data () {
    return {}
  },
  computed: {

  },
  components: {
    CommentUa,
  },
  methods: {
    reply () {
      this.$emit('reply', this.from)
    }
  }
}
</script>

<style lang="scss" scoped>
.reply-item {
  display: flex;
  padding: $gap 0;
  img {
    width: 2.8rem;
    height: 2.8rem;
    border-radius: 2.8rem;
  }
  .text {
    flex: 1;
    margin-left: $gap;
    .info {
      .name {
        font-weight: bold;
      }
    }
    .content {
      margin: $gap 0;
      .username {
        color: $primary;
      }
    }
    .op {
      display: flex;
      align-items: center;
      span {
        margin-right: $gap;
        &.date {
          margin-right: auto;
        }
      }
    }
  }
}
</style>