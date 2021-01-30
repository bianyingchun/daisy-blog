<template>
  <div class="ays-table">
    <div class="axis-y">
      <span class="count"
            v-for="item in xList"
            :key="item">{{item}}</span>
    </div>
    <div class="axis-x">
      <span class="month"
            v-for="item in yList"
            :key="item">{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      xList: [0, 5, 10, 15, 20, 30],
      yList: ['Jan', 'Feb', 'March', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Dec', 'Nov']
    }
  }
}
</script>

<style lang="scss">
</style>