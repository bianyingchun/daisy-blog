<template>
  <div id="app-main" :class="{ 'full-view': isFullView }">
    <no-ssr>
      <figure class="widget" v-if="!isFullView">
        <background />
        <wallpaper-switch />
        <transition name="fade">
          <wallpaper-wall v-if="onWallpaper"></wallpaper-wall>
        </transition>
      </figure>
    </no-ssr>
    <header-view></header-view>
    <main :class="['container', { 'full-view': isFullView }]">
      <nav-view v-if="!isThreeColumns && !isFullView"></nav-view>
      <div
        class="content"
        :class="{
          'two-column': isTwoColumns,
          'three-column': isThreeColumns,
          'full-view': isFullView,
        }"
      >
        <nuxt :nuxtChildKey="$route.fullPath"></nuxt>
      </div>
      <aside-view
        v-if="!isTwoColumns && !isThreeColumns && !isFullView"
      ></aside-view>
    </main>
    <footer-view></footer-view>
  </div>
</template>

<script>
import HeaderView from "./header/index";
import FooterView from "./footer";
import NavView from "./nav";
import AsideView from "./aside";
import Background from "~/components/widget/background";
import WallpaperSwitch from "~/components/widget/wallpaper/switch";
import wallpaperWall from "~/components/widget/wallpaper/wall";
import { mapState } from "vuex";
export default {
  created() {
    this.$store.dispatch("wallpaper/fetchPapers");
  },
  computed: {
    ...mapState("global", ["onWallpaper", "isTwoColumns", "isThreeColumns"]),
    isFullView() {
      return ["music", "message", "project"].indexOf(this.$route.name) !== -1;
    },
  },
  mounted() {
    this.$musicPlayer().init();
  },
  components: {
    //   布局
    HeaderView,
    FooterView,
    NavView,
    AsideView,
    // 部件/开关
    WallpaperSwitch,
    // 实体
    Background,
    wallpaperWall,
  },
};
</script>

<style lang="scss" scoped>
#app-main {
  padding: $lg-gap;
  padding-top: $header-height + $lg-gap;
  &.full-view {
    padding: 0;
  }
  .container {
    position: relative;
    display: flex;
    justify-content: space-between;
    &.full-view {
      width: 100%;
    }
    .content {
      flex: 1;
      position: relative;
      // overflow: hidden;
      min-width: $main-width;
      margin-left: $navbar-width;
      &:-moz-full-screen {
        overflow-y: auto;
      }

      &:-webkit-full-screen {
        overflow-y: auto;
      }

      &:fullscreen {
        overflow-y: auto;
      }

      &.two-column {
        flex-grow: 1;
      }

      &.three-column {
        width: 100%;
        margin: 0;
      }

      &.full-view {
        width: 100%;
        margin: -$lg-gap 0;
      }
    }
  }
}
</style>