<template>
  <div id="app-main">
    <no-ssr>
      <figure class="widget">
        <background />
        <wallflower />
        <!-- <barrage/> -->
        <wallpaper-switch />
        <transition name="fade">
          <wallpaper-wall></wallpaper-wall>
        </transition>
      </figure>
    </no-ssr>
    <header-view></header-view>
    <main>
      <nav-view></nav-view>
      <aside-view></aside-view>
      <nuxt :nuxtChildKey="$route.name"
            keep-alive></nuxt>
    </main>
    <footer-view></footer-view>
  </div>
</template>

<script>
import HeaderView from './header'
import FooterView from './footer'
import NavView from './nav'
import AsideView from './aside'
import Background from '~/components/widget/background'
import Wallflower from '~/components/widget/wallflower/garden'
// import Barrage from '~/components/widget/barrage/index'
import WallpaperSwitch from '~/components/widget/wallpaper/switch'
import wallpaperWall from '~/components/widget/wallpaper/wall'
export default {
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
    Wallflower,
    wallpaperWall
  }
}
</script>

<style>
</style>