<template>
  <div v-cloak id="app" :class="theme">
      <no-ssr placeholder="Loading...">
          <div>只在客户端渲染</div>
          <!-- <emoji-rain></emoji-rain> -->
      </no-ssr>
      <pc-main-view  v-if="!isMobile"></pc-main-view>
      <mobile-main-view v-else></mobile-main-view>
  </div>
</template>

<script>
import { mapMutations, mapGetters} from 'vuex'
// import EmojiRain from '~/components/widget/emoji-rain.vue'
import PcMainView from '~/components/layout/pc/main.vue'
import MobileMainView from '~/components/layout/mobile/main.vue'
export default {
    data() {
        return {
        }
    },
    computed:{
      ...mapGetters('global',['theme','isMobile'])
    },
    components:{
      // EmojiRain,表情雨插件，用处不大，舍弃
      PcMainView,
      MobileMainView
    }
}
</script>

<style lang="scss" scoped>
  #app {
    color: $text;
    &[v-cloak] {
      color: transparent;
      -webkit-text-fill-color: transparent;
    }
  }
</style>
