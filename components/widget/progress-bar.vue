<template>
  <div class="progress-bar" ref="progressbar" @click.stop="handleClick">
    <div class="full-progress">
      <div
        class="inner-progress"
        @mousedown.stop="handleMousedown"
        :style="{ width: innerWidth + 'px' }"
      >
        <span class="dot"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      wholeWidth: 0,
      selfVal: 0,
    };
  },
  computed: {
    innerWidth() {
      if (!this.wholeWidth) return 0;
      return Math.min(
        this.wholeWidth,
        Math.max(0, this.selfVal * this.wholeWidth)
      );
    },
  },
  mounted() {
    this.progressbar = this.$refs.progressbar;
    this.wholeWidth = this.progressbar.clientWidth;
    this.posLeft = this.progressbar.getBoundingClientRect().left;
  },
  methods: {
    handleMousedown(e) {
      let width = this.innerWidth;
      let startX = e.clientX;
      document.onmousemove = (e) => {
        let diffX = e.clientX - startX;
        let ratio = Math.max(0, Math.min((width + diffX) / this.wholeWidth, 1));
        console.log(ratio);
        this.selfVal = ratio;
      };
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
        this.$emit("change", this.selfVal);
      };
    },
    handleClick(e) {
      this.$emit("change", (e.clientX - this.posLeft) / this.wholeWidth);
    },
  },
  watch: {
    value(val) {
      this.selfVal = val;
    },
  },
};
</script>

<style lang="scss" scoped>
.progress-bar {
  padding: 4px 0;
  cursor: pointer;
  .full-progress {
    width: 100%;
    height: 2px;
    background: rgba(255, 255, 255, 0.2);
    position: relative;
    .inner-progress {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      background: #fff;
      span {
        position: absolute;
        top: -4px;
        right: -4px;
        width: 10px;
        height: 10px;
        background: #fff;
        border-radius: 10px;
      }
    }
  }
}
</style>