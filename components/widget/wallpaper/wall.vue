<template>
  <div class="wallpaper-wall">
    <div class="wall-box">
      <div class="pic-box" v-lazy:background-image="currentWallpaperUrl"></div>
      <div class="story-box">
        <div class="content" v-if="currentPaper">
          <div class="tools">
            <button
              type="button"
              :disabled="!prevEnable"
              title="上一张"
              @click="currentIndex--"
            >
              <i class="iconfont icon-prev"> </i>
            </button>
            <button
              type="button"
              :disabled="!nextEnable"
              title="下一张"
              @click="currentIndex++"
            >
              <i class="iconfont icon-next"></i>
            </button>
            <button type="button" @click="close()">
              <i class="iconfont icon-cancel"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
    };
  },
  created() {},
  methods: {
    close() {
      this.$store.commit("global/toggleUpdateWallpaperOnState", false);
    },
  },
  computed: {
    wallpapers() {
      return this.$store.state.wallpaper.papers;
    },
    currentWallpaperUrl() {
      return this.currentPaper
        ? "http://www.bing.com" + this.currentPaper.url
        : "";
    },
    prevEnable() {
      return this.currentIndex > 0;
    },
    nextEnable() {
      return this.wallpapers
        ? this.currentIndex < this.wallpapers.length - 1
        : false;
    },
    currentPaper() {
      return (
        this.wallpapers &&
        this.wallpapers.length &&
        this.wallpapers[this.currentIndex]
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.wallpaper-wall {
  position: fixed;
  display: flex;
  z-index: $z-index-top;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  @include backdrop-blur();
  .wall-box {
    position: relative;
    width: 100vw;
    height: 100vh;
    .pic-box {
      overflow: hidden;
      width: 100%;
      height: 100%;
      background-color: #666;
      background-repeat: no-repeat;
      background-size: cover;
      transition: linear 0.4s;
    }
    .story-box {
      position: absolute;
      padding: 2rem 4rem;
      bottom: 0;
      left: 0;
      width: 100%;
      .tools {
        float: right;
        button {
          display: inline-block;
          border: 2px solid #fff;
          width: 40px;
          text-align: center;
          height: 40px;
          line-height: 36px;
          margin-right: 10px;
          border-radius: $radius;
          background: rgba(255, 255, 255, 0.8);
          @include background-transition();
          &:hover {
            background-color: #fff;
          }
          &[disabled] {
            opacity: 0.7;
          }
        }
      }
    }
  }
}
</style>