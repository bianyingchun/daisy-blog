<template>
  <div id="app">
    <div id="content">

      <nuxt />
    </div>
    <div id="search"></div>
    <div id="menu">
      <div class="opener">
        <span>menu</span>
      </div>
      <div class="background">

      </div>
      <div class="mask-h">
        <div class="mask-h-bg"></div>
        <div class="mask-h-left">
          <svg version="1.1"
               xmlns="http://www.w3.org/2000/svg"
               xmlns:xlink="http://www.w3.org/1999/xlink"
               x="0px"
               y="0px"
               viewBox="0 0 200 1000"
               style="enable-background:new 0 0 200 1000;"
               xml:space="preserve">

            <path d="M200,1000H100c0,0,0-201,0-500c0-284,0-500,0-500h100V1000z"
                  data-original="M200,1000H100c0,0,0-201,0-500c0-284,0-500,0-500h100V1000z"
                  style="fill: rgb(190, 226, 246); transition: initial;"></path>
          </svg>
        </div>
        <div class="mask-h-right">
          <svg version="1.1"
               id="Capa_1"
               xmlns="http://www.w3.org/2000/svg"
               xmlns:xlink="http://www.w3.org/1999/xlink"
               x="0px"
               y="0px"
               viewBox="0 0 200 1000"
               style="enable-background:new 0 0 200 1000;"
               xml:space="preserve">
            <path class="st0"
                  d="M0,1000h100c0,0,0-201,0-500c0-284,0-500,0-500H0V1000z"
                  style="fill: rgb(190, 226, 246); transition: initial;"
                  data-original="M0,1000h100c0,0,0-201,0-500c0-284,0-500,0-500H0V1000z"></path>
          </svg>
        </div>
      </div>
      <div class="inner"></div>
      <div class="closer"
           @click="test">
        <span>close</span>
      </div>
    </div>
  </div>
</template>

<script>
import anime from 'animejs'
export default {
  methods: {
    test () {
      console.log(11)
      anime({
        targets: '.mask-h-left path',
        d: {
          value: [
            'M200,1000H100c0,0,0-201,0-500c0-284,0-500,0-500h100V1000z',
            'M200,1000H100c0,0-100-201-100-500C0,216,100,0,100,0h100V1000z',
            'M200,1000H100c0,0,0-201,0-500c0-284,0-500,0-500h100V1000z']
          ,
          easing: 'linear',
          duration: 2000,
          direction: 'alternate',
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
#menu {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  .opener {
    right: 5rem;
    top: 5rem;
    position: absolute;
  }
  .background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: initial;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.8);
    // opacity: 0.0001;
    will-change: opacity;
  }
  .mask-h {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    transform: translate(70%, 0%);
    // transform: translateX(100%);
    will-change: transform;
    .mask-h-bg {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      bottom: 0;
      width: calc(100% - 19vh);
      width: calc(100% - calc(1vh * 19));
      height: 100%;
      pointer-events: none;
      background-color: #fff;
    }
    .mask-h-left {
      width: 20vh;
      height: 100vh;
      position: absolute;
      left: -10vh;
      top: 0;
      bottom: 0;
    }
    .mask-h-right {
      width: 20vh;
      height: 100vh;
      position: absolute;
      right: -10vh;
      top: 0;
      bottom: 0;
    }
  }
  .inner {
    // display: none;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 30vw;
    height: 100%;
    padding: 5vw;
    pointer-events: all;
    // background-color: transparent;
    background: orangered;
    // opacity: 0.0001;
    will-change: opacity, transform;
  }
  .closer {
    // display: none;
    position: absolute;
    right: 5vw;
    top: 5vw;
    -webkit-transform: translateX(50%) translateY(-50%);
    transform: translateX(50%) translateY(-50%);
    width: 3.5vw;
    height: 3.5vw;
    border-radius: 3.5vw;
    background-color: #fff;
    pointer-events: initial;
    cursor: pointer;
    // opacity: .0001;
    will-change: opacity;
  }
}
</style>