<template>
  <div id="aside">
    <hot-article-list :list="articles" />
    <calendar />
    <group-list :list="groups" />
    <div :class="['navs', { fixed: fixedBlock }]" ref="navs">
      <tag-list :list="tags"></tag-list>
      <div class="aside-tools">
        <div class="full-cloumn" @click="handleSetFullColumn">
          <span class="iconfont icon-read"></span>
          <span class="text">{{ $i18n.text.article.fullcolread }}</span>
        </div>
        <div class="full-page" @click="handleFullScreen">
          <span class="iconfont icon-fullscreen"></span>
          <span class="text">{{ $i18n.text.article.fullscreenread }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Calendar from "./calendar";
import TagList from "./tag-list";
import GroupList from "./group-list";
import HotArticleList from "./hot-article-list";
import { mapState, mapGetters } from "vuex";
import { fullScreen, exitFullscreen } from "~/util";
export default {
  data() {
    return {
      fixedBlock: false,
    };
  },
  components: {
    Calendar,
    TagList,
    HotArticleList,
    GroupList,
  },
  computed: {
    ...mapGetters("global", ["isEnLang"]),
    ...mapState({
      groups: (state) => state.article.groupList,
      tags: (state) => state.tag.data,
      articles: (state) => state.article.hotList.data,
      language: (state) => state.global.language,
    }),
    isArticlePage() {
      return this.$route.name === "article";
    },
  },
  mounted() {
    this.viewHeight =
      document.documentElement.clientHeight || document.body.clientHeight;
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    this.fixedTop = this.$refs.navs.getBoundingClientRect().top + scrollTop;
    window.addEventListener("scroll", this.listenScroll);
  },
  methods: {
    listenScroll() {
      const top = document.documentElement.scrollTop || document.body.scrollTop;
      this.fixedBlock = top > this.fixedTop;
    },
    handleSetFullColumn() {
      this.$store.commit("global/updateThreeColumnsState", true);
    },
    handleFullScreen() {
      this.handleSetFullColumn();
      fullScreen();
    },
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.listenScroll);
  },
};
</script>

<style lang="scss" scoped>
#aside {
  width: $aside-width;
  margin-left: $lg-gap;
  flex-shrink: 0;
  flex-grow: 0;
  > div {
    margin-bottom: $lg-gap;
  }
  .navs {
    .aside-tools {
      // display: flex;
      display: none;
      margin-top: $lg-gap;
      justify-content: space-between;
      > div {
        background-color: $module-bg;
        height: 3rem;
        line-height: 3rem;
        @include background-transition();
        cursor: pointer;
        padding: 0 10px;
        &:hover {
          background-color: $module-hover-bg;
        }
      }
    }
    &.fixed {
      position: fixed;
      width: $aside-width;
      top: $header-height;
    }
  }
}
</style>