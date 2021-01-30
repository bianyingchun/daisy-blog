<template>
  <div class="module-container aside-nav">
    <div class="item active">
      <i class="iconfont icon-home"></i>
      <span v-text="$i18n.nav.home"></span>
    </div>
    <div class="item">
      <i class="iconfont icon-music"></i>
      <span v-text="$i18n.nav.code"></span>
    </div>
    <div class="item">
      <i class="iconfont icon-thinking"></i>
      <span v-text="$i18n.nav.think"></span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.aside-nav {
  width: $navbar-width;
  position: fixed;
  top: $header-height + $lg-gap;
  left: 0;
  bottom: 0;
  padding-left: 0;
  padding-right: 0;
  .item {
    padding: $gap;
    transition: $box-transition;
    .iconfont {
      margin-right: $gap;
    }
    &.active {
      border-right: 4px solid $primary;
      border-radius: 4px;
      background: $body-bg;
      color: $primary;
    }
    &:hover {
      background: $body-bg;
    }
  }
}
</style>