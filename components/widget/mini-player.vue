<template>
  <div class="wraper" v-if="currentSong">
    <div class="controls">
      <button class="prev" @click="$musicPlayer().prev()">
        <i class="iconfont icon-music-prev"></i>
      </button>
      <circle-progress-bar :value="percent">
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
    <nuxt-link class="music-info" to="/music">
      <div class="name">{{ currentSong.name }}</div>
      <div class="lyric">
        {{
          playing
            ? currentLyric.value || currentSong.singer
            : currentSong.singer
        }}
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import CircleProgressBar from "./circle-progress-bar";
import { mapGetters, mapState } from "vuex";
export default {
  components: {
    CircleProgressBar,
  },
  computed: {
    ...mapState("music", ["playing", "currentTime"]),
    ...mapGetters("music", ["currentSong", "currentLyric", "percent"]),
  },
};
</script>

<style lang="scss" scoped>
.wraper {
  display: flex;
  margin-left: 20px;
  align-items: center;
  .controls {
    display: flex;
    align-items: center;
    margin-right: 10px;
    button {
      font-size: 18px;
      color: #dddcd9;
      &:hover {
        color: $text;
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
      }
    }
  }
  .music-info {
    .name {
      font-weight: bold;
    }
    .lyric {
      font-size: $font-size-small;
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