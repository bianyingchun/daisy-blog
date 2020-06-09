<template>
  <div id="app-main">
      <no-ssr>
          <figure class="widget">
              <background/>
              <wallflower/>
              <!-- <barrage/> -->
              <wallpaper-switch />
          </figure>
      </no-ssr>
      <header-view></header-view>
      <main>
          <nav-view></nav-view>
          <aside-view></aside-view>
      </main>
      <footer-view></footer-view>
  </div>
</template>

<script>
import HeaderView from './header'
import FooterView from './footer'
import NavView from './nav'
import AsideView from './aside/main'
import Background from '~/components/widget/background'
import Wallflower from '~/components/widget/wallflower/garden'
// import Barrage from '~/components/widget/barrage/main'
import WallpaperSwitch from '~/components/widget/wallpaper/switch'
export default {
    components:{
        HeaderView,
        FooterView,
        NavView,
        AsideView,
        Background,
        Wallflower,
        WallpaperSwitch
        // Barrage
    }
}
</script>

<style>

</style>