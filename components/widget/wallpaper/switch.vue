<template>
  <div
    class="wallpaper-switch"
    :class="{ dark: isDarkTheme }"
    @click="onWallpaper"
  >
    <div class="up">
      <span class="title" :class="language">{{ $i18n.text.wallpaper }}</span>
    </div>
    <div class="down"></div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("global", ["isDarkTheme"]),
    ...mapState("global", ["language"]),
    ...mapState("wallpaper", ["papers"]),
  },
  methods: {
    onWallpaper() {
      if (this.papers) {
        this.$store.commit("global/toggleUpdateWallpaperOnState", true);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wallpaper-switch {
  position: fixed;
  left: 0;
  bottom: 20%;
  cursor: pointer;
  $offset: 6px;
  width: 4rem;
  height: 8rem;
  opacity: 0.6;
  transform: translateX(-$offset * 2);
  z-index: 100;
  &.dark {
    .up .title {
      color: $text-reversal;
    }
  }
  &:hover {
    opacity: 0.8;
    transform: translateX(-$offset);
    transition: all $transition-time-fast;
  }
  .up,
  .down {
    width: 3rem;
    height: 6.8rem;
    position: absolute;
  }
  .down {
    top: 0;
    left: $offset;
    z-index: $z-index-normal + 1;
    background-color: $primary;
    animation: wallpaper-y 1.5s 0.75s infinite;
  }
  .up {
    top: 0;
    left: 0;
    z-index: $z-index-normal + 2;
    background-color: $yellow;
    animation: wallpaper-y 1.5s 0s infinite;
    .title {
      display: block;
      width: 100%;
      height: 100%;
      line-height: 2rem;
      writing-mode: tb-rl;
      color: $primary;
      text-align: center;
      font-weight: bold;
      letter-spacing: 0px;
    }
  }
  @keyframes wallpaper-y {
    0% {
      transform: translateY(-$offset);
    }
    50% {
      transform: translateY($offset);
    }
    100% {
      transform: translateY(-$offset);
    }
  }
}
</style>