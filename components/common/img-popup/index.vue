<template>
  <div class="mask"
       v-if="showFlag"
       @click="close">
    <img :src="src"
         alt=""
         @click.stop>
  </div>
</template>

<script>
export default {
  data () {
    return {
      src: '',
      showFlag: false
    }
  },
  methods: {
    close () {
      this.showFlag = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  display: flex;
  z-index: $z-index-top;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(85, 85, 85, 0.5);
  @include backdrop-blur();
  img {
    max-width: 90%;
    max-height: 90%;
    min-width: 10%;
    min-height: 10%;
    border: solid $sm-gap $module-hover-bg;
    background-color: $module-bg;
  }
}
</style>