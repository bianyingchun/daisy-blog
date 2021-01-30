<template>
  <div class="tag-list module-container">
    <no-data v-if="!list.length">
      <p>{{ $i18n.text.tag.empty }}</p>
    </no-data>
    <div class="list" v-else>
      <nuxt-link
        v-for="(tag, index) in list"
        :key="index"
        tag="li"
        class="mini-module-container item"
        :to="`/tag/${tag._id}`"
        :title="tag.title"
      >
        <span class="name">{{ tag.name }}</span>
        <span class="count">{{ tag.count }}</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: Array,
  },
};
</script>

<style lang="scss" scoped>
.tag-list {
  .list {
    .item {
      display: inline-block;
      padding: $sm-gap;
      color: $primary;
      box-shadow: 0 0 1px 0 $primary;
      background: $body-bg;
      margin: $xs-gap;
      cursor: pointer;
      &.nuxt-link-active {
        background: $primary;
        color: $text-reversal;
      }
      &:hover {
        background: $module-hover-bg-darken-40;
        color: $text-reversal;
      }
    }
  }
}
</style>