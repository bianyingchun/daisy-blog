<template>
  <div class="project-wraper">
    <div class="project-list">
      <div class="project-item btns-list">
        <div class="bubble-btn">
          HOME
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.project-wraper {
  padding: 100px 40px;
  .project-list {
    .project-item {
      border-radius: 8px;
      background-color: #fff;
      width: 50%;
      height: 200px;
      padding: 20px;
      box-shadow: 0 1px 0px rgba(0, 0, 0, 0.07),
        0px -1px 4px rgba(1, 0, 0, 0.05);
      transition: all 0.3s cubic-bezier(0.02, 0.01, 0.35, 0.93);
      &:hover {
        transform: translateY(-6px);
        animation: shack 0.4s;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
      }
    }
  }
}
@keyframes shack {
  0% {
    transform: skew(0, 0);
  }
  50% {
    transform: skew(-5deg, -5deg);
  }
  100% {
    transform: skew(0, 0);
  }
}

.bubble-btn {
  position: relative;
  $color: goldenrod;
  border: 2px solid $color;
  border-radius: 0.5em;
  text-decoration: uppercase;
  height: 3em;
  line-height: 3em;
  width: 12em;
  text-align: center;
  letter-spacing: 0.1em;
  box-sizing: content-box;
  overflow: hidden;
  z-index: 1;
  transition: all 0.4s;
  --n: 1;
  &:hover {
    color: black;
    span {
      transform: translateY(0) scale(2);
    }
  }
  span:nth-child(1) {
    --n: 1;
  }
  span:nth-child(2) {
    --n: 2;
  }
  span:nth-child(3) {
    --n: 3;
  }
  span:nth-child(4) {
    --n: 4;
  }
  span {
    z-index: -1;
    position: absolute;
    width: 25%;
    height: 100%;
    background-color: $color;
    transform: translateY(150%);
    border-radius: 50%;
    transition: all 0.5s;
    transition-delay: calc((var(--n) - 1) * 0.1s);
    left: calc((var(--n) - 1) * 25%);
  }
}
</style>