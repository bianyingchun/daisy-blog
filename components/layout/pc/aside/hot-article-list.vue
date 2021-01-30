<template>
  <div class="module-container hot-article">
    <header class="title">
      <i class="iconfont icon-hotfill" />
      <span>{{$i18n.text.article.hotlist}}</span>
    </header>
    <no-data v-if="!list.length">
      <p>{{ $i18n.text.article.empty }}</p>
    </no-data>
    <div class="list"
         v-else>
      <div class="item"
           v-for="item in list"
           :key="item._id">
        <span class="index">
          <nuxt-link class="title"
                     :to="`/article/${item._id}`"
                     :title="`${item.title} - 「 ${item.meta.comments} ${$i18n.text.comment.count} | ${item.meta.likes} ${$i18n.text.comment.like} 」`">
            <span v-text="item.title" />
          </nuxt-link>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    list: Array
  }
}
</script>
<style lang="scss" scoped>
.hot-article {
  .list {
    .item {
      margin-bottom: $gap;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>