<template>
  <div class="article-page">
    <div class="module-container detail">
      <transition name="module" mode="out-in">
        <div v-if="isFetching" key="skeleton" class="skeleton">
          <no-ssr>
            <skeleton-line class="title" />
            <skeleton-paragraph
              class="content"
              :lines="9"
              line-height="1.2em"
            />
          </no-ssr>
        </div>
        <div key="article-container" class="article-container" v-else>
          <div :class="['article-type', articleType]">
            {{ $i18n.text.origin[articleType] }}
          </div>
          <div class="konwledge">
            <h2 class="title">{{ article.title }}</h2>
            <div v-html="articleContent" class="markdown"></div>
          </div>
        </div>
      </transition>
    </div>
    <comment-box :post-id="article._id"></comment-box>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import marked from "~/plugins/marked";
import CommentBox from "~/components/widget/comment/index.vue";
export default {
  async fetch({ store, params, error }) {
    const id = params.id;
    try {
      const ps = [];
      await Promise.all([
        store.dispatch("article/fetchDetail", id),
        store.dispatch("comment/getCommentList", { post_id: id, sort: 2 }),
      ]);
    } catch (err) {
      error({ statusCode: 404 });
    }
  },
  data() {
    return {};
  },
  created() {},
  components: {
    CommentBox,
  },
  computed: {
    ...mapState({
      constants: (state) => state.global.constants,
      language: (state) => state.global.language,
      tags: (state) => state.tag.data,
      article: (state) => state.article.detail.data,
      isFetching: (state) => state.article.detail.fetching,
      isMobile: (state) => state.global.isMobile,
    }),
    ...mapGetters("global", ["isEnLang"]),
    articleType() {
      if (!this.article.origin) {
        return "original";
      }
      if (this.article.origin === constants.OriginState.Reprint) {
        return "reprint";
      }
      if (!this.article.origin === constants.OriginState.Hybrid) {
        return "hybrid";
      }
      return "original";
    },
    articleContent() {
      return marked(
        this.article.content +
          "很好喝\n```javascript\nfunction () { \n\t console.log(123)\n }\n```" +
          "\n![RUNOOB 图标](http://static.runoob.com/images/runoob-logo.png)\n" +
          "\n这是一个链接 [菜鸟教程](https://www.runoob.com)\n"
      );
    },
  },
};
</script>

<style lang='scss'>
@import "~/assets/style/code.css";
@import "~/assets/style/markdown.scss";
.article-page {
  .detail {
    padding: 1rem 2rem;
    position: relative;
    overflow: hidden;
    margin-bottom: $lg-gap;
    .article-type {
      position: absolute;
      top: 0;
      left: 0;
      transform: translate(-50%, -50%) rotate(-45deg);
      width: 7rem;
      height: 7rem;
      line-height: 12rem;
      text-align: center;
      text-transform: uppercase;
      transform-origin: center;
      color: $text-reversal;
      font-weight: bold;
      font-size: $font-size-small;
      &.original {
        background-color: $bg-green;
      }
      &.hybird {
        background-color: $bg-pink;
      }
      &.reprint {
        background-color: $bg-yellow;
      }
    }
    .konwledge {
      > .title {
        margin: 1em 0 1.5em 0;
        text-align: center;
        font-weight: 700;
        font-size: $font-size-h2 * 0.95;
      }
    }
  }
}
</style>