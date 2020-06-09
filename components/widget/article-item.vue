<template>
  <div class="article-item">
    <div class="title">{{title}}</div>
    <div class="desc">{{desc}}</div>
    <div class="meta">
      <span class="date">
        {{moment(update_at).format(L)}}
      </span>
      <i class="iconfont">&#xe600;</i>
      <span></span>
      <i class="iconfont">&#xe600;</i>
      <span></span>
      <i class="iconfont">&#xe600;</i>
      <span></span>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
moment.locale("zh-cn")
export default {
  props: {
    title: String,
    desc: String,
    meta: Object,
    update_at: String
  }
}
</script>
<style lang="scss" scoped>
</style>