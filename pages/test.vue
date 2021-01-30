<template>
  <div>
    <button @click="addBox">add</button>
    <div name="list-complete"
         tag="div"
         class="wrap">
      <div class="item"
           v-for="(item,index) in boxList"
           :key="item"
           ref="boxs"
           @click="remove(index)">{{item}}</div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'base',
  data () {
    return {
      boxList: [1, 2, 3, 4]
    }
  },
  methods: {
    addBox () {
      let item = Math.random() * 100;
      this.scheduleAnimation(() => {
        this.boxList.unshift(item);
      })

    },
    remove (index) {
      this.scheduleAnimation(() => {
        this.boxList.splice(index, 1)
      })
    },
    getRects (doms) {
      return doms.map((dom) => {
        const rect = dom.getBoundingClientRect()
        const { left, top } = rect
        return { left, top }
      })
    },
    scheduleAnimation (update) {
      const prevItemDoms = this.$refs.boxs.slice();
      const prevSrcRecMap = this.getRects(prevItemDoms);
      update();
      this.$nextTick(() => {
        const currentSrcRecMap = this.getRects(prevItemDoms);
        currentSrcRecMap.forEach((currentRect, index) => {

          const prevRect = prevSrcRecMap[index];
          const invert = {
            left: prevRect.left - currentRect.left,
            top: prevRect.top - currentRect.top
          };
          const keyframes = [
            {
              transform: `translate(${invert.left}px, ${invert.top}px)`
            },
            {
              transform: `translate(0, 0)`
            }];
          const options = {
            duration: 300,
            easing: "cubic-bezier(0,0,0.32,1)",
          }

          const animation = prevItemDoms[index].animate(keyframes, options)

        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  margin: 40px;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #ccc;
  .item {
    width: 100px;
    height: 100px;
    margin: 20px;
    border: 1px solid orange;
    text-align: center;
    line-height: 100px;
    // transition: all 1s;
  }
}
</style>