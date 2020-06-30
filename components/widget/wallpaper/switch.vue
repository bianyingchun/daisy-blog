<template>
  <div class="wallpaper-switch"
       :class="{'dark':isDarkTheme}">

  </div>
</template>

<script>
export default {
  computed: {
    isDarkTheme () {
      let lang = this.$store.state.global.language;
      return this.$store.getters['global/isDarkTheme']
    }
  },

}
</script>

<style lang="scss" scoped>
</style>