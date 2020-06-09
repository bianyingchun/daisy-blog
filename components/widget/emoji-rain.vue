<template>
  <div id="emoji-rain" :class="{active:kichikuing }">
      <canvas v-if="chambering" ref="rainBase" class="rain-base"></canvas>
  </div>
</template>

<script>
import {isBorwser} from '~/environment'
import { getFileCDNUrl } from '~/transformers/url'
export default {
    data() {
        return {
            kichikuing:false,
            chambering:false
        }
    },
    mounted() {

    }
}
</script>

<style lang="scss" scoped>
  #emoji-rain {
    position: fixed;
    top: 0;
    left: 0;
    z-index: $z-index-underground;

    &.active {
      z-index: $z-index-top;
    }

    .rain-base {
      width: 100%;
      height: 100%;
    }
  }
</style>