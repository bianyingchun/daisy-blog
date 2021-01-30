<template>
  <div :class="['header', {'transparent':isMusicPage}]">
    <nuxt-link to="/"
               class="header-link"
               :title="$i18n.text.slogan">
      {{$i18n.text.slogan}}
    </nuxt-link>
    <search />
    <mini-player class="player" />
  </div>
</template>

<script>
import Search from './search'
import MiniPlayer from '~/components/widget/mini-player'
export default {
  components: {
    MiniPlayer,
    Search
  },
  methods: {
    play () {
      this.$musicPlayer().play();
    },
    pause () {
      this.$musicPlayer().pause();
    }
  },
  computed: {
    isMusicPage () {
      return this.$route.name === 'music';
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: $header-height;
  z-index: $z-index-header;
  background-color: $body-bg;
  box-shadow: 0 1px 8px 0px #eeeeee;
  padding: 0 $box-padding;
  display: flex;
  align-items: center;
  &.transparent {
    background-color: rgba(255, 255, 255, 0.1);
  }
  .header-link {
    color: $primary;
    margin-right: $lg-gap;
  }
  .player {
    margin-left: auto;
  }
}
</style>