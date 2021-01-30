<template>
  <div class="module-container article-list-item">
    <nuxt-link :to="`/article/${article._id}`"
               class="item-content">

      <div class="body">
        <h4 class="title">
          {{article.title}}
        </h4>
        <div class="desc">{{article.desc}}</div>
        <div class="meta">
          <span :class="['article-type', articleType]">{{$i18n.text.origin[articleType]}}</span>
          <span class="views">
            <i class="iconfont icon-eye"></i>
            <span>{{article.meta.views}}</span>
          </span>
          <span class="comment">
            <i class="iconfont icon-comment"></i>
            <span>{{article.meta.comments}}</span>
          </span>
          <span class="views">
            <i class="iconfont icon-like"></i>
            <span>{{article.meta.likes}}</span>
          </span>
          <span class="date">
            <!-- <i class="iconfont icon-clock"></i> -->
            <span>{{article.create_at|dateFormat}}</span>
          </span>
        </div>
      </div>
      <div class="thumb">
        <img class="item-thumb-img"
             v-lazy="article.thumb || mockSrc" />
      </div>
    </nuxt-link>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    article: Object
  },
  data () {
    return {
      isLiked: false,
      mockSrc: 'https://images.uiiiuiii.com/wp-content/uploads/2020/06/i-ui-200617-3-7.jpg'
    }
  },
  computed: {
    ...mapState('global', [
      'constants',
      'language',
      'isMobile'
    ]),
    isEnLang () {
      return this.$store.getters['global/isEnLang']
    },
    articleType () {
      if (!this.article.origin) {
        return 'original'
      }
      if (this.article.origin === constants.OriginState.Reprint) {
        return 'reprint'
      }
      if (!this.article.origin === constants.OriginState.Hybrid) {
        return 'hybrid'
      }
      return 'original'
    },
  },
}
</script>
<style lang="scss" scoped>
.article-list-item {
  margin-bottom: $lg-gap;
  &:last-child {
    margin: 0;
  }
  .item-content {
    display: flex;
    overflow: hidden;
    align-items: center;
    .body {
      margin-right: $lg-gap;
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      align-self: stretch;
      .title {
        font-weight: bold;
        @include text-overflow();
      }
      .desc {
        margin: $sm-gap 0;
        flex: 1;
        line-height: 1.8em;
        @include clamp(3);
      }
      .meta {
        height: 2em;
        line-height: 2em;
        display: flex;
        align-items: center;
        overflow: hidden;
        font-size: $font-size-small;
        color: $text-secondary;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-wrap: normal;
        > span {
          margin-right: $lg-gap;
        }
        .article-type {
          color: $text-reversal;
          padding: 0 $xs-gap;
          border-radius: 4px;
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
        > .likes {
          .liked {
            color: $red;
          }
        }
      }
    }
    .thumb {
      position: relative;
      height: 100px;
      width: 150px;
      overflow: hidden;
      border-radius: $radius/2;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all ease-in-out $transition-time-normal;
        transform-origin: center center;
      }
    }
  }
  &:hover {
    transition: all ease-in-out 0.4s;
    transform: translate(2px, -2px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  }
}
</style>