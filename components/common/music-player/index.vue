<template>
  <audio
    height="0"
    width="0"
    ref="audio"
    :volume="volume"
    @timeupdate="onTimeUpdate"
    @play="_onPlay()"
    @pause="_onPause()"
    @ended="_onEnd()"
    @error="_onError()"
  ></audio>
</template>

<script>
export default {
  data() {
    return {
      volume: 5,
    };
  },
  computed: {
    currentSong() {
      return this.$store.getters["music/currentSong"];
    },
    playing() {
      return this.$store.state.music.playing;
    },
  },
  methods: {
    onTimeUpdate() {
      const element = this.$refs.audio;
      const duration = element.duration * 1000;
      const time = element.currentTime * 1000;
      let cachePercent = 0;
      let percent = time / duration;
      if (element.buffered.length) {
        const cacheTime = element.buffered.end(element.buffered.length - 1);
        cachePercent = (cacheTime * 10000) / (duration * 10000);
      }
      this.$store.dispatch("music/updateTime", time);
    },
    setTime(t) {
      this.$refs.audio.currentTime = t;
    },
    playSong(index = 0) {
      this.setTime(0);
      this.$store.dispatch("music/playSong", index);
    },
    next() {
      this.$store.dispatch("music/playNext");
      this.setTime(0);
    },
    prev() {
      this.$store.dispatch("music/playPrev");
      this.setTime(0);
    },
    pause() {
      this.$refs.audio.pause();
    },
    togglePlay() {
      if (this.playing) {
        this.pause();
      } else {
        this.play();
      }
    },
    play() {
      if (this.currentSong && this.currentSong.src) {
        let audio = this.$refs.audio;
        const playPromise = audio.play();
        if (playPromise) {
          playPromise
            .then((res) => {
              console.log(res);
            })
            .catch((e) => {
              // 音频加载失败
              console.log(e, "播放失败");
            });
        }
      }
    },
    async setPlayList(id) {
      await this.$store.dispatch("music/fetchMusicList", id);
    },
    async init() {
      await this.setPlayList();
    },
    _onPause() {
      this.$store.commit("music/setPlaying", false);
    },
    _onPlay() {
      this.$store.commit("music/setPlaying", true);
    },
    _onEnd() {
      this.next();
    },
    _onError(e) {
      // showToast('播放失败') //todo
      this.pause();
      this.setTime(0);
    },
  },

  watch: {
    currentSong(song) {
      if (song) {
        this.$store.dispatch("music/fetchLyric", song.id);
        this.$refs.audio.src = song.src;
        if (this.playing) {
          this.play();
        }
      }
    },
  },
};
</script>

<style>
</style>
