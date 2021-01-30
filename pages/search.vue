<template>
  <article-list :article="article"
                @loadmore="loadMoreArticle"></article-list>
</template>

<script>
import ArticleList from '~/components/archive/list'
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  async fetch ({ params, store, query }) {
    const keywords = query.keywords;
    console.log(keywords)
    await store.dispatch('article/refreshList', { keywords })
  },
  validate ({ query }) {
    return !!query.keywords;
  },
  components: {
    ArticleList
  },
  computed: {
    ...mapState('article', {
      article: state => state.list
    })
  },
  mounted () {
    this.updateHistory(this.$route.query.keywords)
  },
  methods: {
    ...mapActions('article', ['fetchList']),
    ...mapMutations('search', ['updateHistory']),
    loadMoreArticle () {
      this.fetchList({ keywords: this.$route.query.keywords })
    }
  },
  watchQuery: ['keywords']
}
</script>

<style>
</style>