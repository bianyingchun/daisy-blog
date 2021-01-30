<template>
  <div class="page-box">
    <button type="button"
            :disabled="!prevEnable"
            @click="turnPage(currentPage-1)">
      <i class="iconfont icon-prev"></i></button>
    <button type="button"
            v-for="item in pages"
            :key="item"
            :class="{active:item===currentPage}"
            @click="turnPage(item)">{{item}}</button>
    <button type="button"
            :disabled="!nextEnable"
            @click="turnPage(currentPage+1)"><i class="iconfont icon-next"></i></button>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    totalPage: {
      type: Number,
      default: 1
    },
  },
  computed: {
    pages () {
      let list = []
      for (let i = 1; i <= this.totalPage; i++) {
        list.push(i)
      }
      return list
    },
    prevEnable () {
      return this.currentPage > 1
    },
    nextEnable () {
      return this.currentPage < this.totalPage
    },
  },
  methods: {
    turnPage (index) {
      this.$emit('changePage', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-box {
  display: flex;
  align-items: center;
  justify-content: center;
  span,
  button {
    display: inline-block;
    border-radius: 4px;
    line-height: 2.5rem;
    width: 2.5rem;
    text-align: center;
    height: 2.5rem;
    margin-right: $gap;
    background-color: $module-bg;
    @include background-transition();
    &:hover,
    &.active {
      background-color: $module-hover-bg-opacity-9;
    }
    &:disabled {
      opacity: 0.6;
    }
  }
}
</style>