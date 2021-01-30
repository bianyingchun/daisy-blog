<template>
  <article-list :article="article"></article-list>
</template>

<script>
import ArticleList from '~/components/archive/list'
export default {
  async asyncData ({ params, store }) {
    const [year, month] = params.id.split('-').map(item => Number(item))
    let data = []
    let yearItem = store.state.article.groupList.find(item => item.year === year);
    if (yearItem) {
      let monthItem = yearItem.monthList.find(item => item.month === month);
      if (monthItem) {
        data = monthItem.articleList
      }
    }
    return {
      article: {
        data
      }
    }

  },
  components: {
    ArticleList
  },
  validate ({ params, store }) {
    return !!params.id;
  }
}
</script>

<style>
</style>