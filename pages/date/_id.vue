<template>
  <article-list :article="article"
                @loadmore="loadMoreArticle"></article-list>
</template>

<script>
import ArticleList from '~/components/archive/list'
import { mapState, mapActions } from 'vuex'
export default {

  async fetch ({ params, store }) {
    const date = params.id;
    await store.dispatch('article/refreshList', { date })
  },
  validate ({ params, store }) {
    return new Date(params.id).toString() !== 'invalid Date';
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
      this.fetchList({ date: this.$route.params.id })
    }
  },
}
</script>

<style>
</style>