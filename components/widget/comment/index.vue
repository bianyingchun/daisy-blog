<template>
  <div class="module-container comment-box">
    <pen @submit="handleSubmit" />
    <div class="tools">
      <div class="count">
        <span>
          共 {{pagination.total}} 条评论
        </span>
      </div>
      <div class="sort">
        <span v-for="item in sortList"
              :key="item.val"
              :class="{active:item.val===sort}"
              @click="sort=item.val">{{$i18n.text.comment[item.text]}}</span>
      </div>
    </div>
    <div class="comment-list">
      <comment-item v-for="item in commentList"
                    :key="item._id"
                    v-bind="item" />
    </div>
    <page-box :currentPage="pagination.current_page"
              :totalPage="pagination.total_page"
              @changePage="updatePage"
              v-if="pagination.total_page > 1"
              class="page-list"></page-box>

  </div>
</template>
<script>
import PageBox from '../page-box';
import Pen from './pen'
import CommentItem from './item';
import { mapState, mapActions } from 'vuex';
export default {
  props: {
    postId: String
  },
  data () {
    return {
      sort: 2,
      sortList: [{
        val: -1,
        text: 'new'
      }, {
        val: 2,
        text: 'hot'
      }]
    }
  },
  components: {
    PageBox,
    CommentItem,
    Pen
  },
  computed: {
    ...mapState('comment', {
      commentList: state => state.list,
      pagination: state => state.pagination
    })
  },
  methods: {
    ...mapActions('comment', ['getCommentList', 'addComment']),
    async updatePage (page) {
      await this.getCommentList({ post_id: this.postId, current_page: page, sort: this.sort });
    },
    async handleSubmit (info) {
      const { content, author } = info;
      const params = {
        post_id: this.postId,
        content,
        author
      }
      await this.addComment(params)
    },
  },
  watch: {
    async sort (val, oldval) {
      if (val === oldval) return;
      await this.getCommentList({ post_id: this.postId, sort: val });
    }
  }
}
</script>
<style lang="scss" scoped>
.comment-box {
  .tools {
    margin: $lg-gap * 2 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .sort {
    span {
      margin-right: $gap;
      &.active {
        color: $primary;
      }
    }
  }
}
.page-list {
  margin: $lg-gap 0;
}
</style>