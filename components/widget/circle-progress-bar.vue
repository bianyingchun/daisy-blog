<template>
  <div class="circle-wraper" :class="{ large: large }">
    <div class="percent-circle percent-circle-left">
      <div
        class="left-content"
        :style="{ transform: `rotate(${leftRotate}deg)` }"
      ></div>
    </div>
    <div class="percent-circle percent-circle-right">
      <div
        class="right-content"
        :style="{ transform: `rotate(${rightRotate}deg)` }"
      ></div>
    </div>
    <div class="content">
      <slot> </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: Number,
    large: Boolean,
  },
  data() {
    return {
      leftRotate: 180,
      rightRotate: 180,
    };
  },
  watch: {
    value(ratio) {
      let r = Math.min(ratio * 360, 360);

      if (r <= 180) {
        this.rightRotate = 180 + r;
        this.leftRotate = 180;
      } else {
        this.leftRotate = r;
        this.rightRotate = 360;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.circle-wraper {
  $width: 50px;
  position: relative;
  display: inline-block;
  height: $width;
  width: $width;
  border-radius: 100%;
  overflow: hidden;
  .percent-circle {
    position: absolute;
    height: 100%;
    overflow: hidden;
    width: $width / 2;
    background: rgba(255, 255, 255, 0.1);
    > div {
      background: rgba(255, 255, 255, 0.2);
      position: absolute;
      width: 100%;
      height: 100%;
      transform: rotate(180deg);
    }
    &.percent-circle-right {
      right: 0;
      .right-content {
        transform-origin: left center;
        border-radius: 0 $width / 2 $width / 2 0;
      }
    }

    &.percent-circle-left {
      left: 0;
      .left-content {
        transform-origin: right center;
        border-radius: $width/2 0 0 $width/2;
        transform: rotate(180deg);
      }
    }
  }
  &.large {
    height: 200px;
    width: 200px;
    .percent-circle {
      width: 100px;
      .left-content {
        border-radius: 100px 0 0 100px;
      }
      .right-content {
        border-radius: 0 100px 100px 0;
      }
    }
  }

  .content {
    position: absolute;
    height: 94%;
    width: 94%;
    left: 3%;
    top: 3%;
    overflow: hidden;
    border-radius: 100%;
  }
}
</style>
