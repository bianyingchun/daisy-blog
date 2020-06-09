<template>
  <div class="wallpaper-switch" :class="{dark:isDarkTheme}">

  </div>
</template>

<script>
export default {
    computed:{
        isDarkTheme() {
            return this.$store.getters['global/isDarkTheme']
        }
    },
    
}
</script>

<style>

</style>