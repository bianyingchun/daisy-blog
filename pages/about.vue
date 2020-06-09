<template>
  <div class="pink">
    <no-ssr>
      <div v-highlight
           v-html="content"
           class="markdown">
      </div>
    </no-ssr>
  </div>
</template>

<script>
import marked from 'marked'

export default {
  name: "height",
  data () {
    return {
      code: '很好喝\n```javascript\nfunction(){\n\tconsole.log(123)\n}\n```'
    }
  },
  created () {
    let markdownContent = this.code;
    this.content = marked(markdownContent)
  },
  mounted () {

  },
}
</script>
<style lang="scss" scoped>
@import "~/assets/style/markdown.scss";
</style>
