<template>
  <div class="barrage-wraper"
       ref="barrageWraper">

  </div>
</template>

<script>
const MAX_DM_COUNT = 10;
const CHANNEL_COUNT = 5;
const CHANNEL_HEIGHT = 40
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      speed: 100,
      wraperWidth: 0,
      channelStatusList: []
    }
  },
  created () {
    this.domPool = []
    this.channelStatusList = new Array(CHANNEL_COUNT).fill(true);
  },
  mounted () {
    this.initDomPool();
    this.startPolling();
  },
  methods: {
    initDomPool () {
      let wraper = this.$refs.barrageWraper;
      this.wraperWidth = wraper.clientWidth
      for (let i = 0; i < CHANNEL_COUNT; i++) {
        let domList = [];
        let top = i * CHANNEL_HEIGHT + 'px';
        for (let j = 0; j < MAX_DM_COUNT; j++) {
          let dom = document.createElement('span')
          wraper.appendChild(dom);
          dom.style.transition = null;
          dom.style.transform = `translateX(${this.wraperWidth}px)`;
          dom.style.top = top;
          dom.style.visibility = 'hidden';
          domList.push(dom)
          dom.addEventListener('transitionend', () => {
            dom.style.transform = `translateX(${this.wraperWidth}px)`;
            dom.style.transition = null;
            dom.style.visibility = 'hidden';
            domList.push(dom)
          })
        }
        this.domPool.push(domList)
      }
    },
    getChannel () {
      for (let i = 0; i < CHANNEL_COUNT; i++) {
        if (this.channelStatusList[i] && this.domPool[i].length) return i;
      }
      return -1;
    },
    shootBarrage (dom, barrage, channel) {
      const { content = '', style = {} } = barrage;
      dom.innerText = content;
      dom.style.fontSize = style.fontsize || '16px'
      dom.style.color = style.color || '#fff'
      const width = dom.clientWidth;
      const duration = (width + this.wraperWidth) / this.speed
      dom.style.visibility = 'visible'
      dom.style.transform = `translateX(${-width}px)`;
      dom.style.transition = `transform ${duration}s linear`;
      this.channelStatusList[channel] = false;
      let showtime = 1000 * width / this.speed;
      setTimeout(() => {
        this.channelStatusList[channel] = true;
      }, showtime)
    },
    startPolling () {
      this.timer = setInterval(() => {
        let channel;
        if (this.list.length && (channel = this.getChannel()) != -1) {
          let dom = this.domPool[channel].shift();
          let barrage = this.list.shift();
          this.shootBarrage(dom, barrage, channel);
        }
      }, 200)
    }
  }
}
</script>

<style lang="scss">
.barrage-wraper {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  span {
    will-change: transform;
    color: #fff;
    position: absolute;
    user-select: none;
    position: absolute;
    padding: 0 20px;
    white-space: nowrap;
    left: 0;
  }
}
</style>