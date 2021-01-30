<template>
  <div class="comment-item">
    <img v-lazy="author.gavatar || 'http://p3.music.126.net/qXoj3GTwWWtDDETq72oovQ==/109951164107576105.jpg'"
         alt=""
         class="avatar">
    <div class="text">
      <div class="info">
        <span class="name">{{author.name}}</span>
        <comment-ua :ua="agent"
                    v-if="agent" />
        <span class="location">
          {{country}}-{{city}}
        </span>
      </div>
      <div class="content">{{content}}</div>
      <div class="op">
        <span class="date">{{create_at|dateFormat}}</span>
        <span @click="likeComment(_id)">赞 [{{likes}}]</span>
        <span @click="showReplyBox(author)">回复</span>
      </div>
      <div class="reply-list"
           v-if="replies && replies.list">
        <reply-item v-for="(item, index) in replies.list"
                    :key="item._id"
                    v-bind="item"
                    @reply="showReplyBox"
                    @like="likeReply({cid:_id, rindex:index, id:item._id})">

        </reply-item>
      </div>
      <page-box :currentPage="replies.pagination.current_page"
                :totalPage="replies.pagination.total_page"
                @changePage="updatePage"
                v-if="replies.pagination && replies.pagination.total_page > 1"
                class="page-box"></page-box>
      <reply-box v-if="showReplyBoxFlag"
                 @close="hideReplyBox"
                 @submit="handleAddReply"
                 :placeholder="'回复'+replyTarget.name"></reply-box>
    </div>
  </div>
</template>

<script>
import PageBox from '../page-box';
import CommentUa from './ua'
import ReplyBox from './pen'
import ReplyItem from './reply-item'
import { mapActions, mapGetters } from 'vuex';
// import gravatar from '~/util/gravatar';
export default {
  props: {
    author: {
      type: Object,
      default: function () {
        return {
          gavatar: 'http://p3.music.126.net/qXoj3GTwWWtDDETq72oovQ==/109951164107576105.jpg',
          name: '匿名用户',
          email: ''
        }
      }
    },
    _id: String,
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
    post_id: String,
    agent: String,
    replies: Object,
    likes: Number,
    create_at: String,
  },
  data () {
    return {
      replyTarget: null,
      showReplyBoxFlag: false,
    }
  },
  computed: {
    ...mapGetters('comment', ['isLiked'])
  },
  components: {
    CommentUa,
    ReplyBox,
    ReplyItem,
    PageBox
  },
  methods: {
    ...mapActions('comment', ['addReply', 'likeReply', 'likeComment', 'getReply']),
    showReplyBox (replyTarget) {
      this.replyTarget = replyTarget;
      this.showReplyBoxFlag = true
    },
    hideReplyBox () {
      this.replyTarget = null;
      this.showReplyBoxFlag = false;
    },
    async handleAddReply (info) {
      const { content, author } = info;
      await this.addReply({
        content,
        from: author,
        post_id: this.post_id,
        to: this.replyTarget,
        cid: this._id
      });
      this.hideReplyBox()
    },
    async updatePage (page) {
      await this.getReply({ cid: this._id, current_page: page })
    }
  },
  created () {
    // console.log(gravatar('bianyc7@163.com'))
  }
}
</script>

<style lang="scss" scoped>
.comment-item {
  display: flex;
  padding: $gap 0;
  border-bottom: $border;
  img {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 3.5rem;
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
  .page-box {
    transform-origin: top left;
    transform: scale(0.85);
  }
}
</style>