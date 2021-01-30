<template>
  <article-list :article="article"
                @loadmore="loadMoreArticle">

  </article-list>
</template>

<script>
import ArticleList from '~/components/archive/list'

import { mapState, mapActions } from 'vuex'
export default {
  name: 'tagArticleList',
  async fetch ({ params, store }) {
    let id = params._id;
    await store.dispatch('article/refreshList', { tag: params.id })
  },
  validate ({ params, store }) {
    return params.id && store.state.tag.data.some(item => item._id === params.id);
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
    ...mapActions('article', ['fetchList']),
    loadMoreArticle () {
      this.fetchList({ tag: this.$route.params.id })
    }
  },
}
</script>

<style>
</style>