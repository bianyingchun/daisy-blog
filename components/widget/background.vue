<template>
  <div id="background">
      <div class="background-image" :class="{dark:isDarkTheme}"></div>
  </div>
</template>
<script>
export default {
    computed:{
        isDarkTheme() {
           return this.$store.getters['global/isDarkTheme']
        }
    }
}
</script>

<style lang="scss" scoped>
#background{
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom: 0;
    z-index: $z-index-underground;
    background-color:$body-bg;
    > .background-image {
        position: absolute;
        width:100%;
        height:100%;
        opacity: 0.3;
        background: cdn-url('/images/background.png');
        &.dark{
            opacity: 0.2;
        }
    }
}
</style>