<template>
  <div>
    <h3>article</h3>
  </div>
</template>

<script>
export default {
  async fetch ({ store }) {
    console.log('fetch article')
    // await store.dispatch('tag/fetchList')
  },
  created () {

  },
  data () {
    return {
      currentPage: 1,
    }
  },
  async mounted () {
    // await this.$request('/article/getAll', 'get')// Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}
  }

}
</script>

<style lang="scss"scoped>
</style>