<template>
  <div class="index-page">
    <article-list :article="article"
                  @loadmore="fetchList"></article-list>
  </div>
</template>

<script>

import ArticleList from "~/components/archive/list"
import { mapState, mapActions } from 'vuex'
export default {
  async fetch ({ store }) {
    await store.dispatch('article/refreshList')
  },
  components: {
    ArticleList
  },
  computed: {
    ...mapState('article', {
      article: state => state.list
    })
  },
  methods: {
    ...mapActions('article', ['fetchList'])
  }
}
</script>

<style>
</style>