<template>
  <div v-cloak
       id="app"
       :class="theme">
    <!-- <no-ssr placeholder="Loading...">
      <div>只在客户端渲染</div>
    </no-ssr> -->
    <pc-main-view v-if="!isMobile"></pc-main-view>
    <mobile-main-view v-else></mobile-main-view>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import PcMainView from '~/components/layout/pc'
import MobileMainView from '~/components/layout/mobile'
export default {
  watchQuery: true,
  data () {
    return {
    }
  },
  computed: {
    theme () {
      return this.$store.state.global.theme
    },
    isMobile () {
      return this.$store.state.global.isMobile
    }
  },
  components: {
    PcMainView,
    MobileMainView
  },
  mounted () {

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
