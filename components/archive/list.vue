<template>
  <div>
    <div class="article-list">
      <transition name="module"
                  mode="out-in">
        <transition-group v-if="article.data && article.data.length"
                          key="list"
                          name="fade">
          <article-item v-for="item in article.data"
                        :key="item._id"
                        :article="item"></article-item>
        </transition-group>
        <no-data v-else
                 key="empty"></no-data>
      </transition>
    </div>
    <div class="article-load">
      <loading v-if="article.fetching" />
      <div class="load-more"
           v-if="article.hasMore"
           @click="$emit('loadmore')"> 加载更多</div>
      <no-more v-else></no-more>
    </div>
  </div>
</template>

<script>
import articleItem from "./item"
export default {
  props: {
    article: Object,
  },
  components: {
    articleItem
  },
  mounted () {

  }
}
</script>

<style>
</style>