<template>
  <div class="module-container group-list" v-if="list && list.length">
    <header>归档</header>
    <div
      class="year-item"
      v-for="(group, index) in list.concat(list)"
      :key="index"
    >
      <div class="year">{{ group.year }}</div>
      <div class="month-list">
        <nuxt-link
          :to="`/article/group/${group.year}-${item.month}`"
          class="item"
          v-for="(item, mindex) in group.monthList"
          :key="mindex"
        >
          <span>{{ item.month }}月</span>
          <span>({{ item.articleList.length }})</span>
        </nuxt-link>
      </div>
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
.group-list {
  .year-item {
    margin-bottom: $sm-gap;
    &:last-child {
      margin-bottom: 0;
    }
    .year {
      padding: $xs-gap;
      color: $text-secondary;
    }
    .month-list {
      .item {
        display: inline-block;
        padding: $xs-gap;
        &.nuxt-link-active {
          color: $primary;
        }
      }
    }
  }
}
</style>