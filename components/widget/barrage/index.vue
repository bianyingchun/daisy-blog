<template>
  <div id="barrage" :class="{ active: onBarrage }">
    <div v-if="onBarrage" class="barrage-box">
      <ul class="barrages-list-box">
        <barrage-item
          v-for="_barrage in barrages"
          :id="_barrage.id"
          :key="_barrage.id"
          :barrage="_barrage"
          :delay="config.delay"
          @end="handleBarrageItemAnimationEnd"
        />
      </ul>
      <div
        class="input-box filter"
        :class="{ 'motion-blur-vertical': transitioning }"
        @animationstart="handleInputAnimationStart"
        @animationend="handleInputAnimationEnd"
      >
        <div class="input-inner">
          <div class="size">
            <div class="active size" :class="'s-' + sizeIndex">{{ currentSize }}</div>
            <ul class="size list">
              <li
                v-for="(size, index) in sizes"
                :key="index"
                class="item"
                :class="'s-' + index"
                @click="sizeIndex = index"
              >{{ size }}</li>
            </ul>
          </div>
          <div class="color">
            <div class="active color" :class="'color-' + colorIndex">{{ currentColor }}</div>
            <ul class="color list">
              <li
                v-for="(color, index) in colors"
                :key="index"
                class="item"
                :class="'barrage-color-' + index"
                @click="colorIndex = index"
              >{{ color }}</li>
            </ul>
          </div>
          <input
            v-model="barrage"
            type="text"
            class="input"
            placeholder="Here we go"
            @keyup.enter="sendbarrage"
          >
          <div class="count">
            <span>{{ counts.users }} {{ isEnLang ? 'U' : '人' }}</span>
            <span>&nbsp;|&nbsp;</span>
            <span>{{ counts.count }} {{ isEnLang ? 'C' : ' 发' }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BarrageItem from './item.vue'
export default {
    components:{
        BarrageItem
    },
    data() {
      const sizes = this.isEnLang ? ['Strong', 'Large', 'Normal'] : ['粗大', '很大', '大'];
      const colors = this.isEnLang
        ? ['Green', 'Green2', 'Red', 'Purple', 'Pink', 'Yellow', 'White', 'Black']
        : ['老王绿', '原谅绿', '姨妈红', '友情紫', '百合粉', '东莞黄', '李太白', '非常黑'];
      return {
        sizes,
        colors,
        counts: {
          users: 0,
          count: 0
        },
        config: {
          delay: 10,
          moveDelay: 4
        },
        barrage: '',
        barrages: [],
        sizeIndex: sizes.length - 1,
        colorIndex: colors.length - 1,
        transitioning: false
      }
    },
    created(){
        this.moveTimer = null;
        this.barrageLimit = 0
    },
    computed:{
        isEnLang() {
            return this.$store.getters['global/isEnLang']
        },
        onBarrage() {
            return this.$store.state.global.onBarrage
        },
        currentColor() {
            return this.colors[this.colorIndex]
        },
        currentSize() {
            return this.sizes[this.sizeIndex]
        }
    },
    methods:{
        
    }
}
</script>

<style>

</style>