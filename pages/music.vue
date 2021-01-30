<template>
  <div class="music-wraper" v-if="currentSong">
    <div
      class="mask"
      :style="{ backgroundImage: 'url(' + currentSong.poster + ')' }"
    ></div>
    <div class="music-content">
      <div class="play-info">
        <div class="play-wraper">
          <button class="prev" @click="$musicPlayer().prev()">
            <i class="iconfont icon-music-prev"></i>
          </button>
          <circle-progress-bar :value="percent" :large="true">
            <div class="player-box">
              <img
                :src="currentSong.poster"
                alt=""
                :class="['poster', { playing: playing }]"
              />
              <button class="toggle-btn" @click="$musicPlayer().togglePlay()">
                <i class="iconfont icon-music-pause" v-if="playing"></i>
                <i class="iconfont icon-music-play" v-else></i>
              </button>
            </div>
          </circle-progress-bar>
          <button class="next" @click="$musicPlayer().next()">
            <i class="iconfont icon-music-next"></i>
          </button>
        </div>
        <progress-bar
          :value="percent"
          @change="handleProgressChange"
        ></progress-bar>
        <div class="song-info">
          <div class="title">{{ currentSong.name }}</div>
          <div class="singer">{{ currentSong.singer }}</div>
        </div>
        <div class="lyric-wraper" ref="lyricListDom">
          <div class="lyric-list">
            <div
              v-for="(item, index) in lyric.data"
              :key="index"
              @dblclick="setPlayTime(item.time)"
              :class="['item', { active: currentLyricIndex === index }]"
            >
              {{ item.value }}
            </div>
          </div>
          <div class="no-lyric" v-if="!lyric.data.length">纯音乐请欣赏</div>
        </div>
      </div>
      <div class="play-list">
        <div class="item title">
          <div class="name">歌曲</div>
          <div class="singer">歌手</div>
          <div class="time">时长</div>
        </div>
        <div
          v-for="(item, index) in list.data"
          :key="item.id"
          :class="['item', { active: item.id === currentSong.id }]"
          @click="$musicPlayer().playSong(index)"
        >
          <span class="name">{{ item.name }}</span>
          <span class="singer">{{ item.singer }}</span>
          <span class="time">{{ item.duration }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CircleProgressBar from "~/components/widget/circle-progress-bar";
import ProgressBar from "~/components/widget/progress-bar.vue";
import { mapGetters, mapState } from "vuex";
export default {
  // layout: 'music',
  name: "music",
  components: {
    CircleProgressBar,
    ProgressBar,
  },
  data() {
    return {
      lyricHeightArr: [],
    };
  },
  computed: {
    ...mapState("music", [
      "list",
      "lyric",
      "playing",
      "currentTime",
      "cachePercent",
      "currentLyricIndex",
    ]),
    ...mapGetters("music", ["currentSong", "percent"]),
  },
  methods: {
    handleProgressChange(value) {
      if (!this.currentSong) return;
      this.setPlayTime((value * this.currentSong.dt) / 1000);
    },
    setPlayTime(t) {
      this.$musicPlayer().setTime(t);
    },
  },
  watch: {
    "lyric.data"(list) {
      this.$nextTick(() => {
        let arr = [];
        let h = 0;
        const ps = this.$refs.lyricListDom.querySelectorAll(".item");
        for (let i = 0; i < ps.length; i++) {
          arr.push(h);
          h += ps[i].clientHeight;
        }
        this.lyricHeightArr = arr;
      });
    },
    currentLyricIndex(index) {
      this.$refs.lyricListDom.scrollTop = Math.max(
        0,
        this.lyricHeightArr[index] - 80
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.music-wraper {
  user-select: none;
  background: rgba(8, 8, 8, 0.2);
  color: #fff;
  padding: 2rem;
  position: relative;
  height: 100vh;
  box-sizing: border-box;
  padding-top: $mobile-header-height + $lg-gap + 2rem;
  .mask {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    -webkit-filter: blur(65px);
    filter: blur(65px);
  }
  .music-content {
    display: flex;
    justify-content: center;
    height: 100%;
    .play-info {
      width: 400px;
      height: 100%;
      display: flex;
      flex-direction: column;
      > div {
        margin-bottom: 20px;
      }
      .play-wraper {
        display: flex;
        align-items: center;
        justify-content: space-around;
        button {
          font-size: 3rem;
          color: rgba(255, 255, 255, 0.6);
          opacity: 0.8;
          & :hover {
            color: rgb(255, 255, 255);
          }
        }
        .player-box {
          position: relative;
          width: 100%;
          height: 100%;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            animation: rotation 26s linear infinite;
            animation-play-state: paused;
            &.playing {
              animation-play-state: running;
            }
          }
          .toggle-btn {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            padding: 5px;
          }
        }
      }
      .song-info {
        text-align: center;
        font-weight: bold;
      }
      .lyric-wraper {
        flex: 1;
        text-align: center;
        min-height: 200px;
        overflow: auto;
        .lyric-list {
          // transition: all ease-in-out 0.3s;
          .item {
            cursor: pointer;
            padding: 10px 0;
            color: #ccc;
            &:hover {
              color: #f5f5f5;
            }
            &.active {
              color: #fff;
            }
          }
        }
        .no-lyric {
          margin-top: 80px;
        }
      }
    }
    .play-list {
      flex: 1;
      margin-left: 30px;
      max-width: 600px;
      min-width: 400px;
      height: 100%;
      overflow: auto;
      .item {
        display: flex;
        align-items: center;
        padding: 10px 20px;
        .name {
          flex: 3;
        }
        .time,
        .singer {
          flex: 1;
          margin-left: 20px;
          @include text-overflow();
        }
        &:not(.title):hover {
          background: rgba(0, 0, 0, 0.1);
        }
        &.active {
          background: rgba(0, 0, 0, 0.2);
        }
      }
    }
  }
}
@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>