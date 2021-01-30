<template>
  <div class="wraper">
    <slot>{{$i18n.text.empty}}</slot>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.wraper {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 5em;
  text-align: center;
  justify-content: center;
  align-items: center;
}
</style>